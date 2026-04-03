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
  emit('submit', values)
})
</script>

<template>
  <form :name="props.name" :data-netlify="props.name ? 'true' : undefined" :class="props.class" @submit.prevent="onSubmit" @reset.prevent="resetForm()">
    <input v-if="props.name" type="hidden" name="form-name" :value="props.name">
    <slot />
  </form>
</template>
