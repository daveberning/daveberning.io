<script setup lang="ts">
import { cn } from '~/lib/utils'
import { navigationItems } from '~/variables'

/* Page Meta Information
--------------------------------- */
useHead({ title: 'Dave Berning' })

const { isDark } = useTheme()
</script>

<template>
  <main :class="cn('flex flex-col-reverse lg:flex-row items-center lg:items-stretch min-h-dvh lg:h-screen lg:overflow-hidden', isDark ? 'bg-theme-black' : 'bg-background')">
    <Portrait size="large" />
    <div class="flex flex-col items-center px-6 sm:px-10 lg:px-16 justify-start lg:justify-center pt-10 pb-6 lg:pt-0 lg:pb-0">
      <UiText as="h1" class="text-4xl sm:text-5xl lg:text-[7vw] font-black leading-none">
        Dave Berning
      </UiText>
      <UiText as="h2" class="text-xl lg:text-[1.75vw] font-light leading-0 my-6 lg:my-10">
        Front-End Software Engineer in Cincinnati, OH
      </UiText>
      <Navigation dark-variant="outline" class="flex-wrap justify-center lg:flex-nowrap lg:justify-start">
        <NavigationItem v-for="item in navigationItems" :key="item.to" :to="item.to">
          {{ item.name }}
        </NavigationItem>
      </Navigation>
      <SocialLinks class="mt-6 lg:mt-4" />
    </div>
  </main>
</template>
