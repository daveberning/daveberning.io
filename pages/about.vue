<script setup lang="ts">
import Text from '../components/Text'

definePageMeta({
  layout: 'internal',
  headerNav: true,
  headerNavLabel: "About",
  headerNavOrder: 3,
})
</script>

<template>
  <Text as="h1">About</Text>
  <Text class="mb-4">Hi, I'm Dave Berning, a web developer and author from Cincinnati. Yeah, the Queen City, where we smother spaghetti with chili and say things like "ope" and "I'm gonna squeeze right by ya." Anyway...</Text>
  <Text>I've been a front-end web developer for more than twelve years. In 2015, I graduated from the University of Cincinnati, where I learned to create interactive websites with HTML, CSS, and JavaScript. Currently, I build rich single-page web applications with Vue.js and TypeScript.</Text>
</template>
