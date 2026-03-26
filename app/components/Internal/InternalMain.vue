<script setup lang="ts">
import { injectInternalContext, type InternalMainProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<InternalMainProps>()

const { hasAside } = injectInternalContext()
</script>

<template>
  <main :class="cn(hasAside ? 'col-span-12 lg:col-span-8 xl:col-span-9' : 'md:col-span-12', props.class)">
    <slot />
  </main>
</template>
