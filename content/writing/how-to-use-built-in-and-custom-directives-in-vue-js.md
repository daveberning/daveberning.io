---
title: "How To Use Built-In and Custom Directives in Vue.js"
description: "A practical guide to Vue.js directives — covering the essential built-ins like v-if, v-bind, v-model, and v-on, plus how to write your own custom directives for project-specific DOM manipulation."
publishedAt: "2021-08-12"
updatedAt: ""
featuredImage: "/writing/vuejs.jpeg"
tags: ["JavaScript", "Vue", "Web Development"]
readingTime: 5
category: "Tutorial"
externalUrl: "https://www.digitalocean.com/community/tutorials/how-to-use-built-in-and-custom-directives-in-vue-js"
platform: "DigitalOcean"
---

Directives are one of the defining features of Vue.js — special attributes that let you manipulate the DOM directly from your template without reaching for raw JavaScript. Vue sits at an interesting intersection here, borrowing the prop-driven model from React while leaning into the directive-heavy approach popularized by Angular.

The tutorial on DigitalOcean walks through the built-in directives you'll use in nearly every Vue project. **`v-if` and `v-show`** both handle conditional rendering, but in different ways — `v-if` removes the element from the DOM entirely when false, while `v-show` toggles its visibility with CSS. Knowing when to use each one has a real impact on performance.

**`v-bind`** makes attributes dynamic by connecting them to component data, while **`v-on`** wires up event listeners cleanly in the template. Together they cover most of what you'd otherwise handle with `querySelector` and `addEventListener`. **`v-model`** goes a step further, creating two-way binding between a form input and a data property so that changes in either direction stay in sync automatically. The article also covers **`v-html`** for cases where you need to render raw HTML content — along with a note on when to be careful with it.

Beyond the built-ins, the tutorial covers writing **custom directives** — reusable logic you define yourself and attach to any element. When you find yourself repeating the same DOM manipulation across multiple components, a custom directive is often the cleanest way to extract it.

By the end you have a solid mental model of how directives work under the hood and a practical toolkit for the ones you'll reach for most often.
