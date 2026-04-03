import { type Ref } from 'vue'

export interface UseKeyboardNavigationOptions {
  orientation?: 'vertical' | 'horizontal'
  selector?: string
}

/**
 * Manages arrow-key navigation through a group of focusable elements (buttons, links, etc.).
 * Automatically wraps focus at boundaries (first ↔ last).
 *
 * Handles:
 * - Vertical (up/down) and horizontal (left/right) navigation
 * - Focus wrapping at boundaries
 * - Silently ignores events when no focusable elements exist
 *
 * @param containerRef A ref to the container element holding the focusable items
 * @param options Configuration (orientation, selector)
 * @returns An onKeyDown handler to attach to the container
 *
 * @example
 * const containerRef = ref<HTMLElement | null>(null)
 * const { onKeyDown } = useKeyboardNavigation(containerRef, { orientation: 'horizontal' })
 *
 * <div ref="containerRef" role="toolbar" @keydown="onKeyDown">
 *   <button>Option 1</button>
 *   <button>Option 2</button>
 * </div>
 */
export function useKeyboardNavigation(containerRef: Ref<HTMLElement | null>, options: UseKeyboardNavigationOptions = {}) {
  const { orientation = 'vertical', selector = 'button, a[href], [tabindex]:not([tabindex="-1"])' } = options

  function getFocusableElements(): HTMLElement[] {
    if (!containerRef.value) return []
    return Array.from(containerRef.value.querySelectorAll<HTMLElement>(selector))
  }

  function onKeyDown(event: KeyboardEvent) {
    const isVertical = orientation === 'vertical'
    const isPrev = (isVertical && event.key === 'ArrowUp') || (!isVertical && event.key === 'ArrowLeft')
    const isNext = (isVertical && event.key === 'ArrowDown') || (!isVertical && event.key === 'ArrowRight')

    if (!isPrev && !isNext) return

    event.preventDefault()
    const elements = getFocusableElements()
    const idx = elements.indexOf(event.target as HTMLElement)

    if (idx === -1) return

    const next = isPrev
      ? (idx - 1 + elements.length) % elements.length
      : (idx + 1) % elements.length

    elements[next]?.focus()
  }

  return { onKeyDown }
}
