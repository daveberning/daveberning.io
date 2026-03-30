---
title: "How To Use Chart.js with Vue.js"
description: "A practical guide to integrating Chart.js into a Vue.js application — setting up the library, wrapping charts in reusable Vue components, and rendering interactive HTML5 data visualizations."
publishedAt: "2018-01-28"
updatedAt: ""
tags: ["JavaScript", "Vue", "Web Development"]
readingTime: 5
category: "Tutorial"
externalUrl: "https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js"
platform: "DigitalOcean"
---

Chart.js is one of the most widely used JavaScript charting libraries — lightweight, well-documented, and capable of rendering a broad range of chart types on an HTML5 canvas. Pairing it with Vue.js is a natural fit: Vue handles the reactive data layer, Chart.js handles the visualization, and together they make it straightforward to build charts that update automatically when the underlying data changes.

This tutorial on DigitalOcean walks through integrating Chart.js into a Vue project from the ground up. The setup is deliberately minimal — no heavy wrapper libraries required — so the focus stays on understanding how the two tools interact rather than on navigating a third-party API.

**Wrapping charts in Vue components** is the key pattern the article establishes. Chart.js operates directly on a canvas element, so the component's job is to hold a `ref` to that canvas, initialize the Chart instance in `mounted()`, and feed it data from props. That structure keeps the chart logic encapsulated and makes the component reusable across any view that needs a visualization.

**Passing data reactively** is where Vue's strengths show up. Because Chart.js instances expose an `update()` method, you can watch for prop changes and push new datasets to an existing chart without destroying and recreating it. The result is smooth, in-place updates as data changes — exactly what you'd expect from a Vue component.

The tutorial covers enough ground to get a working chart into a Vue application quickly, with a component structure that's easy to extend to bar charts, pie charts, or any other type Chart.js supports.
