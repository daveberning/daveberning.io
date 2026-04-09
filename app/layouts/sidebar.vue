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
const { color, isDark } = useTheme()
const { isOpen, open, toggle } = provideMobileNav()
const route = useRoute()

useSwipeGesture(headerRef, 'down', open)
</script>

<template>
  <div :class="cn('flex min-h-screen flex-col', isDark ? 'bg-theme-black' : 'bg-background')">
    <Header ref="headerRef" :variant="color" class="site-header px-0 justify-center">
      <div class="container flex items-center justify-between px-8">
        <HeaderBrand>
          <code>&lt;name&gt;</code>{{ siteInfo?.firstName }}<code>&lt;/name&gt;</code>
        </HeaderBrand>
        <Navigation variant="text" color="white" class="hidden md:flex">
          <NavigationItem v-for="item in siteInfo?.navigation ?? []" :key="item.to" :to="item.to">
            {{ item.name }}
          </NavigationItem>
        </Navigation>
        <HeaderHamburger :is-open="isOpen" class="md:hidden" @toggle="toggle" />
      </div>
    </Header>
    <div class="site-layout-body flex-1 flex justify-center py-12">
      <div :class="cn('container grid grid-cols-1 gap-8 items-start px-8', $slots.aside && 'md:grid-cols-12')">
        <main :class="cn('site-layout-main', $slots.aside ? 'col-span-12 md:col-span-8 xl:col-span-9' : 'col-span-12')">
          <slot />
        </main>
        <UiCard v-if="$slots.aside" as="aside" :color="color" class="site-layout-aside col-span-12 md:col-span-4 xl:col-span-3 sticky top-[105px]">
          <slot name="aside" />
        </UiCard>
      </div>
    </div>
    <CtaBar class="site-cta text-center flex gap-4">
      <UiText as="h3" color="white" class="mb-4">Let's Work Together</UiText>
      <UiText color="white" class="leading-relaxed max-w-prose mx-auto mb-4">I'm always open to new opportunities, freelance projects, and meaningful collaborations. Whether you have an idea or just want to connect, I'd love to hear from you.</UiText>
      <div class="flex gap-4 justify-center flex-wrap">
        <UiButton v-if="route.name !== 'resume'" as="a" :href="siteInfo?.resumeUrl ?? '#'" color="white" variant="outline" size="large">
          View Resume
        </UiButton>
        <UiLink v-else to="/contact" color="white" variant="outline" size="large">
          Contact Me
        </UiLink>
      </div>
      <SocialLinks :links="siteInfo?.socialLinks ?? []" class="justify-center mt-4" />
    </CtaBar>
    <Footer class="site-footer" />
    <MobileNav class="site-mobile-nav" />
  </div>
</template>
