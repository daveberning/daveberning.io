<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { formInputVariants, type FormInputProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<FormInputProps>()

const {
  isDark
} = useTheme()

const {
  value,
  errorMessage,
  handleChange,
  handleBlur
} = useField(() => props.name)

const mode      = computed(() => isDark.value ? 'dark' : 'light')
const state     = computed(() => errorMessage.value ? 'error' : 'default')
const inputId   = computed(() => `field-${props.name}`)
const messageId = computed(() => `field-${props.name}-message`)
</script>

<template>
  <input
    :id="inputId"
    :type="props.type ?? 'text'"
    :value="value as string"
    :placeholder="props.placeholder"
    :aria-describedby="messageId"
    :aria-invalid="state === 'error' || undefined"
    :class="cn(formInputVariants({ state, mode }), props.class)"
    @change="handleChange"
    @blur="handleBlur"
  >
</template>
