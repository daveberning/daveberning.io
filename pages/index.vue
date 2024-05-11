<template>
  <div id="wrapper">
    <img :src="themeStore.portrait" :alt="portraitAltText" />
    <div id="content">
      <theme-text tag="h1">Dave Berning</theme-text>
      <theme-text>Front-End Software Engineer from Cincinnati, OH</theme-text>
      <nav>
        <ul>
          <li><router-link to="/about">About <span>Ctrl + A</span></router-link></li>
          <li><router-link to="/about">Work <span>Ctrl + W</span></router-link></li>
          <li><router-link to="/about">Contact <span>Ctrl + T</span></router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { mapStores } from 'pinia'

export default defineComponent({
  name: 'Home',
  computed: {
    ...mapStores(useThemeStore),
    portraitAltText(): string {
      return `Software engineer, Dave Berning in a ${this.themeStore.currentTheme} plaid shirt and grey shorts`
    }
  }
})
</script>

<style lang="postcss" scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}

#content {
  margin-right: 12rem;
  text-align: center;
}

h1 {
  font-size: 7rem;
  margin: 0;
}

p {
  font-weight: 300;
  font-size: 1.75rem;
  margin: 1rem 0 0 0;
}

img {
  position: fixed;
  width: 38rem;
  height: auto;
  left: 10rem;
  top: 1rem;
}

ul {
  display: flex;
  justify-content: center;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  margin-top: 2rem;
}

li {
  padding: 1rem 0;
}

li a {
  position: relative;
  text-decoration: none;
  color: v-bind(themeStore.theme.text);
  border: 2px solid v-bind(themeStore.theme.text);
  padding: .75rem 2rem 1.75rem 2rem;
  border-radius: 1000px;
  font-size: 1.25rem;
  background: rgba(255, 255, 255, .5)
}

li a span {
  font-size: .7rem;
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  margin-top: .25rem;
  font-style: italic;
  font-weight: 300;
}
</style>