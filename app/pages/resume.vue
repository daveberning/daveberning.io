<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

/* Page Content
--------------------------------- */
const [{ data: page }, { data: siteInfo }] = await Promise.all([
  useAsyncData('resume', () => queryCollection('content').path('/resume').first()),
  useSiteInfo(),
])

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Resume not found' })

const resumeData = page.value.resume

if (!resumeData)
  throw createError({ statusCode: 500, statusMessage: 'Resume data missing' })

const {
  color,
} = useTheme()

const resumeTitle = page.value.title ?? 'Resume'
const resumeDescription = page.value.description ?? 'View the resume of Dave Berning, a Senior Front-End Software Engineer specializing in front-end architecture, design systems, and Vue.'
const resumeImage = computed(() => `${siteUrl}/bg/plaid-bg-${color.value}.jpg`)
const portraitSrc = computed(() => `/portraits/dave-${color.value}-sm.jpg`)
const personName = resumeData.name
const siteLabel = siteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const socialLinks = computed(() => siteInfo.value?.socialLinks ?? [])

const contactItems = computed(() => {
  const items = [
    {
      label: 'Location',
      value: resumeData.location,
      href:  '',
      icon:  'lucide:map-pin',
    },
    {
      label: 'Website',
      value: siteLabel,
      href:  siteUrl,
      icon:  'lucide:globe',
    },
  ]

  return [
    ...items,
    ...socialLinks.value.map(link => ({
      label: link.label,
      value: link.href.startsWith('mailto:')
        ? link.href.slice('mailto:'.length)
        : link.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: link.href,
      icon: link.icon,
    })),
  ]
})

const sameAs = computed(() => Array.from(new Set([
  `${siteUrl}/about`,
  ...socialLinks.value
    .map(link => link.href)
    .filter(href => href.startsWith('http')),
])))

/* Page Meta Information
--------------------------------- */
useHead({
  title: resumeTitle,
  script: [
    {
      key: 'resume-profile-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: resumeTitle,
        description: resumeDescription,
        url: `${siteUrl}/resume`,
        mainEntity: {
          '@type': 'Person',
          name: personName,
          jobTitle: resumeData.role,
          description: resumeDescription,
          url: `${siteUrl}/resume`,
          image: resumeImage.value,
          sameAs: sameAs.value,
          address: {
            '@type': 'PostalAddress',
            addressLocality: siteInfo.value?.city ?? 'Cincinnati',
            addressRegion: siteInfo.value?.state ?? 'OH',
            addressCountry: 'US',
          },
        },
      }),
    },
  ],
})

useSeoMeta({
  description: resumeDescription,
  ogTitle: `${resumeTitle} | ${personName}`,
  ogDescription: resumeDescription,
  ogType: 'profile',
  ogImage: () => resumeImage.value,
  twitterTitle: `${resumeTitle} | ${personName}`,
  twitterDescription: resumeDescription,
  twitterImage: () => resumeImage.value,
})
</script>

<template>
  <div class="resume-page">
    <NuxtLayout name="sidebar">
      <div class="flex flex-col gap-6 print:gap-0">
        <UiCard variant="outline" :color="color" class="resume-page-intro border-theme/30 bg-gradient-to-br from-white via-surface to-theme-light/20 p-6 sm:p-8 print:hidden">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <UiText class="mt-4">
                This version mirrors a concise one-page resume layout while still living inside the website experience.
              </UiText>
              <UiLink to="/dave-berning-resume.pdf" color="teal" variant="outline">
                <Icon name="lucide:download" class="size-4" aria-hidden="true" />
                Download PDF
              </UiLink>
            </div>
        </UiCard>

        <Resume class="resume-shell overflow-hidden print:overflow-hidden print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]">
          <div class="resume-grid grid lg:grid-cols-[15rem_minmax(0,1fr)] print:grid-cols-[15rem_minmax(0,1fr)]">
            <aside class="resume-sidebar bg-theme-black text-theme-fg px-6 py-8 print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]">
              <div class="flex flex-col gap-7 print:gap-0">
                <div class="flex flex-col items-center gap-4">
                  <img
                    :src="portraitSrc"
                    alt=""
                    class="h-28 w-28 rounded-full border-4 border-theme object-cover shadow-lg"
                  >
                  <div class="text-center">
                    <h1 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight">
                      {{ resumeData.name }}
                    </h1>
                    <p class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-theme">
                      {{ resumeData.role }}
                    </p>
                  </div>
                </div>

                <section class="break-inside-avoid flex flex-col gap-3 print:pt-8">
                  <h2 class="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-theme">
                    Details
                  </h2>
                  <ul role="list" class="grid gap-2.5 list-none">
                    <li v-for="item in contactItems" :key="`${item.label}-${item.value}`" class="flex items-start gap-2.5 text-xs leading-5 text-theme-fg/80">
                      <span class="mt-0.5 inline-flex shrink-0 items-center justify-center text-theme">
                        <Icon :name="item.icon" class="size-3.5" aria-hidden="true" />
                      </span>
                      <div class="min-w-0">
                        <a
                          v-if="item.href"
                          :href="item.href"
                          class="break-words underline decoration-theme/30 underline-offset-4 hover:decoration-theme"
                        >
                          {{ item.value }}
                        </a>
                        <p v-else class="break-words">
                          {{ item.value }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </section>

                <section v-for="group in resumeData.skillGroups" :key="group.title" class="break-inside-avoid flex flex-col gap-3 print:pt-8">
                  <h2 class="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-theme">
                    {{ group.title }}
                  </h2>
                  <ul role="list" class="list-disc space-y-1.5 pl-4 text-xs leading-5 text-theme-fg/80 marker:text-theme/60">
                    <li v-for="skill in group.items" :key="skill">
                      {{ skill }}
                    </li>
                  </ul>
                </section>

                <section v-if="resumeData.highlights?.length" class="break-inside-avoid flex flex-col gap-3 print:pt-8">
                  <h2 class="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-theme">
                    Highlights
                  </h2>
                  <ul role="list" class="list-disc space-y-1.5 pl-4 text-xs leading-5 text-theme-fg/80 marker:text-theme/60">
                    <li v-for="highlight in resumeData.highlights" :key="highlight">
                      {{ highlight }}
                    </li>
                  </ul>
                </section>
              </div>
            </aside>

            <div class="resume-main px-6 py-8 sm:px-8 print:px-8">
              <div class="flex flex-col gap-7 print:gap-0">
                <ResumeSection title="Professional Summary">
                  <p class="text-sm leading-7 text-text-muted">
                    {{ resumeData.summary }}
                  </p>
                </ResumeSection>

                <ResumeSection title="Professional Experience">
                  <ResumeEntry
                    v-for="item in resumeData.experience ?? []"
                    :key="`${item.title}-${item.organization}`"
                    :title="item.title"
                    :organization="item.organization"
                    :period="item.period"
                    :location="item.location"
                    :summary="item.summary"
                  >
                    <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60">
                      <li v-for="highlight in item.highlights" :key="highlight">
                        {{ highlight }}
                      </li>
                    </ul>
                  </ResumeEntry>
                </ResumeSection>

                <ResumeSection title="Additional Experience">
                  <ResumeEntry
                    v-for="item in resumeData.teaching ?? []"
                    :key="`${item.title}-${item.organization}`"
                    :title="item.title"
                    :organization="item.organization"
                    :period="item.period"
                    :location="item.location"
                    :summary="item.summary"
                  >
                    <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60">
                      <li v-for="highlight in item.highlights" :key="highlight">
                        {{ highlight }}
                      </li>
                    </ul>
                  </ResumeEntry>
                  <ResumeEntry
                    v-for="item in resumeData.writing ?? []"
                    :key="`${item.title}-${item.organization}`"
                    :title="item.title"
                    :organization="item.organization"
                    :period="item.period"
                    :location="item.location"
                    :summary="item.summary"
                  >
                    <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60">
                      <li v-for="highlight in item.highlights" :key="highlight">
                        {{ highlight }}
                      </li>
                    </ul>
                  </ResumeEntry>
                </ResumeSection>

                <ResumeSection v-if="resumeData.education?.length" title="Education">
                  <article
                    v-for="item in resumeData.education"
                    :key="item.school"
                    class="break-inside-avoid flex flex-col gap-1.5 text-sm leading-6 text-text-muted"
                  >
                    <h3 class="text-base font-semibold leading-tight text-text">
                      {{ item.school }}
                    </h3>
                    <p v-if="item.degree" class="font-medium text-text">
                      {{ item.degree }}
                    </p>
                    <p v-if="item.details">
                      {{ item.details }}
                    </p>
                  </article>
                </ResumeSection>
              </div>
            </div>
          </div>
        </Resume>
      </div>
    </NuxtLayout>
  </div>
</template>

<style>
@page {
  size: Letter;
  margin: 0 !important;
}
</style>

<style scoped>
@media print {
  .resume-page :deep(.site-header),
  .resume-page :deep(.site-cta),
  .resume-page :deep(.site-footer),
  .resume-page :deep(.site-mobile-nav),
  .resume-page :deep(.theme-picker),
  .resume-page :deep(.breakpoint-reporter),
  .resume-page :deep(.resume-page-intro),
  .resume-page :deep(.resume-download-button) {
    display: none !important;
  }

  .resume-page :deep(.site-layout-body) {
    display: block !important;
    justify-content: stretch !important;
    align-items: stretch !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }

  .resume-page :deep(.container) {
    display: block !important;
    max-width: none !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin: 0 !important;
  }

  .resume-page :deep(.site-layout-main) {
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

  .resume-page :deep(.resume-shell) {
    display: block !important;
    width: 100% !important;
    max-width: none !important;
    min-height: 100vh !important;
    border-radius: 0 !important;
    border-width: 0 !important;
    box-shadow: none !important;
    margin: 0 !important;
  }

  .resume-page :deep(.resume-grid) {
    display: grid !important;
    grid-template-columns: 15rem minmax(0, 1fr) !important;
    align-items: stretch !important;
    min-height: 100vh !important;
  }

  .resume-page :deep(.resume-sidebar) {
    grid-column: 1 !important;
    grid-row: 1 !important;
    align-self: stretch !important;
    height: 100% !important;
    min-height: 100% !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .resume-page :deep(.resume-main) {
    grid-column: 2 !important;
    grid-row: 1 !important;
  }

  /* Page-break spacing — zero out flex gaps, items carry their own padding */
  .resume-page :deep(.resume-main > div) {
    gap: 0 !important;
  }

  .resume-page :deep(.resume-main section > div > div) {
    gap: 0 !important;
  }

  .resume-page :deep(.resume-main article) {
    break-inside: avoid;
    padding-top: 2rem !important;
    padding-bottom: 0 !important;
  }

  .resume-page :deep(.resume-main article:first-child) {
    padding-top: 0 !important;
  }

  .resume-page :deep(.resume-main section h2) {
    break-after: avoid;
  }

  .resume-page :deep(.resume-sidebar > div) {
    gap: 0 !important;
  }

  .resume-page :deep(.resume-sidebar section) {
    break-inside: avoid;
    padding-top: 2rem !important;
  }
}
</style>
