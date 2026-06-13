#!/usr/bin/env node
/**
 * Creative OS — Automated QA Audit
 * Run: node creative-os/scripts/qa-audit.js ./src
 * Exit code 1 if errors found (use as CI gate)
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname, relative } from 'path'

const RED    = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN  = '\x1b[32m'
const BLUE   = '\x1b[34m'
const RESET  = '\x1b[0m'
const BOLD   = '\x1b[1m'

const checks = [
  // ── ERRORS (block deployment) ────────────────────────────
  {
    id: 'E001',
    name: 'No hardcoded hex colors',
    severity: 'error',
    pattern: /#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/g,
    excludePattern: /\/\*.*?\*\//gs, // ignore comments
    extensions: ['.jsx', '.tsx', '.css', '.module.css', '.scss'],
    message: 'Use CSS custom properties from tokens.css: var(--color-*)',
    fix: 'Replace #hex with hsl() wrapped in var(--color-token)',
  },
  {
    id: 'E002',
    name: 'No hardcoded px font sizes',
    severity: 'error',
    pattern: /font-size:\s*\d+px/g,
    extensions: ['.css', '.module.css', '.scss'],
    message: 'Use token scale: var(--text-*)',
    fix: 'Replace with var(--text-body), var(--text-2xl), etc.',
  },
  {
    id: 'E003',
    name: 'No glassmorphism',
    severity: 'error',
    pattern: /backdrop-filter\s*:/g,
    extensions: ['.css', '.module.css', '.scss', '.jsx', '.tsx'],
    message: 'Glassmorphism is banned. Use var(--color-surface) or var(--color-overlay).',
    fix: 'Remove backdrop-filter. Use solid surface colors.',
  },
  {
    id: 'E004',
    name: 'Images need explicit dimensions',
    severity: 'error',
    pattern: /<img(?![^>]*(width|height))[^>]*>/g,
    extensions: ['.jsx', '.tsx', '.html'],
    message: 'All <img> need width and height attributes to prevent CLS.',
    fix: 'Add width={800} height={600} (or actual dimensions)',
  },
  {
    id: 'E005',
    name: 'No placeholder content in production',
    severity: 'error',
    pattern: /TODO|FIXME|PLACEHOLDER|lorem ipsum|Coming soon|TBD/gi,
    extensions: ['.jsx', '.tsx', '.html', '.md', '.css'],
    message: 'Remove all placeholder content before launch.',
    fix: 'Replace with real content or delete the section.',
  },
  {
    id: 'E006',
    name: 'No inline styles in JSX',
    severity: 'error',
    pattern: /style=\{\{(?![\s\S]*willChange|[\s\S]*transform)/g,
    extensions: ['.jsx', '.tsx'],
    message: 'Move styles to CSS modules. Inline styles bypass token system.',
    fix: 'Create a CSS module class and reference via styles.className',
    note: 'Exception: GSAP sets willChange/transform inline — use // cos-ignore comment',
  },
  {
    id: 'E007',
    name: 'No neon glow borders',
    severity: 'error',
    pattern: /box-shadow:.*(?:neon|glow|0\s0\s\d+px.*(?:hsl|rgb|#))/gi,
    extensions: ['.css', '.module.css'],
    message: 'Glow borders are banned. Use solid borders or negative space.',
    fix: 'Replace with border: 1px solid var(--color-border)',
  },
  // ── WARNINGS (flag but don't block) ─────────────────────
  {
    id: 'W006',
    name: 'Images must have alt text attribute',
    severity: 'warning',
    pattern: /<img(?![^>]*\balt=)[^>]*>/g,
    extensions: ['.jsx', '.tsx', '.html'],
    message: 'All <img> tags must have an alt attribute for accessibility.',
    fix: 'Add alt="Description of the image" (or alt="" if decorative).',
  },
  {
    id: 'W007',
    name: 'Empty alt text requires decorative role',
    severity: 'warning',
    pattern: /<img(?=[^>]*\balt=(?:""|''|\{\s*""\s*\}|\{\s*''\s*\}))(?![^>]*role=["'](?:presentation|none)["'])(?![^>]*aria-hidden=["']true["'])[^>]*>/g,
    extensions: ['.jsx', '.tsx', '.html'],
    message: 'Images with empty alt text must be explicitly marked as decorative using role or aria-hidden.',
    fix: 'Add role="presentation" or aria-hidden="true" to the <img> tag.',
  },
  {
    id: 'W008',
    name: 'Images must have lazy loading',
    severity: 'warning',
    pattern: /<img(?![^>]*loading=)[^>]*>/g,
    extensions: ['.jsx', '.tsx', '.html'],
    message: 'Images should have loading="lazy" (or loading="eager" for critical above-the-fold assets).',
    fix: 'Add loading="lazy" or loading="eager" to the <img> tag.',
  },
  {
    id: 'W009',
    name: 'Missing focus-visible rules',
    severity: 'warning',
    pattern: /^(?![\s\S]*:focus-visible)(?=[\s\S]*(?::hover|\bcursor\s*:\s*pointer\b))/g,
    extensions: ['.css', '.module.css', '.scss'],
    message: 'Interactive styles must support :focus-visible for keyboard accessibility.',
    fix: 'Add a :focus-visible rule alongside hover/interactive declarations.',
  },
  {
    id: 'W010',
    name: 'Missing prefers-reduced-motion check for GSAP timeline',
    severity: 'warning',
    pattern: /^(?![\s\S]*(?:prefers-reduced-motion|prefersReducedMotion))(?=[\s\S]*gsap\.timeline\s*\()/g,
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
    message: 'File defines a GSAP timeline but lacks media query checks for reduced motion.',
    fix: 'Ensure GSAP animations check prefers-reduced-motion media query or disable movements.',
  },
  {
    id: 'W011',
    name: 'Navigation missing skip-to-content link',
    severity: 'warning',
    pattern: /^(?![\s\S]*<a\s+[^>]*href=["']#main["'])(?=[\s\S]*<nav\b)/g,
    extensions: ['.jsx', '.tsx', '.html'],
    message: 'Components containing <nav> must include a skip-to-content link <a href="#main">.',
    fix: 'Add <a href="#main">Skip to main content</a> before the <nav> element.',
  },
  {
    id: 'W001',
    name: 'WebGL needs capability check',
    severity: 'warning',
    pattern: /new THREE\.(WebGLRenderer|WebGPURenderer)|<Canvas/g,
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
    message: 'Ensure getDeviceTier() gates this WebGL component.',
    fix: 'Wrap with: if (getDeviceTier() === "low") return <CSSFallback />',
  },
  {
    id: 'W002',
    name: 'GSAP ScrollTrigger needs Lenis bridge',
    severity: 'warning',
    pattern: /ScrollTrigger\.create|scrollTrigger:/g,
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
    message: 'Confirm lenis.on("scroll", ScrollTrigger.update) is active.',
    fix: 'Check src/lib/raf.js for Lenis-ScrollTrigger bridge',
  },
  {
    id: 'W003',
    name: 'Custom cursor on desktop only',
    severity: 'warning',
    pattern: /cursor:\s*none/g,
    extensions: ['.css', '.module.css'],
    message: "Ensure cursor: none has a touch-device override.",
    fix: '@media (hover: hover) { cursor: none } — only hide on pointer devices',
  },
  {
    id: 'W004',
    name: 'Animation respects reduced motion',
    severity: 'warning',
    pattern: /gsap\.to|gsap\.from|gsap\.timeline/g,
    extensions: ['.jsx', '.tsx', '.js'],
    message: 'Check if this animation respects prefers-reduced-motion.',
    fix: `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) tl.progress(1).kill()`,
  },
  {
    id: 'W005',
    name: 'console.log in production',
    severity: 'warning',
    pattern: /console\.log\(/g,
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
    message: 'Remove console.log before launch.',
    fix: 'Delete or use console.error/warn for legitimate logging',
  },
]

function getAllFiles(dir, extensions) {
  const files = []
  const walk = (currentDir) => {
    readdirSync(currentDir).forEach(file => {
      const fullPath = join(currentDir, file)
      if (file.startsWith('.') || file === 'node_modules' || file === 'dist') return
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath)
      } else if (extensions.includes(extname(file))) {
        files.push(fullPath)
      }
    })
  }
  walk(dir)
  return files
}

function runAudit(srcDir) {
  const results = { errors: [], warnings: [], infos: [] }

  checks.forEach(check => {
    const files = getAllFiles(srcDir, check.extensions)

    files.forEach(filePath => {
      let content = readFileSync(filePath, 'utf-8')

      // Skip lines with cos-ignore comment
      content = content.split('\n')
        .filter(line => !line.includes('// cos-ignore'))
        .join('\n')

      const matches = [...content.matchAll(check.pattern)]
      if (matches.length === 0) return

      const relPath = relative(srcDir, filePath)

      matches.forEach(match => {
        const lineNumber = content.slice(0, match.index).split('\n').length
        const entry = {
          id: check.id,
          file: relPath,
          line: lineNumber,
          name: check.name,
          match: match[0].slice(0, 60),
          message: check.message,
          fix: check.fix,
        }
        if (check.severity === 'error') results.errors.push(entry)
        else results.warnings.push(entry)
      })
    })
  })

  return results
}

// ── RENDER RESULTS ────────────────────────────────────────
const srcDir = process.argv[2] || './src'
console.log(`\n${BOLD}${BLUE}Creative OS QA Audit${RESET}`)
console.log(`${BLUE}Scanning: ${srcDir}${RESET}\n`)

const results = runAudit(srcDir)
const hasErrors = results.errors.length > 0

if (results.errors.length > 0) {
  console.log(`${BOLD}${RED}✗ ERRORS (${results.errors.length}) — must fix before launch${RESET}\n`)
  results.errors.forEach(e => {
    console.log(`  ${RED}[${e.id}]${RESET} ${e.file}:${e.line}`)
    console.log(`         ${BOLD}${e.name}${RESET}`)
    console.log(`         Match: "${e.match}"`)
    console.log(`         ${e.message}`)
    console.log(`         Fix: ${e.fix}\n`)
  })
}

if (results.warnings.length > 0) {
  console.log(`${BOLD}${YELLOW}⚠ WARNINGS (${results.warnings.length}) — review before launch${RESET}\n`)
  results.warnings.forEach(w => {
    console.log(`  ${YELLOW}[${w.id}]${RESET} ${w.file}:${w.line} — ${w.name}`)
  })
  console.log()
}

if (!hasErrors && results.warnings.length === 0) {
  console.log(`${GREEN}${BOLD}✓ All checks passed. Ready for launch.${RESET}\n`)
} else if (!hasErrors) {
  console.log(`${GREEN}✓ No errors.${RESET} ${YELLOW}${results.warnings.length} warnings to review.${RESET}\n`)
}

// Summary
console.log(`${BOLD}Summary:${RESET} ${RED}${results.errors.length} errors${RESET} · ${YELLOW}${results.warnings.length} warnings${RESET}`)
console.log()

process.exit(hasErrors ? 1 : 0)
