<template>
  <component :is="tag" :style="styles">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useThemeStore } from '~/stores/theme'

export default defineComponent({
  name: 'ThemeText',
  props: {
    tag: {
      type: String,
      default: 'p',
    }
  },
  computed: {
    ...mapStores(useThemeStore),
    styles(): Record<string, string> {
      return {
        color: this.themeStore.theme?.text || '',
      }
    }
  }
})
</script>

<style scoped>

</style>