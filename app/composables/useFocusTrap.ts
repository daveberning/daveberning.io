import { type Ref, watch, onUnmounted } from 'vue'

export interface UseFocusTrapOptions {
  selector?: string // 'a[href], button, [tabindex]:not([tabindex="-1"])'
  autoFocus?: boolean
  restoreFocus?: boolean
}

/**
 * Traps keyboard focus within a container, preventing Tab/Shift+Tab from escaping.
 * Useful for modals, drawers, and other modal overlays.
 *
 * Handles:
 * - Tab wrapping (last element → first element)
 * - Shift+Tab wrapping (first element → last element)
 * - Automatic focus restoration when disabled
 * - Gracefully handles containers with no focusable elements
 *
 * @param isActive A ref that controls whether the trap is active
 * @param containerRef A ref to the container element to trap focus within
 * @param options Configuration (selector, autoFocus, restoreFocus)
 *
 * @example
 * const isOpen = ref(false)
 * const drawerRef = ref<HTMLElement | null>(null)
 * useFocusTrap(isOpen, drawerRef, { autoFocus: true })
 *
 * <div v-if="isOpen" ref="drawerRef">
 *   <!-- Focusable elements -->
 * </div>
 */
export function useFocusTrap(isActive: Ref<boolean>, containerRef: Ref<HTMLElement | null>, options: UseFocusTrapOptions = {}) {
  const { selector = 'a[href], button, [tabindex]:not([tabindex="-1"])', autoFocus = true, restoreFocus = true } = options

  let previouslyFocused: Element | null = null
  let handler: ((e: KeyboardEvent) => void) | null = null

  function getFocusableElements(): HTMLElement[] {
    return containerRef.value ?
      Array.from(containerRef.value.querySelectorAll<HTMLElement>(selector)) :
      []
  }

  function focusFirst() {
    const elements = getFocusableElements()
    elements[0]?.focus()
  }

  function handleTabKey(event: KeyboardEvent) {
    const elements = getFocusableElements()
    if (elements.length === 0) return

    const first = elements[0]!
    const last = elements[elements.length - 1]!

    if (event.shiftKey) {
      // Shift+Tab: move backward
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    } else {
      // Tab: move forward
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  function attach() {
    if (handler) return
    previouslyFocused = document.activeElement

    if (autoFocus) {
      focusFirst()
    }

    handler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        handleTabKey(e)
      }
    }

    containerRef.value?.addEventListener('keydown', handler)
  }

  function detach() {
    if (handler && containerRef.value) {
      containerRef.value.removeEventListener('keydown', handler)
      handler = null
    }

    if (restoreFocus && previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus()
    }
  }

  watch(isActive, (active) => {
    if (active) attach()
    else detach()
  })

  onUnmounted(() => {
    detach()
  })
}
