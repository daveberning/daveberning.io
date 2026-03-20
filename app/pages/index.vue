<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '~/composables/useTheme'

useHead({ title: 'Dave Berning' })

const { color } = useTheme()
const portrait = computed(() => `/portraits/dave-${color.value}.png`)

const navigationItems = [
  { name: 'About', to: '/about' },
  { name: 'Work', to: '/work' },
  { name: 'Writing', to: '/writing' },
  { name: 'Contact', to: '/contact' },
  { name: 'Teaching', to: '/teaching' },
]
</script>

<template>
  <main class="flex h-screen overflow-hidden bg-background dark:bg-theme-black">
    <UiPortrait :src="portrait" :alt="`Dave Berning — ${color} theme`" />
    <div class="flex flex-1 flex-col items-center px-6 sm:px-10 lg:px-16 justify-center">
      <UiText as="h1" class="text-[7vw] font-black leading-none">
        Dave Berning
      </UiText>
      <UiText as="h2" class="text-[1.75vw] font-light leading-0 my-10">
        Software Engineer &amp; Instructor in Cincinnati, OH
      </UiText>
      <Navigation>
        <NavigationItem v-for="item in navigationItems" :key="item.to" :to="item.to">
          {{ item.name }}
        </NavigationItem>
      </Navigation>
    </div>
  </main>
</template>
