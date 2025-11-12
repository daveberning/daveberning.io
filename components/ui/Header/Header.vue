<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { mergeClass } from "~/utils/merge-class";
import { headerVariants, type HeaderProps } from ".";
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore()
const props = withDefaults(defineProps<HeaderProps>(), {
  tag: "header",
  theme: "primary",
});

const attrs = useAttrs();

const mergedClass = computed(() =>
  mergeClass(
    headerVariants({ theme: props.theme }),
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
  <component :is="props.tag" v-bind="forwardedAttrs" :class="mergedClass">
    <slot />
  </component>
</template>
