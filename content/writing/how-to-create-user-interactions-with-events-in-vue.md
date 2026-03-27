---
title: "How To Create User Interactions with Events in Vue"
description: "A hands-on guide to handling user interactions in Vue.js — covering native DOM events with v-on, inline handlers, method handlers, and building custom events for child-to-parent communication."
publishedAt: "2021-05-28"
updatedAt: "2026-03-20"
featuredImage: "https://www.digitalocean.com/api/static-content/v1/images?src=https%3A%2F%2Fcommunity-cdn-digitalocean-com.global.ssl.fastly.net%2FVWgNzkr4k1aKz7fmAiXjy3Xp&width=1920"
tags: ["JavaScript", "Vue", "Web Development"]
readingTime: 5
category: "Tutorial"
externalUrl: "https://www.digitalocean.com/community/tutorials/how-to-create-user-interactions-with-events-in-vue"
platform: "DigitalOcean"
---

Every interactive feature in a web application starts with an event — a click, a keypress, a form submission. In vanilla JavaScript that means reaching for `addEventListener` on individual elements. Vue.js provides a cleaner alternative through the `v-on` directive, letting you attach event listeners directly in your template and keep interaction logic close to the markup it responds to.

This tutorial on DigitalOcean builds an airport code application where users browse a list of airports and add selections to a favorites collection. It's a practical scenario that naturally surfaces both types of events you'll encounter in real Vue projects: native DOM events and custom component events.

**Native events** are handled with `v-on` (or its `@` shorthand), which binds any standard DOM event — `click`, `input`, `keydown`, and so on — to a method or inline expression on the component. The tutorial covers both inline handlers for simple one-liners and method handlers for anything that needs more than a line of logic.

**Custom events** are how child components communicate back up to their parents. Rather than passing callbacks as props, Vue components emit named events with `$emit`, and the parent listens for them using the same `v-on` syntax. This keeps the data flow explicit and the component boundary clean. The airport app demonstrates this by having a card component emit a selection event that the parent uses to update the favorites list.

Together, native and custom events cover the full picture of user interaction in Vue — from responding to what the browser reports to coordinating communication between your own components.
