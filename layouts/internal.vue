<script setup lang="ts">
import Text from '~/components/ui/Text'
import Header, { HeaderNavigation } from '~/components/ui/Header'
import Link from '~/components/ui/Link'

const year = new Date().getFullYear()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header class="flex justify-between px-6 py-4">
      <Text color="white" class="font-black uppercase tracking-widest">Dave Berning</Text>
      <div class="flex items-center gap-4">
        <HeaderNavigation></HeaderNavigation>
        <Link to="/contact" color="cta" type="button">Contact</Link>
      </div>
    </Header>
    <main class="mx-auto w-full max-w-[1140px] px-6 py-12 flex-1">
      <slot />
    </main>
    <footer class="text-center p-4">
      <Text>&copy; {{ year }}. All Rights Reserved. <Link to="/site-info">Technical information.</Link></Text>
    </footer>
  </div>
</template>