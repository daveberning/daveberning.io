<template>
  <main>
    <router-view />
    <color-picker />
  </main>
  <footer>
    <theme-text>Copyright &copy; {{ currentYear }}. Parsec Digital Media, LLC.</theme-text>
  </footer>
  <div class="gradient" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColorPicker from '~/components/ColorPicker.vue'
import { useThemeStore } from '#imports'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'App',
  components: {
    ColorPicker
  },
  computed: {
    ...mapStores(useThemeStore),
    currentYear(): number {
      return new Date().getFullYear()
    },
  },
  methods: {
    onMouseMove(event) {
      const gradient = document.querySelector('.gradient')

      if (gradient)
        gradient.style.backgroundImage = `radial-gradient(at ${event.clientX}px ${event.clientY}px, ${useThemeStore().theme.light} 0, transparent 70%)`;
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.onMouseMove)
  }
})
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  p {
    margin: 0;
    font-size: .75rem;
    font-weight: 300;
  }
}

.gradient {
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(at 100px 100px, v-bind(themeStore.theme.light) 0, transparent 70%);
}
</style>