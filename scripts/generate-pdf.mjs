// scripts/generate-pdf.mjs
// Run after `nuxt generate`. Serves .output/public/ locally so Playwright
// can render the full, styled /resume page and save a PDF to
// .output/public/dave-berning-resume.pdf.
//
// Usage:  node scripts/generate-pdf.mjs
// Exit:   0 on success, 1 on failure (so CI/Netlify build fails loudly).

import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUTPUT_DIR = path.join(ROOT, '.output', 'public')
const PDF_PATH = path.join(OUTPUT_DIR, 'dave-berning-resume.pdf')

// ---------------------------------------------------------------------------
// MIME map — covers every file type produced by nuxt generate
// ---------------------------------------------------------------------------

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
}

// ---------------------------------------------------------------------------
// Static HTTP server
// ---------------------------------------------------------------------------

function createStaticServer(root) {
  const server = http.createServer(async (req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0])
    let fsPath = path.join(root, urlPath)

    try {
      const stat = await fs.stat(fsPath)
      if (stat.isDirectory()) {
        fsPath = path.join(fsPath, 'index.html')
      }
    }
    catch {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    let data
    try {
      data = await fs.readFile(fsPath)
    }
    catch {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    const ext = path.extname(fsPath).toLowerCase()
    const mime = MIME[ext] ?? 'application/octet-stream'

    res.writeHead(200, { 'Content-Type': mime })
    res.end(data)
  })

  return server
}

// ---------------------------------------------------------------------------
// PDF export styles
// ---------------------------------------------------------------------------

// NOTE: Keep in sync with server/api/resume.pdf.get.ts
const exportStyles = `
  @page {
    size: Letter;
    margin: 0 !important;
  }

  :root {
    --pdf-export-min-height: 11in;
  }

  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    width: 100% !important;
    min-height: var(--pdf-export-min-height) !important;
  }

  #__nuxt,
  [data-v-app] {
    width: 100% !important;
    min-height: var(--pdf-export-min-height) !important;
  }

  .site-header,
  .site-cta,
  .site-footer,
  .site-mobile-nav,
  .theme-picker,
  .breakpoint-reporter,
  .resume-page-intro,
  .resume-download-button {
    display: none !important;
  }

  .site-layout-body {
    display: block !important;
    justify-content: stretch !important;
    align-items: stretch !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    min-height: var(--pdf-export-min-height) !important;
  }

  .container {
    display: block !important;
    max-width: none !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin: 0 !important;
  }

  .site-layout-main {
    display: block !important;
    width: 100% !important;
    grid-column: 1 / -1 !important;
    padding: 0 !important;
    margin: 0 !important;
    min-height: var(--pdf-export-min-height) !important;
  }

  .resume-page {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    min-height: var(--pdf-export-min-height) !important;
  }

  .resume-page,
  .resume-shell {
    margin: 0 !important;
  }

  .resume-page > div,
  .resume-page .resume-page > div,
  .resume-page .flex.flex-col.gap-6 {
    gap: 0 !important;
  }

  .resume-shell {
    display: block !important;
    width: 100% !important;
    max-width: none !important;
    min-height: var(--pdf-export-min-height) !important;
    border-radius: 0 !important;
    border-width: 0 !important;
    box-shadow: none !important;
    background: linear-gradient(
      to right,
      var(--theme-color-black) 0,
      var(--theme-color-black) 15rem,
      #ffffff 15rem,
      #ffffff 100%
    ) !important;
  }

  .resume-grid {
    display: grid !important;
    grid-template-columns: 15rem minmax(0, 1fr) !important;
    align-items: stretch !important;
    min-height: var(--pdf-export-min-height) !important;
  }

  .resume-sidebar {
    grid-column: 1 !important;
    grid-row: 1 !important;
    align-self: stretch !important;
    min-height: var(--pdf-export-min-height) !important;
    background: transparent !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .resume-main {
    grid-column: 2 !important;
    grid-row: 1 !important;
  }

  /* Page-break spacing — items carry their own top-padding so
     content at the top of continuation pages has breathing room */
  .resume-main > div {
    gap: 0 !important;
  }

  .resume-main section > div > div {
    gap: 0 !important;
  }

  .resume-main article {
    break-inside: avoid;
    padding-top: 2rem !important;
    padding-bottom: 0 !important;
  }

  .resume-main article:first-child {
    padding-top: 0 !important;
  }

  .resume-main section h2 {
    break-after: avoid;
  }

  .resume-sidebar > div {
    gap: 0 !important;
  }

  .resume-sidebar section {
    break-inside: avoid;
    padding-top: 2rem !important;
  }
`

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  try {
    await fs.access(OUTPUT_DIR)
  }
  catch {
    console.error(`[generate-pdf] ERROR: Output directory not found: ${OUTPUT_DIR}`)
    console.error('[generate-pdf] Run `nuxt generate` before this script.')
    process.exit(1)
  }

  const resumeIndex = path.join(OUTPUT_DIR, 'resume', 'index.html')
  try {
    await fs.access(resumeIndex)
  }
  catch {
    console.error(`[generate-pdf] ERROR: Resume page not found at ${resumeIndex}`)
    console.error('[generate-pdf] Ensure the /resume route is included in the static output.')
    process.exit(1)
  }

  const PORT = 4173
  const server = createStaticServer(OUTPUT_DIR)

  await new Promise((resolve, reject) => {
    server.on('error', reject)
    server.listen(PORT, '127.0.0.1', resolve)
  })

  console.log(`[generate-pdf] Static server listening on http://127.0.0.1:${PORT}`)

  let browser
  try {
    const { chromium } = await import('playwright')

    browser = await chromium.launch({ headless: true })

    const page = await browser.newPage({
      viewport: { width: 1728, height: 2200 },
      deviceScaleFactor: 1,
    })

    await page.emulateMedia({ media: 'screen' })

    const resumeUrl = `http://127.0.0.1:${PORT}/resume`
    console.log(`[generate-pdf] Navigating to ${resumeUrl} ...`)

    await page.goto(resumeUrl, { waitUntil: 'networkidle' })

    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true })
            img.addEventListener('error', resolve, { once: true })
          })),
      )
    })

    await page.addStyleTag({ content: exportStyles })

    await page.evaluate(() => {
      const PAGE_HEIGHT_PX = 11 * 96
      const shell = document.querySelector('.resume-shell')
      const contentHeight = Math.max(
        shell?.scrollHeight ?? 0,
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      const pages = Math.max(1, Math.ceil(contentHeight / PAGE_HEIGHT_PX))
      const minHeightPx = pages * PAGE_HEIGHT_PX

      document.documentElement.style.setProperty('--pdf-export-min-height', `${minHeightPx}px`)
      document.body.style.minHeight = `${minHeightPx}px`
    })

    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' },
    })

    await fs.writeFile(PDF_PATH, pdf)
    console.log(`[generate-pdf] PDF saved to ${PDF_PATH}`)
  }
  finally {
    await browser?.close()
    await new Promise(resolve => server.close(resolve))
    console.log('[generate-pdf] Done.')
  }
}

main().catch((err) => {
  console.error('[generate-pdf] FAILED:', err)
  process.exit(1)
})
