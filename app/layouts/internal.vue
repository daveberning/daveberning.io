<script setup lang="ts">
import { ThemePicker } from '~/components/ThemePicker'
import { Header, HeaderBrand } from '~/components/Header'
import { provideTheme } from '~/composables/useTheme'

const { color } = provideTheme()

useHead({
  script: [
    {
      key: 'theme-init',
      tagPosition: 'head',
      innerHTML: `(function(){var c=localStorage.getItem('theme:color')||'teal';var d=localStorage.getItem('theme:dark');var dark=d!==null?d==='true':window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',c);if(dark)document.documentElement.classList.add('dark');}())`,
    },
  ],
})

const navigationItems = [
  { name: 'About', to: '/about' },
  { name: 'Work', to: '/work' },
  { name: 'Writing', to: '/writing' },
  { name: 'Contact', to: '/contact' },
  { name: 'Teaching', to: '/teaching' },
]
</script>

<template>
  <div class="flex h-screen flex-col bg-background dark:bg-theme-black">
    <Header :variant="color">
      <HeaderBrand>Dave Berning</HeaderBrand>
      <Navigation dark-variant="text">
        <NavigationItem v-for="item in navigationItems" :key="item.to" :to="item.to">
          {{ item.name }}
        </NavigationItem>
      </Navigation>
    </Header>
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
    <ThemePicker class="fixed bottom-4 left-4 z-50" />
  </div>
</template>
