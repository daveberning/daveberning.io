---
title: "Creating Alias' For Package Imports in React"
description: "How to eliminate fragile relative import paths in React by configuring Webpack aliases — cleaner imports, more resilient code, and a pattern that works for both your src directory and node_modules packages."
publishedAt: "2017-12-29"
updatedAt: ""
tags: ["JavaScript", "React", "Webpack", "Web Development"]
readingTime: 3
category: "Article"
externalUrl: "https://medium.com/front-end-weekly/creating-alias-for-package-imports-in-react-99d455284029"
platform: "Medium"
---

Anyone who has worked on a deeply nested React component knows the pain of an import that looks like `'./../../../../../components/anotherComponent/AnotherComponent'`. It works — until you move a file, restructure a directory, or hand the project to someone else. Webpack aliases solve the problem by replacing those relative paths with clean, absolute ones that never break regardless of where a file lives.

Vue CLI ships with an `@` alias for the `src` directory out of the box, which inspired this article. React's create-react-app doesn't expose its Webpack config by default, so getting the same setup requires one extra step: running `npm run eject` to surface the configuration files.

**Adding the alias** means opening `config/webpack.config.dev.js`, finding the existing alias object, and adding a single entry: `'@': path.resolve('src')`. From that point on, any import starting with `@/` resolves from the project root rather than relative to the current file. The ugly path above becomes `'@/components/anotherComponent/AnotherComponent'` — readable, stable, and refactor-proof.

**The pattern extends to node_modules** as well. The article demonstrates aliasing a CSS library like Bulma to a short name, so instead of importing from a full `node_modules` path you write `import 'bulma'` and Webpack knows exactly where to look. The same technique applies to any package you want to reference by a custom name.

It's a small configuration change with an outsized impact on code quality — the kind of thing that makes a codebase noticeably easier to navigate as it grows.
