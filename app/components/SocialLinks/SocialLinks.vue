<script setup lang="ts">
import { defaultSocialLinks, type SocialLinksProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<SocialLinksProps>(), {
  links: () => defaultSocialLinks,
})
</script>

<template>
  <ul :class="cn('flex items-center gap-4 list-none', props.class)">
    <li v-for="link in props.links" :key="link.href">
      <a
        :href="link.href"
        :aria-label="link.label"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-9 h-9 rounded-full border border-white/40 text-white hover:border-white hover:bg-white/10 active:bg-white/20 transition-colors"
      >
        <Icon :name="link.icon" class="w-4 h-4" />
      </a>
    </li>
  </ul>
</template>
