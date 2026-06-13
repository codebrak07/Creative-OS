# Launch Checklist — 48-Hour Gate
## Every box must be checked before deployment

### T-72h: Soft Freeze
- [ ] All features merged to main
- [ ] node creative-os/scripts/qa-audit.js ./src — ZERO errors
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 92, Best Practices ≥ 95
- [ ] All console.log removed
- [ ] All TODO/FIXME/PLACEHOLDER removed
- [ ] Bundle sizes within targets (< 200KB gzipped initial JS)

### T-48h: Creative Director Sign-off
- [ ] Seen on: 4K iMac, 13" MacBook, iPhone (real device), Android (real device)
- [ ] Awwwards self-score: ≥ 8.5 total
- [ ] Signature test passed: "[Site] is the one where ___" — is that sentence memorable?
- [ ] Every page at 375px: intentional, not just functional
- [ ] VoiceOver test (macOS): headlines read as headings, buttons labeled, forms announced
- [ ] Reduced motion: animations either stop or crossfade

### T-24h: Technical Sign-off
- [ ] SSL certificate: valid, no mixed content warnings
- [ ] All environment variables set in production (not .env.local)
- [ ] Analytics: tracking verified in staging (events fire correctly)
- [ ] Error monitoring: Sentry or equivalent configured
- [ ] 404 page: designed, not server default
- [ ] OG image: 1200×630px, designed, not screenshot
- [ ] Favicon: SVG + 32px ICO + 180px Apple touch icon
- [ ] robots.txt: present, correct (not blocking production)
- [ ] sitemap.xml: generated, accurate

### T-12h: Content Review
- [ ] Every word of copy read aloud — anything that sounds unnatural, rewrite
- [ ] No "we craft digital experiences" or equivalent
- [ ] Case study numbers are real and verified
- [ ] Client name/logo used with permission
- [ ] Image alt text: descriptive, not "image of" or filename
- [ ] Meta title: unique per page, under 60 chars, contains keyword
- [ ] Meta description: under 160 chars, compelling, not a list

### T-6h: Performance Verification (production build)
- [ ] Run Lighthouse against the actual production URL (not localhost)
- [ ] WebPageTest: test from multiple locations (US, EU, Asia)
- [ ] Core Web Vitals: green in Chrome UX Report (or PageSpeed Insights)
- [ ] No render-blocking resources
- [ ] Fonts preloaded: <link rel="preload" as="font">
- [ ] Critical images preloaded: <link rel="preload" as="image">
- [ ] Third-party scripts: all deferred or async

### T-2h: Deployment Prep
- [ ] DNS: TTL was lowered 24h ago (already done if planned)
- [ ] Deployment: test dry-run in staging environment matches production config
- [ ] Rollback plan: know how to revert in < 5 minutes if needed
- [ ] Team: everyone who needs to know about the launch is notified

### T-0: Launch + Submission
- [ ] Deploy to production
- [ ] Verify all routes resolve (minimum: home, work, about, contact, 404)
- [ ] Run smoke test: navigate full site on mobile
- [ ] Submit to Awwwards
- [ ] Submit to FWA
- [ ] Submit to CSS Design Awards
- [ ] Post to Dribbble (screenshots ready in advance)
- [ ] Post to LinkedIn (copy written in advance)
- [ ] Post to Twitter/X (copy written in advance)
- [ ] Slack/Discord: announce to relevant communities
- [ ] Monitor: check analytics dashboard for first 2 hours

### T+24h: Post-Launch User Review
- [ ] Review rage clicks (elements clicked repeatedly without response) via session replay (e.g., Hotjar/Clarity)
- [ ] Audit scroll depth across all critical landing and case study pages
- [ ] Monitor bounce rates compared to baseline expectations
- [ ] Check device breakdown and optimize any newly discovered viewport edge cases

### T+72h: Technical Stability Review
- [ ] Audit Core Web Vitals (LCP, CLS, INP) from real user monitoring data
- [ ] Review error monitoring (Sentry/Bugsnag) logs for runtime exceptions
- [ ] Check server logs/analytics for 404s and broken routes
- [ ] Verify redirects and canonical link execution in production indexers

### T+30d: Creative & Conversion Review
- [ ] Assess award submission results (Awwwards, FWA, CSSDA) and compile juror feedback
- [ ] Analyze traffic sources (referrals from Godly, Muzli, Twitter/X, and search engines)
- [ ] Review portfolio inquiries and quality of incoming leads
- [ ] Measure final conversion outcomes against project goals

---

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory → WebGL memory audits → Launch Checklist → Confirm memory allocations before soft freeze deadlines.
