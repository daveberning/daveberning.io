import { inject, onUnmounted, provide, ref, type InjectionKey, type Ref } from 'vue'

interface MobileNavContext {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const MOBILE_NAV_KEY: InjectionKey<MobileNavContext> = Symbol('mobileNav')

/**
 * Provider -- call once in the layout that owns the mobile nav.
 * Creates the reactive state and manages scroll lock, escape key, and resize listeners.
 */
export function provideMobileNav(): MobileNavContext {
  const isOpen = ref(false)
  let savedScrollY = 0
  let escapeHandler: ((e: KeyboardEvent) => void) | null = null
  let resizeHandler: (() => void) | null = null

  function lockScroll() {
    savedScrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.width = '100%'
  }

  function unlockScroll() {
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('width')
    window.scrollTo(0, savedScrollY)
  }

  function addListeners() {
    escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    resizeHandler = () => {
      if (window.innerWidth >= 768) close()
    }
    window.addEventListener('keydown', escapeHandler)
    window.addEventListener('resize', resizeHandler)
  }

  function removeListeners() {
    if (escapeHandler) {
      window.removeEventListener('keydown', escapeHandler)
      escapeHandler = null
    }
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
      resizeHandler = null
    }
  }

  function open() {
    if (isOpen.value) return
    isOpen.value = true
    lockScroll()
    addListeners()
  }

  function close() {
    if (!isOpen.value) return
    isOpen.value = false
    unlockScroll()
    removeListeners()
  }

  function toggle() {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  onUnmounted(() => {
    if (isOpen.value) {
      unlockScroll()
      removeListeners()
    }
  })

  const context: MobileNavContext = { isOpen, open, close, toggle }
  provide(MOBILE_NAV_KEY, context)
  return context
}

/**
 * Consumer -- call in any child component to access the mobile nav state.
 */
export function useMobileNav(): MobileNavContext {
  const context = inject(MOBILE_NAV_KEY)
  if (!context) throw new Error('[useMobileNav] Missing provider — call provideMobileNav() in a parent component.')
  return context
}
