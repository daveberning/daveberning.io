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
const resumeImage = `${siteUrl}/portraits/dave-teal-sm.jpg`
const portraitSrc = computed(() => `/portraits/dave-${color.value}-sm.jpg`)
const personName = resumeData.name
const siteLabel = siteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const socialLinks = computed(() => siteInfo.value?.socialLinks ?? [])
const headerLinks = computed(() => Array.from(new Map([
  { href: siteUrl, label: siteLabel },
  ...socialLinks.value.map(link => ({
    href: link.href,
    label: link.href.startsWith('mailto:')
      ? link.href.slice('mailto:'.length)
      : link.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
  })),
].map(link => [link.href, link])).values()))

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

const keySkills = computed(() =>
  (resumeData.skillGroups ?? [])
    .flatMap(group => group.items)
    .slice(0, 8)
)

const sameAs = computed(() => Array.from(new Set([
  `${siteUrl}/about`,
  ...headerLinks.value
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
          image: resumeImage,
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
  ogImage: resumeImage,
  twitterTitle: `${resumeTitle} | ${personName}`,
  twitterDescription: resumeDescription,
  twitterImage: resumeImage,
})
</script>

<template>
  <div class="resume-page">
    <NuxtLayout name="sidebar">
      <div class="flex flex-col gap-6 print:gap-0">
        <UiCard variant="outline" :color="color" class="resume-page-intro border-theme/30 bg-gradient-to-br from-white via-surface to-theme-light/20 p-6 sm:p-8 print:hidden">
          <div class="flex flex-col gap-4">
            <p class="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-text-muted">
              Resume
            </p>
            <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div class="max-w-3xl">
                <h1 class="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                  {{ resumeData.name }}
                </h1>
                <p class="mt-2 text-lg font-medium text-text">
                  {{ resumeData.role }}
                </p>
                <p class="mt-4 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
                  This version mirrors a concise one-page resume layout while still living inside the website experience.
                </p>
              </div>
              <UiButton
                as="a"
                href="/dave-berning-resume.pdf"
                color="teal"
                variant="outline"
                class="resume-download-button self-start"
              >
                <Icon name="lucide:download" class="size-4" aria-hidden="true" />
                Download PDF
              </UiButton>
            </div>
          </div>
        </UiCard>

        <Resume class="resume-shell overflow-hidden print:overflow-hidden print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]">
          <div class="resume-grid grid lg:grid-cols-[15rem_minmax(0,1fr)] print:grid-cols-[15rem_minmax(0,1fr)]">
            <header class="resume-hero relative border-b border-border bg-theme text-theme-fg lg:col-span-2 print:col-span-2 print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]">
              <div class="resume-hero-portrait hidden lg:block print:block">
                <img
                  :src="portraitSrc"
                  alt=""
                  class="absolute left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border-4 border-background object-cover shadow-lg print:left-8 print:h-32 print:w-32 print:border-white"
                >
              </div>

              <div class="resume-hero-inner flex flex-col gap-5 px-6 py-6 sm:px-8 lg:pl-48 lg:pr-10 print:px-8 print:pl-48 print:pr-10">
                <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between print:flex-row print:items-center print:justify-between">
                  <div class="resume-hero-mobile flex items-center gap-4 lg:hidden print:hidden">
                    <img
                      :src="portraitSrc"
                      alt=""
                      class="h-20 w-20 rounded-full border-4 border-background object-cover shadow-lg print:hidden"
                    >
                    <div>
                      <h1 class="font-['Space_Grotesk'] text-3xl font-bold tracking-tight sm:text-4xl print:text-[24pt]">
                        {{ resumeData.name }}
                      </h1>
                      <p class="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-theme-fg/80 print:text-[10pt]">
                        {{ resumeData.role }}
                      </p>
                    </div>
                  </div>

                  <div class="resume-hero-desktop hidden lg:block print:block">
                    <h1 class="font-['Space_Grotesk'] text-5xl font-bold tracking-tight print:text-5xl">
                      {{ resumeData.name }}
                    </h1>
                    <p class="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-theme-fg/80 print:text-sm">
                      {{ resumeData.role }}
                    </p>
                  </div>

                  <div class="resume-hero-meta grid gap-1 text-xs font-medium uppercase tracking-[0.16em] text-theme-fg/75 sm:text-right print:text-right print:text-xs">
                    <span>{{ resumeData.location }}</span>
                    <span>11+ Years Experience</span>
                  </div>
                </div>
              </div>
            </header>

            <aside class="resume-sidebar-rail border-b border-border bg-surface px-6 py-6 lg:border-b-0 lg:border-r print:border-b-0 print:border-r print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]">
              <div class="flex flex-col gap-7">
                <section class="flex flex-col gap-3">
                  <h2 class="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-theme">
                    Personal Information
                  </h2>
                  <ul role="list" class="grid gap-3 list-none">
                    <li v-for="item in contactItems" :key="`${item.label}-${item.value}`" class="flex items-start gap-3 text-sm leading-5 text-text-muted">
                      <span class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-theme/10 text-theme">
                        <Icon :name="item.icon" class="size-3.5" aria-hidden="true" />
                      </span>
                      <div class="min-w-0">
                        <p class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-text">
                          {{ item.label }}
                        </p>
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

                <section v-if="resumeData.highlights?.length" class="flex flex-col gap-3">
                  <h2 class="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-theme">
                    Highlights
                  </h2>
                  <ul role="list" class="list-disc space-y-2 pl-4 text-sm leading-6 text-text-muted marker:text-theme">
                    <li v-for="highlight in resumeData.highlights" :key="highlight">
                      {{ highlight }}
                    </li>
                  </ul>
                </section>

                <section v-if="keySkills.length" class="flex flex-col gap-3">
                  <h2 class="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-theme">
                    Key Skills
                  </h2>
                  <ul role="list" class="list-disc space-y-2 pl-4 text-sm leading-6 text-text-muted marker:text-theme">
                    <li v-for="skill in keySkills" :key="skill">
                      {{ skill }}
                    </li>
                  </ul>
                </section>
              </div>
            </aside>

            <div class="resume-main-column px-6 py-6 sm:px-8 print:px-8">
              <div class="flex flex-col gap-7">
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

                <ResumeSection v-if="resumeData.writing?.length || resumeData.teaching?.length" title="Additional Experience">
                  <div class="resume-additional-grid grid gap-6 lg:grid-cols-2 print:grid-cols-2">
                    <div v-if="resumeData.teaching?.length" class="flex flex-col gap-4">
                      <ResumeEntry
                        v-for="item in resumeData.teaching"
                        :key="`${item.title}-${item.organization}`"
                        :title="item.title"
                        :organization="item.organization"
                        :period="item.period"
                        :location="item.location"
                        :summary="item.summary"
                        class="pb-0"
                      >
                        <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60">
                          <li v-for="highlight in item.highlights" :key="highlight">
                            {{ highlight }}
                          </li>
                        </ul>
                      </ResumeEntry>
                    </div>

                    <div v-if="resumeData.writing?.length" class="flex flex-col gap-4">
                      <ResumeEntry
                        v-for="item in resumeData.writing"
                        :key="`${item.title}-${item.organization}`"
                        :title="item.title"
                        :organization="item.organization"
                        :period="item.period"
                        :location="item.location"
                        :summary="item.summary"
                        class="pb-0"
                      >
                        <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60">
                          <li v-for="highlight in item.highlights" :key="highlight">
                            {{ highlight }}
                          </li>
                        </ul>
                      </ResumeEntry>
                    </div>
                  </div>
                </ResumeSection>

                <ResumeSection title="References Available Upon Request">
                  <p class="text-sm leading-7 text-text-muted">
                    Professional references are available upon request.
                  </p>
                </ResumeSection>
              </div>
            </div>
          </div>
        </Resume>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
@media print {
  .resume-page :deep(.site-header),
  .resume-page :deep(.site-cta),
  .resume-page :deep(.site-footer),
  .resume-page :deep(.site-mobile-nav) {
    display: none !important;
  }

  .resume-page :deep(.site-layout-body) {
    padding: 0 !important;
  }

  .resume-page :deep(.site-layout-main) {
    width: 100% !important;
  }

  .resume-page :deep(.container) {
    max-width: none !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .resume-page :deep(.resume-page-intro) {
    display: block !important;
    break-inside: avoid;
  }

  .resume-page :deep(.resume-shell) {
    box-shadow: none !important;
  }

  .resume-page :deep(.resume-grid) {
    grid-template-columns: 15rem minmax(0, 1fr) !important;
  }

  .resume-page :deep(.resume-sidebar-rail),
  .resume-page :deep(.resume-main-column),
  .resume-page :deep(.resume-hero) {
    break-inside: avoid;
  }

  .resume-page :deep(.resume-hero) {
    border-bottom-color: var(--border) !important;
  }
}
</style>
