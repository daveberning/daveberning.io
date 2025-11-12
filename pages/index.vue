<template>
  <main class="flex flex-col min-h-screen w-full items-start justify-center max-w-[600px]">
    <Text as="h1" tag="h1">Dave Berning</Text>
    <Text as="body-lg" tag="h2">Software Engineer from Cincinnati, OH</Text>
    <Text as="body">I specialize in building composable and extensive applications and component libraries using Vue, TypeScript, Tailwind, and more. I teach web development as an Adjunct at the University of Cincinnati.</Text>
    <Portrait />
    <nav class="mt-4">
      <ul class="inline-flex gap-2">
        <li><Link to="/about" type="button">About</Link></li>
        <li><Link to="/work" type="button">Work</Link></li>
        <li><Link to="/writing" type="button">Writing</Link></li>
        <li><Link to="/contact" type="button">Contact</Link></li>
      </ul>
    </nav>
  </main>
</template>

<script setup lang="ts">
import Text from '~/components/ui/Text'
import Link from '~/components/ui/Link'
import Portrait from '~/components/Portrait.vue'

definePageMeta({
  layout: 'default',
})
</script>
