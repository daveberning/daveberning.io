---
title: "How To Generate a Vue.js Single Page App With the Vue CLI"
description: "A beginner-friendly walkthrough of scaffolding a Vue.js single-page application with the Vue CLI — covering project setup, the generated file structure, and building your first Single-File Components."
publishedAt: "2021-01-11"
updatedAt: "2026-03-20"
featuredImage: "https://www.digitalocean.com/api/static-content/v1/images?src=https%3A%2F%2Fcommunity-cdn-digitalocean-com.global.ssl.fastly.net%2FVWgNzkr4k1aKz7fmAiXjy3Xp&width=1920"
tags: ["JavaScript", "Vue", "Web Development"]
readingTime: 5
category: "Tutorial"
externalUrl: "https://www.digitalocean.com/community/tutorials/how-to-generate-a-vue-js-single-page-app-with-vue-create"
platform: "DigitalOcean"
---

Vue.js sits at an interesting spot in the JavaScript ecosystem — it borrows the prop-driven component model from React and the declarative templating approach from Angular, then packages both into a framework that's approachable enough for beginners and capable enough for production applications. Getting a project off the ground used to mean wiring up Webpack by hand; the Vue CLI makes it a single command.

This tutorial on DigitalOcean walks through using `vue create` to scaffold a new single-page application from scratch. The CLI prompts you through a set of configuration choices — whether to use Vue 2 or 3, which linter to include, whether to add a router or Vuex up front — and generates a fully configured project ready to run.

**The generated project structure** is worth spending time on. The CLI creates a `src/` directory with an `App.vue` root component, a `components/` folder for your own components, and a `main.js` entry point that mounts the app to the DOM. Understanding what each file does and why it's there sets you up to navigate any Vue project confidently, not just the one the CLI generated.

**Single-File Components** are the building block the entire structure is designed around. Each `.vue` file contains a `<template>` for markup, a `<script>` block for logic, and an optional `<style>` block for scoped CSS — everything a component needs in one place. The tutorial walks through creating and composing a few of them to demonstrate how a real application takes shape.

For anyone starting out with Vue, this is the right place to begin. Getting familiar with the CLI workflow and the SFC format early means the rest of the ecosystem — Vue Router, Vuex, the Composition API — all slots into a mental model you already have.
