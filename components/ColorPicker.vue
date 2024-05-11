<template>
  <ul>
    <li
      v-for="theme in themeStore.colors"
      :style="getStyles(theme)"
      :title="theme.name"
      :class="{ 'is-active': isActive(theme) }"
      @click="themeStore.currentTheme = theme.name"
    >
      {{ theme.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { useThemeStore } from '~/stores/theme.ts'
import { mapStores } from 'pinia'
import type { Theme } from '~/types/theme'

export default {
  name: 'ColorPicker',
  computed: {
    ...mapStores(useThemeStore),
  },
  methods: {
    isActive(theme: Theme): boolean {
      return theme.name === this.themeStore.theme?.name
    },
    getStyles(theme: Theme): Record<string, string> {
      return {
        background: theme.background,
        border: this.isActive(theme) ? `5px solid ${theme.dark}` : 'none',
      }
    },
  },
}
</script>

<style scoped>
ul {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  align-items: center;
}

li {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  font-size: 0;

  &:hover { cursor: pointer; }
}
</style>