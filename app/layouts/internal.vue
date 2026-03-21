<script setup lang="ts">
import { ThemePicker } from '~/components/ThemePicker'
import { Header, HeaderBrand } from '~/components/Header'
import { provideTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'
import { navigationItems } from '~/variables'

const {
  color,
  isDark
} = provideTheme()

useHead({
  script: [
    {
      key: 'theme-init',
      tagPosition: 'head',
      innerHTML: `(function(){var c=localStorage.getItem('theme:color')||'teal';var d=localStorage.getItem('theme:dark');var dark=d!==null?d==='true':window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',c);if(dark)document.documentElement.classList.add('dark');}())`,
    },
  ],
})
</script>

<template>
  <div :class="cn('flex h-screen flex-col', isDark ? 'bg-theme-black' : 'bg-background')">
    <Header :variant="color" class="px-0 justify-center">
      <div class="container flex items-center justify-between">
        <HeaderBrand>Dave Berning</HeaderBrand>
        <Navigation dark-variant="text">
          <NavigationItem v-for="item in navigationItems" :key="item.to" :to="item.to">
            {{ item.name }}
          </NavigationItem>
        </Navigation>
      </div>
    </Header>
    <main class="flex-1 overflow-auto flex justify-center py-12">
      <div class="container">
        <slot />
      </div>
    </main>
    <ThemePicker class="fixed bottom-4 left-4 z-50" />
  </div>
</template>
