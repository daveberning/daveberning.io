<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { mergeClass } from "~/utils/merge-class";
import { type TextProps, textVariants } from ".";

const props = withDefaults(defineProps<TextProps>(), {
  as: "body",
  color: "default",
  tag: 'p'
});

const attrs = useAttrs();

const mergedClass = computed(() =>
  mergeClass(
    textVariants({ as: props.as, color: props.color }),
    attrs.class as Parameters<typeof mergeClass>[number]
  )
);
</script>

<template>
  <component :is="tag" :class="mergedClass">
    <slot />
  </component>
</template>
