<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

/* Page Data
--------------------------------- */
const {
  data: siteInfo
} = await useSiteInfo()

const homeTitle = computed(() =>
  `${siteInfo.value?.firstName ?? 'Dave'} ${siteInfo.value?.lastName ?? 'Berning'} | Senior Front-End Software Engineer`
)

const homeDescription = computed(() =>
  `Senior Front-End Software Engineer in ${siteInfo.value?.city ?? 'Cincinnati'}, ${siteInfo.value?.state ?? 'OH'} specializing in Vue, Nuxt, TypeScript, design systems, and front-end architecture.`
)

const { color } = useTheme()

useSeoMeta({
  description: () => homeDescription.value,
  ogTitle: () => homeTitle.value,
  ogDescription: () => homeDescription.value,
  ogType: 'website',
  ogImage: () => `${siteUrl}/bg/plaid-bg-${color.value}.jpg`,
  twitterTitle: () => homeTitle.value,
  twitterDescription: () => homeDescription.value,
  twitterImage: () => `${siteUrl}/bg/plaid-bg-${color.value}.jpg`,
})

useHead({
  script: [
    {
      key: 'home-website-schema',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: `${siteInfo.value?.firstName ?? 'Dave'} ${siteInfo.value?.lastName ?? 'Berning'}`.trim(),
        url: siteUrl,
        description: homeDescription.value,
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout name="homepage">
    <Portrait size="large" />
    <div class="flex flex-col items-center px-6 sm:px-10 lg:px-10 xl:px-16 justify-start lg:justify-center pt-14 sm:pt-16 pb-6 lg:pt-0 lg:pb-0">
      <UiText as="h1" class="text-4xl sm:text-5xl lg:text-[4.5vw] lg:whitespace-nowrap xl:whitespace-normal xl:text-[6vw] 2xl:text-[7vw] font-black leading-none">
        {{ siteInfo?.firstName }} {{ siteInfo?.lastName }}
      </UiText>
      <UiText as="h2" class="text-xl text-center lg:text-[1.75vw] font-light leading-tight my-6 lg:my-10">
        {{ siteInfo?.role }} in {{ siteInfo?.city }}, {{ siteInfo?.state }}
      </UiText>
      <Navigation dark-variant="outline" class="flex-wrap justify-center lg:flex-nowrap lg:justify-start">
        <NavigationItem v-for="item in siteInfo?.navigation ?? []" :key="item.to" :to="item.to">
          {{ item.name }}
        </NavigationItem>
      </Navigation>
      <SocialLinks :links="siteInfo?.socialLinks ?? []" class="mt-6 lg:mt-4" />
    </div>
  </NuxtLayout>
</template>
