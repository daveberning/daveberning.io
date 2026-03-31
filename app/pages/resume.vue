<script setup lang="ts">
import { cn } from '~/lib/utils'

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

const resumeTitle = page.value.title ?? 'Resume'
const resumeDescription = page.value.description ?? 'View the resume of Dave Berning, a Senior Front-End Software Engineer specializing in front-end architecture, design systems, and Vue.'
const resumeImage = `${siteUrl}/portraits/dave-teal-sm.jpg`
const personName = resumeData.name
const headerLinks = Array.from(new Map([
  { href: siteUrl, label: siteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') },
  ...(siteInfo.value?.socialLinks?.map(link => ({
    href: link.href,
    label: link.href.startsWith('mailto:')
      ? link.href.slice('mailto:'.length)
      : link.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
  })) ?? []),
].map(link => [link.href, link])).values())

const sameAs = Array.from(new Set([
  `${siteUrl}/about`,
  ...headerLinks
    .map(link => link.href)
    .filter(href => href.startsWith('http')),
]))

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
          sameAs,
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

const {
  color,
  isDark,
} = useTheme()
</script>

<template>
  <div class="resume-page">
    <NuxtLayout name="sidebar">
      <div class="flex flex-col gap-6 print:block">
        <UiCard
          variant="outline"
          :color="color"
          :class="cn(
            'resume-page-intro border-theme/30 bg-gradient-to-br p-6 sm:p-8',
            isDark ? 'from-theme-black via-surface to-theme-black' : 'from-white via-surface to-theme-light/20',
          )"
        >
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
                  This page keeps the site presentation on screen, but the print view collapses to a traditional resume for PDF export.
                </p>
              </div>
              <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-muted lg:max-w-xs lg:justify-end lg:text-right">
                <span>{{ resumeData.location }}</span>
                <span class="hidden lg:inline text-border">/</span>
                <a :href="siteUrl" class="underline decoration-theme/30 underline-offset-4 hover:decoration-theme">
                  {{ siteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') }}
                </a>
              </div>
            </div>
          </div>
        </UiCard>

        <Resume class="overflow-hidden">
          <div class="px-6 py-7 sm:px-10 sm:py-10 print:px-0 print:py-0">
            <header class="border-b border-border pb-8 print:border-zinc-200 print:pb-6">
              <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div class="max-w-3xl">
                  <p class="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-text-muted print:text-zinc-500">
                    Resume
                  </p>
                  <h1 class="mt-3 text-4xl font-bold tracking-tight text-text sm:text-5xl print:text-[26pt] print:text-zinc-950">
                    {{ resumeData.name }}
                  </h1>
                  <p class="mt-3 text-lg font-medium text-text print:text-[12pt] print:text-zinc-700">
                    {{ resumeData.role }}
                  </p>
                  <p class="mt-4 max-w-2xl text-[0.97rem] leading-7 text-text-muted print:text-[11pt] print:leading-[1.55] print:text-zinc-700">
                    {{ resumeData.summary }}
                  </p>
                </div>
                <div class="lg:max-w-xs lg:text-right">
                  <p class="text-sm font-medium text-text print:text-zinc-700">
                    {{ resumeData.location }}
                  </p>
                  <ul role="list" class="mt-4 flex flex-col gap-2 text-sm leading-6 text-text-muted list-none print:text-zinc-700">
                    <li v-for="link in headerLinks" :key="link.href">
                      <a
                        :href="link.href"
                        class="text-text underline decoration-theme/30 underline-offset-4 transition-colors hover:decoration-theme print:text-zinc-700 print:decoration-zinc-300 print:hover:decoration-zinc-700"
                      >
                        {{ link.label }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <ul v-if="resumeData.highlights?.length" role="list" class="mt-6 grid gap-3 text-sm text-text-muted list-none sm:grid-cols-3 print:text-zinc-700">
                <li v-for="highlight in resumeData.highlights" :key="highlight" class="border-l-2 border-theme/25 pl-4 leading-6 print:border-zinc-200">
                  {{ highlight }}
                </li>
              </ul>
            </header>

            <div class="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,0.95fr)] print:mt-6 print:gap-8">
              <div class="flex flex-col gap-6">
                <ResumeSection title="Experience">
                  <ResumeEntry
                    v-for="item in resumeData.experience ?? []"
                    :key="`${item.title}-${item.organization}`"
                    :title="item.title"
                    :organization="item.organization"
                    :period="item.period"
                    :location="item.location"
                    :summary="item.summary"
                  >
                    <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60 print:marker:text-zinc-400">
                      <li v-for="highlight in item.highlights" :key="highlight">
                        {{ highlight }}
                      </li>
                    </ul>
                  </ResumeEntry>
                </ResumeSection>

                <ResumeSection v-if="resumeData.teaching?.length" title="Teaching & Mentorship">
                  <ResumeEntry
                    v-for="item in resumeData.teaching"
                    :key="`${item.title}-${item.organization}`"
                    :title="item.title"
                    :organization="item.organization"
                    :period="item.period"
                    :location="item.location"
                    :summary="item.summary"
                  >
                    <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60 print:marker:text-zinc-400">
                      <li v-for="highlight in item.highlights" :key="highlight">
                        {{ highlight }}
                      </li>
                    </ul>
                  </ResumeEntry>
                </ResumeSection>

                <ResumeSection v-if="resumeData.writing?.length" title="Writing & Publications">
                  <ResumeEntry
                    v-for="item in resumeData.writing"
                    :key="`${item.title}-${item.organization}`"
                    :title="item.title"
                    :organization="item.organization"
                    :period="item.period"
                    :location="item.location"
                    :summary="item.summary"
                  >
                    <ul v-if="item.highlights?.length" role="list" class="list-disc space-y-1.5 pl-5 marker:text-theme/60 print:marker:text-zinc-400">
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
                    class="break-inside-avoid flex flex-col gap-1.5 text-sm leading-6 text-text-muted print:text-zinc-700"
                  >
                    <h3 class="text-base font-semibold leading-tight text-text print:text-zinc-950">
                      {{ item.school }}
                    </h3>
                    <p v-if="item.degree" class="font-medium text-text print:text-zinc-700">
                      {{ item.degree }}
                    </p>
                    <p v-if="item.details">
                      {{ item.details }}
                    </p>
                  </article>
                </ResumeSection>
              </div>

              <aside class="flex flex-col gap-6">
                <ResumeSection v-if="resumeData.skillGroups?.length" title="Core Skills">
                  <div class="grid gap-4">
                    <article v-for="group in resumeData.skillGroups" :key="group.title" class="break-inside-avoid">
                      <h3 class="text-sm font-semibold text-text print:text-zinc-950">
                        {{ group.title }}
                      </h3>
                      <p class="mt-1 text-sm leading-6 text-text-muted print:text-zinc-700">
                        {{ group.items.join(', ') }}
                      </p>
                    </article>
                  </div>
                </ResumeSection>

                <ResumeSection v-if="resumeData.focusAreas?.length" title="Focus Areas">
                  <ul role="list" class="grid gap-2 text-sm leading-6 text-text-muted list-none print:text-zinc-700">
                    <li
                      v-for="focus in resumeData.focusAreas"
                      :key="focus"
                      class="border-b border-border pb-2 last:border-b-0 last:pb-0 print:border-zinc-200/70"
                    >
                      {{ focus }}
                    </li>
                  </ul>
                </ResumeSection>
              </aside>
            </div>
          </div>
        </Resume>
      </div>

      <template #aside>
        <div class="resume-page-aside flex flex-col gap-6 print:hidden">
          <Portrait size="small" class="rounded-lg" />
          <UiAside class="py-2">
            <UiAsideSection>
              <UiAsideSubtitle>Quick Snapshot</UiAsideSubtitle>
              <ul role="list" class="grid gap-2 list-none">
                <li v-for="highlight in resumeData.highlights ?? []" :key="highlight">
                  <UiText color="white" class="leading-6">{{ highlight }}</UiText>
                </li>
              </ul>
            </UiAsideSection>
            <UiAsideSection v-if="resumeData.focusAreas?.length">
              <UiAsideSubtitle>Focus Areas</UiAsideSubtitle>
              <UiAsideList :items="resumeData.focusAreas" />
            </UiAsideSection>
          </UiAside>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<style scoped>
@media print {
  .resume-page :deep(.site-header),
  .resume-page :deep(.site-layout-aside),
  .resume-page :deep(.site-cta),
  .resume-page :deep(.site-footer),
  .resume-page :deep(.site-mobile-nav),
  .resume-page :deep(.resume-page-intro) {
    display: none !important;
  }

  .resume-page :deep(.site-layout-body) {
    padding: 0 !important;
  }

  .resume-page :deep(.container) {
    max-width: none !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .resume-page :deep(.site-layout-main) {
    grid-column: 1 / -1 !important;
  }
}
</style>
