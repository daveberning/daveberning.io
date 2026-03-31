<script setup lang="ts">
import { endorsementNameVariants, type EndorsementNameProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<EndorsementNameProps>()
</script>

<template>
  <p :class="cn(endorsementNameVariants(), props.class)">
    <slot />
  </p>
</template>
