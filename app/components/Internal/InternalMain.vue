<script setup lang="ts">
import { injectInternalContext, type InternalMainProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<InternalMainProps>()

const { hasAside } = injectInternalContext()
</script>

<template>
  <main :class="cn(hasAside ? 'md:col-span-2' : 'md:col-span-3', props.class)">
    <slot />
  </main>
</template>
