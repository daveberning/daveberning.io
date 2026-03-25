<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'
import { navigationItems } from '~/variables'

useHead({ title: 'Dave Berning' })

const { color, isDark } = useTheme()
const portrait = computed(() => `/portraits/dave-${color.value}.png`)

</script>

<template>
  <main :class="cn('flex flex-col-reverse lg:flex-row items-center lg:items-stretch h-screen overflow-hidden', isDark ? 'bg-theme-black' : 'bg-background')">
    <Portrait :src="portrait" :alt="`Dave Berning — ${color} theme`" />
    <div class="flex flex-col items-center px-6 sm:px-10 lg:px-16 justify-center">
      <UiText as="h1" class="text-5xl lg:text-[7vw] font-black leading-none">
        Dave Berning
      </UiText>
      <UiText as="h2" class="text-xl lg:text-[1.75vw] font-light leading-0 my-10">
        Front-End Software Engineer in Cincinnati, OH
      </UiText>
      <Navigation dark-variant="outline">
        <NavigationItem v-for="item in navigationItems" :key="item.to" :to="item.to">
          {{ item.name }}
        </NavigationItem>
      </Navigation>
      <UiSocialLinks class="mt-4" />
    </div>
  </main>
</template>
