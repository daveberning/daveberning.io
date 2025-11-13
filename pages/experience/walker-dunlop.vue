<script setup lang="ts">
import Text from '~/components/ui/Text'

definePageMeta({
  layout: 'internal',
})

</script>

<template>
  <Text as="h1">Walker & Dunlop</Text>
  <Text as="h3" tag="h2">Experience</Text>
  <Text as="h3" tag="h2">Roles</Text>
  <ul>
    <Text tag="li">Design System</Text>
  </ul>
  <Text as="h3" tag="h2">Their Words...Not Mine</Text>
</template>

<style scoped>
img {
  filter: brightness(0) invert(1);
}
</style>