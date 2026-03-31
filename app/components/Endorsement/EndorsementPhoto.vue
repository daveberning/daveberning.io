<script setup lang="ts">
import { ref } from 'vue'
import { endorsementPhotoVariants, injectEndorsementContext, type EndorsementPhotoProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<EndorsementPhotoProps>()

const { name } = injectEndorsementContext()
const imgError = ref(false)
const showImage = computed(() => !!props.src && !imgError.value)
</script>

<template>
  <div :class="cn(endorsementPhotoVariants(), props.class)">
    <img
      v-if="showImage"
      :src="props.src"
      :alt="`${name}'s photo`"
      class="size-full object-cover object-center"
      @error="imgError = true" />
    <span v-else aria-hidden="true" class="size-full flex items-center justify-center bg-theme text-theme-fg text-sm font-semibold uppercase">
      {{ name.charAt(0) }}
    </span>
  </div>
</template>
