<script setup lang="ts">
import { provideTheme } from '~/composables/useTheme'

const config = useRuntimeConfig()
const route = useRoute()
const siteUrl = config.public.siteUrl as string

const {
  data: siteInfo
} = await useSiteInfo()

const { color } = provideTheme()

const fullName = computed(() =>
  `${siteInfo.value?.firstName ?? ''} ${siteInfo.value?.lastName ?? ''}`.trim()
)

// Inline script injected into <head> before first paint — prevents flash of
// wrong theme on hard reload or first visit with a saved preference.
useHead({
  titleTemplate: (title) => {
    const base = siteInfo.value?.baseTitle ?? ''
    return title ? `${title} | ${fullName.value} ${base}`.trim() : `${fullName.value} ${base}`.trim()
  },
  link: [{ rel: 'canonical', href: () => `${siteUrl}${route.path}` }],
  script: [
    {
      key: 'theme-init',
      tagPosition: 'head',
      innerHTML: `(function(){var c=localStorage.getItem('theme:color')||'teal';var d=localStorage.getItem('theme:dark');var dark=d!==null?d==='true':window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',c);if(dark)document.documentElement.classList.add('dark');}())`,
    },
    {
      key: 'person-schema',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: fullName.value,
        jobTitle: siteInfo.value?.role ?? 'Front-End Software Engineer',
        url: siteUrl,
        image: `${siteUrl}/bg/plaid-bg-teal.png`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteInfo.value?.city ?? 'Cincinnati',
          addressRegion: siteInfo.value?.state ?? 'OH',
          addressCountry: 'US',
        },
        // SEO: Added contactPoint for better E-E-A-T and contact accessibility
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          url: `${siteUrl}/contact`,
        },
        sameAs: [
          'https://www.linkedin.com/in/davidberning/',
          'https://github.com/daveberning',
        ],
      }),
    },
  ],
})

useSeoMeta({
  ogSiteName: () => fullName.value,
  ogUrl: () => `${siteUrl}${route.path}`,
  ogImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
})
</script>

<template>
  <slot />
</template>