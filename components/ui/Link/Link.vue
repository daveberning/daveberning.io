<script setup lang="ts">
import { useLink } from "~/composables/useLink";
import { type LinkProps } from ".";

const props = withDefaults(defineProps<LinkProps>(), {
  type: "normal",
});

const { forwardedAttrs, hrefValue, mergedClass, useNuxtLink } = useLink(props);
</script>

<template>
  <NuxtLink v-if="useNuxtLink" :to="to" v-bind="forwardedAttrs" :class="mergedClass">
    <slot />
  </NuxtLink>
  <a v-else :href="hrefValue" v-bind="forwardedAttrs" :class="mergedClass">
    <slot />
  </a>
</template>
