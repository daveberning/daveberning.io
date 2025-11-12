<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { mergeClass } from "~/utils/merge-class";
import { linkVariants, type LinkProps } from ".";
import { useThemeStore } from "~/stores/theme";

const props = withDefaults(defineProps<LinkProps>(), {
  type: 'normal'
});

const attrs = useAttrs();
const themeStore = useThemeStore();

const isRouteObject = computed(
  () => typeof props.to === "object" && props.to !== null
);

const isExternalString = (value: string) => {
  if (value.startsWith("/") || value.startsWith(".") || value.startsWith("#")) {
    return false;
  }
  if (value.startsWith("//")) {
    return true;
  }
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
};

const isExternalLink = computed(() => {
  if (typeof props.to !== "string") {
    return false;
  }
  return isExternalString(props.to);
});

const useNuxtLink = computed(
  () => isRouteObject.value || (typeof props.to === "string" && !isExternalLink.value)
);

const mergedClass = computed(() =>
  mergeClass(
    linkVariants({ color: props.color ?? themeStore.active, type: props.type }),
    attrs.class as Parameters<typeof mergeClass>[number]
  )
);

const forwardedAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== "class")
  )
);

const hrefValue = computed(() =>
  typeof props.to === "string" ? props.to : "#"
);
</script>

<template>
  <NuxtLink v-if="useNuxtLink" :to="to" v-bind="forwardedAttrs" :class="mergedClass">
    <slot />
  </NuxtLink>
  <a
    v-else
    :href="hrefValue"
    v-bind="forwardedAttrs"
    :class="mergedClass"
    rel="noopener noreferrer"
    target="_blank"
  >
    <slot />
  </a>
</template>
