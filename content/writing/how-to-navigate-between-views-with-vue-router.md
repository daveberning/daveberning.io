---
title: "How To Navigate Between Views with Vue Router"
description: "A practical introduction to Vue Router — adding client-side routing to a Vue.js application, defining routes, navigating between views, and generating routes dynamically."
publishedAt: "2021-03-22"
updatedAt: ""
featuredImage: "/writing/vuejs.jpeg"
tags: ["JavaScript", "Vue", "Web Development"]
readingTime: 5
category: "Tutorial"
externalUrl: "https://www.digitalocean.com/community/tutorials/how-to-navigate-between-views-with-vue-router"
platform: "DigitalOcean"
---

A single-page application loads one HTML document and renders everything inside it — pages, views, and components all appear and disappear without a full browser reload. Vue.js handles the rendering efficiently through its Virtual DOM, but moving between views still requires a routing layer. That's where Vue Router comes in.

This tutorial on DigitalOcean covers how to add Vue Router to a Vue.js project and wire it up so the application can navigate between multiple views. It's the first-party solution for client-side routing in Vue, and understanding it is a prerequisite for building almost any real-world app with more than one page.

**Setting up Vue Router** involves installing the library, registering it with your Vue application instance, and defining a routes array that maps URL paths to components. Each route entry is a plain object — a path string paired with the component that should render at that URL. Once registered, Vue Router takes over the browser's navigation and renders the right component without ever leaving the page.

**`<RouterView>` and `<RouterLink>`** are the two template primitives you'll use constantly. `<RouterView>` is a placeholder that renders whichever component matches the current route. `<RouterLink>` replaces standard anchor tags for internal navigation, generating the correct href while preventing full page reloads.

The tutorial also covers **dynamic routes** — paths with variable segments like `/airports/:code` — which let a single route definition handle any number of URLs based on data rather than hardcoded paths. This is the pattern behind most detail pages, profile pages, and anything else that displays one item from a larger collection.
