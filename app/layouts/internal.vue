<script setup lang="ts">
import { ref } from 'vue'
import ThemePicker from '~/components/ThemePicker'
import Header, { HeaderBrand } from '~/components/Header'
import { provideInternalContext } from '~/components/Internal'
import { provideTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'
import { navigationItems } from '~/variables'

const { color, isDark } = provideTheme()

const hasAside = ref(false)
provideInternalContext({ hasAside, setHasAside: (v) => { hasAside.value = v } })

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
        <HeaderBrand>
          <code class="text-base text-rose-700/60">&lt;name&gt;</code>Dave<code class="text-base text-rose-700/60">&lt;/name&gt;</code>
        </HeaderBrand>
        <Navigation dark-variant="text">
          <NavigationItem v-for="item in navigationItems" :key="item.to" :to="item.to">
            {{ item.name }}
          </NavigationItem>
        </Navigation>
      </div>
    </Header>
    <div class="flex-1 overflow-auto flex justify-center py-12">
      <div :class="cn('container grid grid-cols-1 gap-8 items-start', hasAside && 'md:grid-cols-3')">
        <slot />
      </div>
    </div>
    <ThemePicker class="fixed bottom-4 left-4 z-50" />
  </div>
</template>
