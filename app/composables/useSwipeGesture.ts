import { onMounted, onUnmounted } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'

type MaybeElement = HTMLElement | ComponentPublicInstance | null

function resolveEl(ref: Ref<MaybeElement>): HTMLElement | null {
  const value = ref.value
  if (!value) return null
  if ('$el' in value) return value.$el as HTMLElement
  return value as HTMLElement
}

export function useSwipeGesture(
  elementRef: Ref<MaybeElement>,
  direction: 'up' | 'down',
  callback: () => void,
  options?: { threshold?: number },
) {
  const { threshold = 50 } = options ?? {}
  let startY = 0

  function onTouchStart(e: TouchEvent) {
    startY = e.touches[0]?.clientY ?? 0
  }

  function onTouchEnd(e: TouchEvent) {
    const endY = e.changedTouches[0]?.clientY ?? 0
    const delta = endY - startY
    if (direction === 'down' && delta >= threshold) callback()
    if (direction === 'up' && delta <= -threshold) callback()
  }

  onMounted(() => {
    const el = resolveEl(elementRef)
    if (!el) return
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    const el = resolveEl(elementRef)
    if (!el) return
    el.removeEventListener('touchstart', onTouchStart)
    el.removeEventListener('touchend', onTouchEnd)
  })
}
