<script setup lang="ts">
import { useLink } from "~/composables/useLink";
import { type LinkProps, linkVariants } from "./index";
import { cn } from '~/utils/twMerge'
import { useAttrs } from 'vue'

const props = withDefaults(defineProps<LinkProps>(), {
  type: "normal",
})

const attrs = useAttrs()

const {
  forwardedAttrs,
  hrefValue,
  useNuxtLink,
  resolvedColor,
} = useLink(props);
</script>

<template>
  <NuxtLink v-if="useNuxtLink" :to="to" v-bind="forwardedAttrs" :class="cn(linkVariants({ color: resolvedColor, type: props.type }), attrs.class as Parameters<typeof cn>[number])">
    <slot />
  </NuxtLink>
  <a v-else :href="hrefValue" v-bind="forwardedAttrs" :class="cn(linkVariants({ color: resolvedColor, type: props.type }), attrs.class as Parameters<typeof cn>[number])">
    <slot />
  </a>
</template>
