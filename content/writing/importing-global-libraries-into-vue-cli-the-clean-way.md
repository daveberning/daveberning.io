---
title: "Importing Global Libraries into Vue CLI (The Clean Way)"
description: "How to import global JavaScript and CSS libraries into a Vue CLI project the right way — using ES6 imports and Webpack aliases instead of brittle relative paths."
publishedAt: "2018-01-06"
updatedAt: ""
featuredImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MoHYZRrpQcOociJZTo83zg.png"
tags: ["JavaScript", "Vue", "Webpack", "Web Development"]
readingTime: 3
category: "Article"
externalUrl: "https://medium.com/front-end-weekly/importing-global-libraries-into-vue-cli-the-clean-way-9a7945213fa0"
platform: "Medium"
---

Every Vue CLI project eventually needs a third-party library available globally — a CSS framework, a utility library, or something that needs to be accessible across every component without repeated imports. The obvious approach is reaching for a relative path, but that creates brittle references that break the moment a file moves. There's a cleaner way.

This article on Medium walks through the technique using Bulma — a lightweight Flexbox CSS framework — as the example, but the pattern applies to any library you'd want to make globally available in a Vue CLI project.

**Webpack aliases** are the key. Rather than pointing at a file path directly, you define a short alias in `webpack.dev.conf.js` that maps a readable name to the actual location in `node_modules`. Once the alias is defined, you import it by name instead of by path — the reference is stable, legible, and completely decoupled from the physical location of the file on disk.

**Wiring it up globally** is the final step. Importing the alias in `src/main.js` makes it available throughout the entire application without needing to repeat the import in individual components. Install the dependency, configure the alias, import it once — that's the full setup.

It's a small pattern, but it's the kind of thing that separates a project that's easy to maintain from one that slowly accumulates cryptic relative paths and mysterious import failures.
