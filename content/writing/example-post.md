---
title: An Example Post
description: A short example showing markdown rendering with custom components.
date: 2026-03-20
---

# An Example Post

This is a paragraph rendered using the `UiText` component. It supports **bold**, *italic*, and [links to other pages](/work).

## Why custom prose components?

By mapping markdown elements to your own components, every heading and paragraph automatically inherits your design system — including dark mode, theme colors, and typography scale — without duplicating styles in markdown files.

### A smaller heading

You can nest headings at any level. Each one maps to the corresponding `UiText` variant (`h1` through `h6`).

## Writing more posts

Add any `.md` file under `content/` and query it by its path. The front matter `title` and `description` fields are available as structured data alongside the rendered body.
