<script setup lang="ts">
import { endorsementAttributionVariants, type EndorsementAttributionProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<EndorsementAttributionProps>()
</script>

<template>
  <div :class="cn(endorsementAttributionVariants(), props.class)">
    <hr class="border-border" />
    <div class="flex items-center gap-4">
      <slot />
    </div>
  </div>
</template>
