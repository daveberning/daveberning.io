<script setup lang="ts">
import { endorsementContentVariants, type EndorsementContentProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<EndorsementContentProps>()
</script>

<template>
  <div :class="cn(endorsementContentVariants(), props.class)">
    <span aria-hidden="true" class="text-7xl font-serif leading-none select-none text-theme">&ldquo;</span>
    <blockquote class="flex-1 text-base sm:text-lg leading-relaxed italic text-text">
      <slot />
    </blockquote>
  </div>
</template>
