<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Card from '~/components/ui/card'
import { injectInternalContext, type InternalAsideProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<InternalAsideProps>()

const { setHasAside } = injectInternalContext()
const { color } = useTheme()

onMounted(() => setHasAside(true))
onUnmounted(() => setHasAside(false))
</script>

<template>
  <Card as="aside" :color="color" :class="cn('col-span-12 lg:col-span-4 xl:col-span-3', props.class)">
    <slot />
  </Card>
</template>
