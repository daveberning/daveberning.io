<script setup lang="ts">
import { computed } from 'vue'
import { textVariants, type TextProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextProps>(), { as: 'p' })
const attrs = useAttrs()

const { isDark } = useTheme()
const mode = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <component :is="props.as" :class="cn(textVariants({ as: props.as, mode }), attrs.class)">
    <slot />
  </component>
</template>
