<script setup lang="ts">
import { proseImgVariants, type ProseImgProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ProseImgProps>(), {
  alt: '',
  align: 'center',
})
</script>

<template>
  <figure :class="cn(proseImgVariants({ align: props.align }), props.class)">
    <img
      :src="props.src"
      :alt="props.caption && !props.alt ? '' : props.alt"
      :width="props.width"
      :height="props.height"
      class="rounded-lg border border-border w-full"
    />
    <figcaption v-if="props.caption" class="text-xs text-text-muted text-center mt-2 not-italic">
      {{ props.caption }}
    </figcaption>
  </figure>
</template>
