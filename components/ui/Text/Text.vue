<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { mergeClass } from "~/utils/merge-class";
import { type TextProps, textVariants } from ".";
import { useThemeStore } from "~/stores/theme";

const props = withDefaults(defineProps<TextProps>(), {
  as: "body",
  tag: 'p'
});

const themeStore = useThemeStore()
const attrs = useAttrs();

const resolvedTag = computed(() => {
  if (props.tag) return props.tag;
  if (props.as === "body") return "p";
  return props.as;
});

const mergedClass = computed(() =>
  mergeClass(
    textVariants({ as: props.as, color: props.color ?? themeStore.active }),
    attrs.class as Parameters<typeof mergeClass>[number]
  )
);

const forwardedAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== "class")
  )
);
</script>

<template>
  <component :is="resolvedTag" v-bind="forwardedAttrs" :class="mergedClass">
    <slot />
  </component>
</template>
