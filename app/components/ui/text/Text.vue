<script setup lang="ts">
import { computed } from 'vue'
import { textVariants, type TextAs, type TextVariants } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const {
  isDark
} = useTheme()

const props = defineProps({
  as:    { type: String, default: 'p' },
  color: { type: String, default: 'default' },
})

const mode = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <component :is="props.as" :class="cn(textVariants({ as: props.as as TextAs, color: props.color as TextVariants['color'], mode }), attrs.class)">
    <slot />
  </component>
</template>
