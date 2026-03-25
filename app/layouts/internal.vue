<script setup lang="ts">
import { ref } from 'vue'
import ThemePicker from '~/components/ThemePicker'
import Header, { HeaderBrand } from '~/components/Header'
import Footer from '~/components/ui/footer'
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
  <div :class="cn('flex min-h-screen flex-col', isDark ? 'bg-theme-black' : 'bg-background')">
    <Header :variant="color" class="px-0 justify-center">
      <div class="container flex items-center justify-between px-8">
        <HeaderBrand>
          <code>&lt;name&gt;</code>Dave<code>&lt;/name&gt;</code>
        </HeaderBrand>
        <Navigation dark-variant="text">
          <NavigationItem v-for="item in navigationItems" :key="item.to" :to="item.to">
            {{ item.name }}
          </NavigationItem>
        </Navigation>
      </div>
    </Header>
    <div class="flex-1 flex justify-center py-12">
      <div :class="cn('container grid grid-cols-1 gap-8 items-start px-8', hasAside && 'md:grid-cols-3')">
        <slot />
      </div>
    </div>
    <UiCtaBar class="text-center flex gap-4">
      <UiText as="h3" color="white">Let's Work Together</UiText>
      <div class="m-4">
        <UiText color="white">I'm always open to new opportunities, freelance projects, and meaningful collaborations. Whether you have an idea or just want to connect, I'd love to hear from you.</UiText>
      </div>
      <UiButton color="white" variant="outline" size="large">Download Résumé</UiButton>
      <UiSocialLinks class="justify-center mt-4" />
    </UiCtaBar>
    <Footer />
    <ThemePicker class="fixed bottom-4 left-4 z-50" />
  </div>
</template>
