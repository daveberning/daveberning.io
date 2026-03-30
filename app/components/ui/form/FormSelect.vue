<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { formSelectVariants, type FormSelectProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<FormSelectProps>()

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
  <div class="relative">
    <select
      :id="inputId"
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
