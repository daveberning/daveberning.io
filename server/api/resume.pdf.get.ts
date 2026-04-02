/**
 * DEV-ONLY: This route generates the resume PDF on-the-fly using Playwright.
 * It works in `npm run dev` (local development) but is NOT deployed to production.
 *
 * In production (Netlify static deploy), the PDF is pre-generated during
 * `npm run generate` by `scripts/generate-pdf.mjs` and served as a static file
 * at /dave-berning-resume.pdf.
 */
import type { Browser } from 'playwright'
import type { H3Event } from 'h3'
import { createError, defineEventHandler, getHeader, getRequestURL } from 'h3'

function getRequestOrigin(event: H3Event) {
  const url = getRequestURL(event)
  const forwardedHost = getHeader(event, 'x-forwarded-host')
  const forwardedProto = getHeader(event, 'x-forwarded-proto')

  if (forwardedHost)
    return `${forwardedProto ?? url.protocol.replace(':', '')}://${forwardedHost}`

  return url.origin
}

// NOTE: Keep in sync with scripts/generate-pdf.mjs
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

  .print\:hidden,
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

export default defineEventHandler(async (event) => {
  const origin = getRequestOrigin(event)
  const targetUrl = new URL('/resume', origin)

  let browser: Browser | undefined

  try {
    const { chromium } = await import('playwright')

    browser = await chromium.launch({
      headless: true,
    })

    const page = await browser.newPage({
      viewport: {
        width: 1728,
        height: 2200,
      },
      deviceScaleFactor: 1,
    })

    await page.emulateMedia({ media: 'screen' })
    await page.goto(targetUrl.toString(), {
      waitUntil: 'networkidle',
    })

    await page.evaluate(async () => {
      await document.fonts.ready

      await Promise.all(
        Array.from(document.images)
          .filter(image => !image.complete)
          .map(image => new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true })
            image.addEventListener('error', resolve, { once: true })
          })),
      )
    })

    await page.addStyleTag({ content: exportStyles })

    await page.evaluate(() => {
      const PAGE_HEIGHT_PX = 11 * 96
      const shell = document.querySelector<HTMLElement>('.resume-shell')
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
      margin: {
        top: '0in',
        right: '0in',
        bottom: '0in',
        left: '0in',
      },
    })

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="dave-berning-resume.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  }
  catch (error) {
    console.error('Failed to generate resume PDF.', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to generate resume PDF.',
    })
  }
  finally {
    await browser?.close()
  }
})
