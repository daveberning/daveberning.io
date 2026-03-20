<script setup lang="ts">
useHead({ title: 'Dave Berning' })

// TODO: replace with theme store once implemented
const theme = ref('teal')
const portrait = computed(() => `/portraits/dave-${theme.value}.png`)
</script>

<template>
  <main class="flex h-screen overflow-hidden bg-background dark:bg-theme-black">
    <UiPortrait :src="portrait" :alt="`Dave Berning — ${theme} theme`" />
    <div class="flex flex-1 items-center px-6 sm:px-10 lg:px-16">
      <div class="text-center">
        <UiText as="h1" class="text-[7vw] font-black leading-none">
          Dave Berning
        </UiText>
        <UiText as="h2" class="text-[1.75vw] font-light leading-tight mt-4">
          Software Engineer &amp; Instructor in Cincinnati, OH
        </UiText>
        <nav>
          <ul>
            <li><UiLink size="small">Test</UiLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
</template>
