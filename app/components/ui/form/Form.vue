<script setup lang="ts">
import { useForm } from 'vee-validate'
import { type FormProps } from '.'

const props = defineProps<FormProps>()

const emit = defineEmits<{
  submit: [values: Record<string, unknown>]
}>()

const { handleSubmit, resetForm } = useForm({
  validationSchema: props.validationSchema,
})

const onSubmit = handleSubmit((values) => {
  // eslint-disable-next-line no-console
  console.log('[Form.vue] handleSubmit callback, values:', JSON.stringify(values))
  emit('submit', values)
})
</script>

<template>
  <form :class="props.class" @submit.prevent="onSubmit" @reset.prevent="resetForm()">
    <slot />
  </form>
</template>
