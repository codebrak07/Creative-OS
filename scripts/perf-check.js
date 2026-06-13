#!/usr/bin/env node
/**
 * Creative OS — Performance Budget Verifier
 * Run: node scripts/perf-check.js [directory]
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'fs'
import { join, extname, relative } from 'path'
import { gzipSync } from 'zlib'

const RED    = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN  = '\x1b[32m'
const BLUE   = '\x1b[34m'
const RESET  = '\x1b[0m'
const BOLD   = '\x1b[1m'

// Budgets and Targets
const BUDGETS = {
  maxFonts: 3,                 // Max 3 custom fonts for optimal SOTD loading
  maxJsGzip: 200 * 1024,       // 200KB total gzipped JS limit
  maxCssGzip: 50 * 1024,       // 50KB total gzipped CSS limit
  lcpTarget: 1.5,              // LCP < 1.5s
  clsTarget: 0.05,             // CLS < 0.05
  inpTarget: 200,              // INP < 200ms
}

function getFilesRecursively(dir, extensions) {
  const files = []
  if (!existsSync(dir)) return files

  const walk = (currentDir) => {
    readdirSync(currentDir).forEach(file => {
      const fullPath = join(currentDir, file)
      if (file.startsWith('.') || file === 'node_modules' || file === 'dist' || file === 'out') return
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath)
      } else {
        const ext = extname(file).toLowerCase()
        if (extensions.includes(ext)) {
          files.push(fullPath)
        }
      }
    })
  }
  walk(dir)
  return files
}

function verifyPerformance(targetDir) {
  console.log(`\n${BOLD}${BLUE}Creative OS Performance Budget Verifier${RESET}`)
  console.log(`${BLUE}Scanning: ${targetDir}${RESET}\n`)

  if (!existsSync(targetDir)) {
    console.log(`${RED}Error: Directory "${targetDir}" does not exist.${RESET}\n`)
    process.exit(1)
  }

  // 1. Scan and Verify Fonts
  const fontFiles = getFilesRecursively(targetDir, ['.woff', '.woff2', '.ttf', '.otf'])
  const fontCount = fontFiles.length
  console.log(`${BOLD}1. Font Audit:${RESET}`)
  console.log(`   Found ${fontCount} font file(s)`)
  fontFiles.forEach(f => console.log(`     - ${relative(targetDir, f)}`))
  
  let fontFailure = false
  if (fontCount > BUDGETS.maxFonts) {
    console.log(`   ${RED}✗ FAIL: Font count (${fontCount}) exceeds SOTD budget of ${BUDGETS.maxFonts}!${RESET}`)
    fontFailure = true
  } else {
    console.log(`   ${GREEN}✓ PASS: Font count within budget.${RESET}`)
  }
  console.log()

  // 2. Scan and Verify Image Formats
  const images = getFilesRecursively(targetDir, ['.png', '.jpg', '.jpeg', '.gif'])
  const nextGenImages = getFilesRecursively(targetDir, ['.webp', '.avif'])
  console.log(`${BOLD}2. Image Format Audit:${RESET}`)
  console.log(`   Found ${images.length} legacy image(s) (.png, .jpg, .jpeg, .gif)`)
  console.log(`   Found ${nextGenImages.length} next-gen image(s) (.webp, .avif)`)
  
  let legacyImagesWarning = false
  if (images.length > 0) {
    console.log(`   ${YELLOW}⚠ WARNING: Legacy image formats found. SOTD sites should use .webp or .avif.${RESET}`)
    images.slice(0, 5).forEach(img => console.log(`     - ${relative(targetDir, img)}`))
    if (images.length > 5) console.log(`     - ... and ${images.length - 5} more.`)
    legacyImagesWarning = true
  } else {
    console.log(`   ${GREEN}✓ PASS: All images are in next-gen formats.${RESET}`)
  }
  console.log()

  // 3. Preloads Audit
  const codeFiles = getFilesRecursively(targetDir, ['.html', '.jsx', '.tsx', '.js', '.ts'])
  let hasFontPreloads = false
  let hasImagePreloads = false
  let missingImgDimensionsCount = 0
  let hasPassiveListeners = false
  let hasBlockingScripts = false

  codeFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8')
    if (content.includes('rel="preload"') && content.includes('as="font"')) {
      hasFontPreloads = true
    }
    if (content.includes('rel="preload"') && content.includes('as="image"')) {
      hasImagePreloads = true
    }
    // Simple static checks for simulated CWV
    const imgMatches = content.match(/<img[^>]*>/g) || []
    imgMatches.forEach(img => {
      if (!img.includes('width=') || !img.includes('height=')) {
        missingImgDimensionsCount++
      }
    })
    if (content.includes('passive: true') || content.includes('passive:true')) {
      hasPassiveListeners = true
    }
    if (content.match(/<script[^>]*src=[^>]*>(?![^>]*(defer|async))/)) {
      hasBlockingScripts = true
    }
  })

  console.log(`${BOLD}3. Preload & Structure Audit:${RESET}`)
  console.log(`   Font preloads:  ${hasFontPreloads ? GREEN + 'Detected' : YELLOW + 'Not Found (LCP penalty)'}${RESET}`)
  console.log(`   Image preloads: ${hasImagePreloads ? GREEN + 'Detected' : YELLOW + 'Not Found (LCP penalty)'}${RESET}`)
  console.log(`   Missing dimensions on images: ${missingImgDimensionsCount > 0 ? RED + missingImgDimensionsCount + ' tags' : GREEN + 'None'}${RESET}`)
  console.log()

  // 4. Bundle Sizes
  const jsFiles = getFilesRecursively(targetDir, ['.js'])
  const cssFiles = getFilesRecursively(targetDir, ['.css'])
  let totalJsSize = 0
  let totalJsGzip = 0
  let totalCssSize = 0
  let totalCssGzip = 0

  jsFiles.forEach(file => {
    const content = readFileSync(file)
    totalJsSize += content.length
    totalJsGzip += gzipSync(content).length
  })

  cssFiles.forEach(file => {
    const content = readFileSync(file)
    totalCssSize += content.length
    totalCssGzip += gzipSync(content).length
  })

  const jsGzipKb = (totalJsGzip / 1024).toFixed(2)
  const cssGzipKb = (totalCssGzip / 1024).toFixed(2)

  console.log(`${BOLD}4. Bundle Size Audit:${RESET}`)
  console.log(`   JS Total Gzip:  ${jsGzipKb} KB / ${BUDGETS.maxJsGzip / 1024} KB target`)
  console.log(`   CSS Total Gzip: ${cssGzipKb} KB / ${BUDGETS.maxCssGzip / 1024} KB target`)

  let bundleSizeFailure = false
  if (totalJsGzip > BUDGETS.maxJsGzip) {
    console.log(`   ${RED}✗ FAIL: Total JS Gzip size exceeds budget!${RESET}`)
    bundleSizeFailure = true
  } else {
    console.log(`   ${GREEN}✓ PASS: Total JS size within budget.${RESET}`)
  }

  if (totalCssGzip > BUDGETS.maxCssGzip) {
    console.log(`   ${RED}✗ FAIL: Total CSS Gzip size exceeds budget!${RESET}`)
    bundleSizeFailure = true
  } else {
    console.log(`   ${GREEN}✓ PASS: Total CSS size within budget.${RESET}`)
  }
  console.log()

  // 5. Simulated Core Web Vitals (CWV)
  let simulatedLcp = 1.0 // Base LCP 1.0s
  if (!hasFontPreloads) simulatedLcp += 0.4
  if (!hasImagePreloads) simulatedLcp += 0.4
  if (totalJsGzip > BUDGETS.maxJsGzip) {
    simulatedLcp += ((totalJsGzip - BUDGETS.maxJsGzip) / 1024 / 50) * 0.3
  }
  if (hasBlockingScripts) simulatedLcp += 0.5

  let simulatedCls = 0.0 // Base CLS
  if (missingImgDimensionsCount > 0) {
    simulatedCls += Math.min(0.2, missingImgDimensionsCount * 0.03)
  }

  let simulatedInp = 100 // Base INP 100ms
  if (!hasPassiveListeners) simulatedInp += 60
  if (totalJsGzip > BUDGETS.maxJsGzip) {
    simulatedInp += Math.min(150, ((totalJsGzip - BUDGETS.maxJsGzip) / 1024 / 20) * 10)
  }

  console.log(`${BOLD}5. Simulated Core Web Vitals:${RESET}`)
  
  const lcpStr = `${simulatedLcp.toFixed(2)}s`
  const clsStr = simulatedCls.toFixed(3)
  const inpStr = `${simulatedInp.toFixed(0)}ms`

  console.log(`   LCP: ${simulatedLcp <= BUDGETS.lcpTarget ? GREEN : RED}${lcpStr}${RESET} (Target: < ${BUDGETS.lcpTarget}s)`)
  console.log(`   CLS: ${simulatedCls <= BUDGETS.clsTarget ? GREEN : RED}${clsStr}${RESET} (Target: < ${BUDGETS.clsTarget})`)
  console.log(`   INP: ${simulatedInp <= BUDGETS.inpTarget ? GREEN : RED}${inpStr}${RESET} (Target: < ${BUDGETS.inpTarget}ms)`)

  const cwvFailure = simulatedLcp > BUDGETS.lcpTarget || simulatedCls > BUDGETS.clsTarget || simulatedInp > BUDGETS.inpTarget
  
  console.log('\n======================================')
  console.log(`${BOLD}AUDIT SUMMARY:${RESET}`)
  
  let exitCode = 0
  if (fontFailure || bundleSizeFailure || cwvFailure) {
    console.log(`${RED}${BOLD}✗ AUDIT FAILED (Budgets exceeded)${RESET}`)
    exitCode = 1
  } else if (legacyImagesWarning) {
    console.log(`${YELLOW}${BOLD}✓ AUDIT PASSED WITH WARNINGS (Optimize image formats)${RESET}`)
  } else {
    console.log(`${GREEN}${BOLD}✓ AUDIT SUCCESS: Flawless performance budget compliance!${RESET}`)
  }
  console.log('======================================\n')

  process.exit(exitCode)
}

const targetDir = process.argv[2] || '.'
verifyPerformance(targetDir)
