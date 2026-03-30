<script setup lang="ts">
import { computed } from 'vue'
import { injectAsideContext, type AsideListProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<AsideListProps>()

const { color: _color } = injectAsideContext()

const formattedItems = computed(() => props.items.join(' · '))
</script>

<template>
  <UiText color="white" :class="cn(props.class)">
    {{ formattedItems }}
  </UiText>
</template>
