<script setup lang="ts">
import { formInputVariants, type FormInputProps } from '.'
import { useThemeMode } from '~/composables/useThemeMode'
import { useFormField } from '~/composables/useFormField'
import { cn } from '~/lib/utils'

const props = defineProps<FormInputProps>()

const mode = useThemeMode()
const { value, state, inputId, messageId, handleChange, handleBlur } = useFormField(props.name)
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
    @input="handleChange"
    @blur="handleBlur"
  >
</template>
