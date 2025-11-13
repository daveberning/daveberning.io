<script setup lang="ts">
import Text from '~/components/ui/Text'
import Header, { HeaderNavigation } from '~/components/ui/Header'
import Link from '~/components/ui/Link'
import ThemePicker from '~/components/ThemePicker'
import { useThemeStore } from '~/stores/theme'

const year = new Date().getFullYear()
const themeStore = useThemeStore()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header :theme="themeStore.active" class="sticky top-0">
      <Link to="/" color="white" type="bare" class="font-black tracking-wide">Dave Berning</Link>
      <div class="flex items-center gap-4">
        <HeaderNavigation />
        <Link to="/contact" color="cta" type="button">Contact</Link>
      </div>
    </Header>
    <main class="mx-auto w-full max-w-[1350px] px-6 py-12 flex-1">
      <slot />
    </main>
    <footer class="text-center p-4">
      <Text>&copy; {{ year }}. All Rights Reserved. <Link to="/site-info">Technical information.</Link></Text>
    </footer>
    <ThemePicker />
  </div>
</template>
