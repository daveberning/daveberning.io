<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Link, { linkVariants } from '~/components/Link'
import { cn } from '~/utils/twMerge'
import { injectHeaderContext, type HeaderNavigationRouteMeta, headerNavigationItemVariants } from './index'

const router = useRouter()
const { theme } = injectHeaderContext()

const navigationItems = computed(() => {
  return router
    .getRoutes()
    .filter((route) => (route.meta as HeaderNavigationRouteMeta)?.headerNav)
    .sort((a, b) => {
      const metaA = a.meta as HeaderNavigationRouteMeta;
      const metaB = b.meta as HeaderNavigationRouteMeta;
      return (metaA.headerNavOrder ?? 0) - (metaB.headerNavOrder ?? 0);
    })
    .map((route) => {
      const meta = route.meta as HeaderNavigationRouteMeta;
      const labelFromMeta =
        meta.headerNavLabel ??
        (typeof route.meta?.title === "string" ? route.meta.title : undefined);
      const label =
        labelFromMeta ??
        (typeof route.name === "string" ? route.name : route.path);

      return {
        label,
        to: meta.to ?? route.path,
        theme,
      }
    })
})
</script>

<template>
  <nav v-if="navigationItems.length">
    <ul class="flex flex-wrap items-center gap-2">
      <li v-for="item in navigationItems" :key="item.label + item.to">
        <Link :to="item.to" :class="cn(headerNavigationItemVariants({ theme }), linkVariants({ color: 'white', type: 'bare' }))">
          {{ item.label }}
        </Link>
      </li>
    </ul>
  </nav>
</template>
