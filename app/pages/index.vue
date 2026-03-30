<script setup lang="ts">
/* Page Data
--------------------------------- */
const {
  data: siteInfo
} = await useSiteInfo()
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
