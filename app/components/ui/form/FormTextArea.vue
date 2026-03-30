<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { formTextAreaVariants, type FormTextAreaProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<FormTextAreaProps>()

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
  <textarea
    :id="inputId"
    :value="value as string"
    :rows="props.rows"
    :placeholder="props.placeholder"
    :aria-describedby="messageId"
    :aria-invalid="state === 'error' || undefined"
    :class="cn(formTextAreaVariants({ state, mode }), props.class)"
    @change="handleChange"
    @blur="handleBlur"
  />
</template>
