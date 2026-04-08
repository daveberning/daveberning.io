<script setup lang="ts">
import type { ProseImgProps } from '~/components/ui/prose-img'

defineProps<ProseImgProps>()
</script>

<template>
  <UiProseImg v-bind="$props" />
</template>
