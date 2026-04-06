<script setup lang="ts">
import { codeBlockLabelVariants, agentDisplayNames, type CodeBlockLabelProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<CodeBlockLabelProps>()
</script>

<template>
  <p v-if="props.agent !== 'none'" :class="cn(codeBlockLabelVariants({ agent: props.agent }), props.class)">
    {{ agentDisplayNames[props.agent] }}
  </p>
</template>
