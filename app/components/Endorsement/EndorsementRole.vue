<script setup lang="ts">
import { endorsementRoleVariants, type EndorsementRoleProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<EndorsementRoleProps>()
</script>

<template>
  <UiText :class="cn(endorsementRoleVariants(), props.class)">
    <slot />
  </UiText>
</template>
