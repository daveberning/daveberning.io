<script setup lang="ts">
import { formSelectVariants, type FormSelectProps } from '.'
import { useThemeMode } from '~/composables/useThemeMode'
import { useFormField } from '~/composables/useFormField'
import { cn } from '~/lib/utils'

const props = defineProps<FormSelectProps>()

const mode = useThemeMode()
const { value, state, inputId, messageId, handleChange, handleBlur } = useFormField(props.name)
</script>

<template>
  <div class="relative">
    <select
      :id="inputId"
      :name="props.name"
      :value="value as string"
      :aria-describedby="messageId"
      :aria-invalid="state === 'error' || undefined"
      :class="cn(formSelectVariants({ state, mode }), props.class)"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option v-if="props.placeholder" value="" disabled :selected="!value">
        {{ props.placeholder }}
      </option>
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <Icon name="heroicons:chevron-down" class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" aria-hidden="true" />
  </div>
</template>
