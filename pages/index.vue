<template>
  <main class="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-12 px-6 py-24 text-center">
    <div class="space-y-6">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Fresh Nuxt 4 + Tailwind 4</p>
      <h1 class="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
        Ready-to-build foundation for <span class="text-cyan-300">daveberning.io</span>
      </h1>
      <p class="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
        Nuxt 4 provides hybrid rendering, server APIs, and lightning-fast DX. Tailwind CSS v4 keeps styling close to the markup with a lean PostCSS pipeline.
      </p>
    </div>
    <div class="flex flex-col items-center gap-4 sm:flex-row">
      <NuxtLink to="https://nuxt.com" target="_blank" class="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 ring-1 ring-white/15 transition hover:bg-white/20">
        Nuxt Docs
      </NuxtLink>
      <NuxtLink to="https://tailwindcss.com" target="_blank" class="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/50 transition hover:bg-cyan-300">
        Tailwind Docs
      </NuxtLink>
    </div>
    <div class="grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left sm:grid-cols-2">
      <article class="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Nuxt goodies</p>
        <ul class="mt-3 space-y-1 text-sm text-slate-200">
          <li>Hybrid rendering via Nitrogen server</li>
          <li>Typed routes & composables pre-generated</li>
          <li>First-class Vite 5 + Vue 3.5 support</li>
        </ul>
      </article>
      <article class="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Tailwind v4 perks</p>
        <ul class="mt-3 space-y-1 text-sm text-slate-200">
          <li>Single <code>@import "tailwindcss"</code> entry file</li>
          <li>Opt-in design tokens with <code>@theme</code></li>
          <li>No config required until you need it</li>
        </ul>
      </article>
    </div>
  </main>
</template>
