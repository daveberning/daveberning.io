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

const exportStyles = `
  @page {
    size: Letter;
    margin: 0 !important;
  }

  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    width: 100% !important;
    height: 100% !important;
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
  }

  .resume-page {
    padding: 0 !important;
    margin: 0 !important;
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
    min-height: 11in !important;
    border-radius: 0 !important;
    border-width: 0 !important;
    box-shadow: none !important;
  }

  .resume-grid {
    display: grid !important;
    grid-template-columns: 15rem minmax(0, 1fr) !important;
    grid-template-rows: auto 1fr !important;
    align-items: stretch !important;
    min-height: 11in !important;
  }

  .resume-hero {
    grid-column: 1 / -1 !important;
  }

  .resume-hero-portrait {
    display: block !important;
  }

  .resume-hero-portrait img {
    display: block !important;
    left: 1.75rem !important;
    width: 6.75rem !important;
    height: 6.75rem !important;
  }

  .resume-hero-inner {
    padding-left: 11.5rem !important;
    padding-right: 1.75rem !important;
  }

  .resume-hero-mobile {
    display: none !important;
  }

  .resume-hero-desktop {
    display: block !important;
  }

  .resume-hero-desktop h1 {
    font-size: 2.25rem !important;
    line-height: 1 !important;
  }

  .resume-hero-desktop p {
    font-size: 0.8rem !important;
    margin-top: 0.4rem !important;
  }

  .resume-hero-meta {
    text-align: right !important;
    font-size: 0.65rem !important;
  }

  .resume-additional-grid {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .resume-sidebar-rail {
    grid-column: 1 !important;
    grid-row: 2 !important;
    align-self: stretch !important;
    height: 100% !important;
    min-height: 100% !important;
  }

  .resume-main-column {
    grid-column: 2 !important;
    grid-row: 2 !important;
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
