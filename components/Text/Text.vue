<script setup lang="ts">
import { computed } from "vue";
import { cn } from "~/utils/twMerge";
import { type TextProps, textVariants } from "./index";
import { useThemeStore } from "~/stores/theme";

const props = withDefaults(defineProps<TextProps>(), {
  as: "body",
  tag: 'p',
  color: 'primary',
});

const themeStore = useThemeStore()

const resolvedTag = computed(() => {
  if (props.tag) return props.tag;
  if (props.as === "body") return "p";
  return props.as;
});

const resolvedColor = computed(() => themeStore.mode === 'dark'
  ? 'white'
  : props.color
)
</script>

<template>
  <component :is="resolvedTag" :class="cn(textVariants({ as: props.as, color: resolvedColor }))">
    <slot />
  </component>
</template>
