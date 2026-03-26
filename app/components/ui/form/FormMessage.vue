<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { formMessageVariants, type FormMessageProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<FormMessageProps>()

const { isDark } = useTheme()
const { errorMessage } = useField(() => props.name)

const mode      = computed(() => isDark.value ? 'dark' : 'light')
const state     = computed(() => errorMessage.value ? 'error' : 'default')
const messageId = computed(() => `field-${props.name}-message`)
</script>

<template>
  <span
    :id="messageId"
    role="alert"
    aria-live="polite"
    :class="cn(formMessageVariants({ state, mode }), props.class)"
  >
    {{ errorMessage ?? '' }}
  </span>
</template>
