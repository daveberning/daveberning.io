<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import ThemePicker from '~/components/ThemePicker'
import Header, { HeaderBrand, HeaderHamburger } from '~/components/Header'
import Footer from '~/components/Footer'
import MobileNav from '~/components/MobileNav'
import { provideInternalContext } from '~/components/Internal'
import { provideTheme } from '~/composables/useTheme'
import { provideMobileNav } from '~/composables/useMobileNav'
import { cn } from '~/lib/utils'

const { color, isDark } = provideTheme()
const { data: siteInfo } = await useSiteInfo()
const { isOpen, open, toggle } = provideMobileNav()

const headerRef = ref<ComponentPublicInstance | null>(null)
useSwipeGesture(headerRef, 'down', open)

const hasAside = ref(false)
provideInternalContext({ hasAside, setHasAside: (v) => { hasAside.value = v } })

useHead({
  titleTemplate: (title) => {
    const fullName = `${siteInfo.value?.firstName ?? ''} ${siteInfo.value?.lastName ?? ''}`.trim()
    const base = siteInfo.value?.baseTitle ?? ''
    return title ? `${title} | ${fullName} ${base}`.trim() : `${fullName} ${base}`.trim()
  },
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
    <Header ref="headerRef" :variant="color" class="px-0 justify-center">
      <div class="container flex items-center justify-between px-8">
        <HeaderBrand>
          <code>&lt;name&gt;</code>{{ siteInfo?.firstName }}<code>&lt;/name&gt;</code>
        </HeaderBrand>
        <Navigation dark-variant="text" class="hidden md:flex">
          <NavigationItem v-for="item in siteInfo?.navigation ?? []" :key="item.to" :to="item.to">
            {{ item.name }}
          </NavigationItem>
        </Navigation>
        <HeaderHamburger :is-open="isOpen" class="md:hidden" @toggle="toggle" />
      </div>
    </Header>
    <div class="flex-1 flex justify-center py-12">
      <div :class="cn('container grid grid-cols-1 gap-8 items-start px-8', hasAside && 'md:grid-cols-12')">
        <slot />
      </div>
    </div>
    <CtaBar class="text-center flex gap-4">
      <UiText as="h3" color="white">Let's Work Together</UiText>
      <div class="m-4">
        <UiText color="white">I'm always open to new opportunities, freelance projects, and meaningful collaborations. Whether you have an idea or just want to connect, I'd love to hear from you.</UiText>
      </div>
      <UiButton as="a" :href="siteInfo?.resumeUrl ?? '#'" color="white" variant="outline" size="large">
        Download Résumé
      </UiButton>
      <SocialLinks :links="siteInfo?.socialLinks ?? []" class="justify-center mt-4" />
    </CtaBar>
    <Footer />
    <MobileNav />
    <ThemePicker class="fixed bottom-4 left-4 z-50" />
  </div>
</template>
