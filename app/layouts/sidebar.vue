<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import Header, { HeaderBrand, HeaderHamburger } from '~/components/Header'
import Footer from '~/components/Footer'
import MobileNav from '~/components/MobileNav'
import { useTheme } from '~/composables/useTheme'
import { provideMobileNav } from '~/composables/useMobileNav'
import { cn } from '~/lib/utils'

const { data: siteInfo } = await useSiteInfo()
const headerRef = ref<ComponentPublicInstance | null>(null)

const {
  color,
  isDark
} = useTheme()

const {
  isOpen,
  open,
  toggle
} = provideMobileNav()

useSwipeGesture(headerRef, 'down', open)
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
      <div :class="cn('container grid grid-cols-1 gap-8 items-start px-8', $slots.aside && 'md:grid-cols-12')">
        <main :class="$slots.aside ? 'col-span-12 md:col-span-8 xl:col-span-9' : 'col-span-12'">
          <slot />
        </main>
        <UiCard v-if="$slots.aside" as="aside" :color="color" class="col-span-12 md:col-span-4 xl:col-span-3 sticky top-[105px]">
          <slot name="aside" />
        </UiCard>
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
  </div>
</template>
