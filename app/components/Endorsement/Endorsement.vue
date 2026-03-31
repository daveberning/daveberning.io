<script setup lang="ts">
import { toRef } from 'vue'
import { endorsementVariants, provideEndorsementContext, type EndorsementProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<EndorsementProps>(), {
  as: 'article',
})

provideEndorsementContext({
  name: toRef(props, 'name')
})

</script>

<template>
  <component :is="props.as" :class="cn(endorsementVariants(), props.class)">
    <slot />
  </component>
</template>
