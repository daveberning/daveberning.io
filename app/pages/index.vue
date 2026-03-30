<script setup lang="ts">
import { cn } from '~/lib/utils'

/* Page Data
--------------------------------- */
const {
  isDark
} = useTheme()

const {
  data: siteInfo
} = await useSiteInfo()

/* Page Meta Information
--------------------------------- */
useHead({
  title: `${siteInfo.value?.firstName} ${siteInfo.value?.lastName} ${siteInfo.value?.baseTitle ?? ''}`.trim()
})
</script>

<template>
  <main :class="cn('flex flex-col-reverse lg:flex-row items-center lg:items-stretch min-h-dvh lg:h-screen lg:overflow-hidden', isDark ? 'bg-theme-black' : 'bg-background')">
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
  </main>
</template>
