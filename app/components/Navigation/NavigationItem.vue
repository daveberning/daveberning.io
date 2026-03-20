<script setup lang="ts">
import { navigationItemVariants, type NavigationItemProps } from '.'
import { Link } from '~/components/ui/link'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<NavigationItemProps>(), { variant: 'solid' })
</script>

<template>
  <Link :variant="props.variant" radius="full" :to="props.to" :class="cn(navigationItemVariants({ variant: props.variant }), props.class)">
    <slot />
  </Link>
</template>
