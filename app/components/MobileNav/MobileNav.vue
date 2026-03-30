<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { useMobileNav } from '~/composables/useMobileNav'
import { cn } from '~/lib/utils'

const { isOpen, close } = useMobileNav()
const { data: siteInfo } = await useSiteInfo()

const route = useRoute()

function isActive(item: { to: string }): boolean {
  return route.path === item.to || route.path.startsWith(item.to + '/')
}

function handleNavClick() {
  setTimeout(() => close(), 100)
}

let swipeStartY = 0
function onTouchStart(e: TouchEvent) {
  swipeStartY = e.touches[0]?.clientY ?? 0
}
function onTouchEnd(e: TouchEvent) {
  const endY = e.changedTouches[0]?.clientY ?? 0
  if (swipeStartY - endY >= 50) close()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key !== 'Tab') return

  const drawer = document.getElementById('mobile-nav-drawer')
  if (!drawer) return

  const focusable = Array.from(
    drawer.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
  )

  if (focusable.length === 0) return

  const first = focusable.at(0)
  const last = focusable.at(-1)

  if (!first || !last) return

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(isOpen, async (open) => {
  if (open) {
    await nextTick()
    const drawer = document.getElementById('mobile-nav-drawer')
    if (drawer) {
      const firstLink = drawer.querySelector<HTMLElement>('a[href]')
      firstLink?.focus()
    }
  }
})

defineExpose({ isOpen, close })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="motion-safe:transition-opacity motion-safe:duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="motion-safe:transition-opacity motion-safe:duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 top-14 z-[48]"
        aria-hidden="true"
        @click="close"
      />
    </Transition>

    <Transition
      enter-active-class="motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out"
      enter-from-class="motion-safe:-translate-y-full"
      enter-to-class="motion-safe:translate-y-0"
      leave-active-class="motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-in"
      leave-from-class="motion-safe:translate-y-0"
      leave-to-class="motion-safe:-translate-y-full"
    >
      <nav
        v-if="isOpen"
        id="mobile-nav-drawer"
        aria-label="Mobile navigation"
        :class="cn('fixed top-14 left-0 right-0 z-[49] bg-surface border-b border-border shadow-lg')"
        @keydown="handleKeydown"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <ul class="flex flex-col gap-1 px-4 py-4 list-none">
          <li v-for="item in siteInfo?.navigation ?? []" :key="item.to">
            <NuxtLink
              :to="item.to"
              :aria-current="isActive(item) ? 'page' : undefined"
              :class="cn(
                'flex items-center w-full py-3 px-4 rounded-lg text-base font-medium transition-colors',
                isActive(item)
                  ? 'bg-theme/15 text-theme font-semibold border-l-[3px] border-theme pl-[13px]'
                  : 'text-text hover:bg-surface-raised pl-4'
              )"
              @click="handleNavClick"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </Teleport>
</template>
