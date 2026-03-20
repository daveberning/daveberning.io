<script setup lang="ts">
import { type NavigationItemProps } from '.'
import { Link } from '~/components/ui/link'
import { cn } from '~/lib/utils'

const props = defineProps<NavigationItemProps>()
</script>

<template>
  <Link variant="outline" radius="full" :to="props.to" :class="cn(props.class)">
    <slot />
  </Link>
</template>
