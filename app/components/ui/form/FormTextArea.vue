<script setup lang="ts">
import { formTextAreaVariants, type FormTextAreaProps } from '.'
import { useThemeMode } from '~/composables/useThemeMode'
import { useFormField } from '~/composables/useFormField'
import { cn } from '~/lib/utils'

const props = defineProps<FormTextAreaProps>()

const mode = useThemeMode()
const { value, state, inputId, messageId, handleChange, handleBlur } = useFormField(props.name)
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
    @input="handleChange"
    @blur="handleBlur"
  />
</template>
