import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Capture the onBeforeRouteLeave callback
let routeLeaveCallback: ((_to: unknown, _from: unknown, next: () => void) => void) | null = null

// Mock vue-router's onBeforeRouteLeave (auto-imported by Nuxt)
vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
  return {
    ...actual,
    onBeforeRouteLeave: (cb: (_to: unknown, _from: unknown, next: () => void) => void) => {
      routeLeaveCallback = cb
    },
  }
})

import { usePageLeave } from './usePageLeave'

describe('usePageLeave', () => {
  beforeEach(() => {
    routeLeaveCallback = null
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('registers onBeforeRouteLeave callback', () => {
    usePageLeave()
    expect(routeLeaveCallback).not.toBeNull()
  })

  it('calls all playLeave functions in parallel', async () => {
    const order: string[] = []
    const fn1 = vi.fn(() => {
      order.push('fn1-start')
      return new Promise<void>(resolve => {
        setTimeout(() => { order.push('fn1-end'); resolve() }, 100)
      })
    })
    const fn2 = vi.fn(() => {
      order.push('fn2-start')
      return new Promise<void>(resolve => {
        setTimeout(() => { order.push('fn2-end'); resolve() }, 50)
      })
    })

    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)

    vi.useFakeTimers()
    usePageLeave(fn1, fn2)

    const next = vi.fn()
    routeLeaveCallback!({}, {}, next)

    // Both should have started immediately (parallel)
    expect(order).toEqual(['fn1-start', 'fn2-start'])

    await vi.advanceTimersByTimeAsync(50)
    expect(order).toContain('fn2-end')

    await vi.advanceTimersByTimeAsync(50)
    expect(order).toContain('fn1-end')

    expect(next).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('calls next() after all playLeave Promises resolve', async () => {
    const fn1 = vi.fn(() => new Promise<void>(resolve => setTimeout(resolve, 200)))
    const fn2 = vi.fn(() => new Promise<void>(resolve => setTimeout(resolve, 100)))

    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)

    vi.useFakeTimers()
    usePageLeave(fn1, fn2)

    const next = vi.fn()
    routeLeaveCallback!({}, {}, next)

    await vi.advanceTimersByTimeAsync(100)
    expect(next).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(100)
    expect(next).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('skips all animations and calls next() immediately when prefers-reduced-motion is set', () => {
    const fn1 = vi.fn(() => Promise.resolve())
    const fn2 = vi.fn(() => Promise.resolve())

    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList)

    usePageLeave(fn1, fn2)

    const next = vi.fn()
    routeLeaveCallback!({}, {}, next)

    expect(fn1).not.toHaveBeenCalled()
    expect(fn2).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledOnce()
  })

  it('calls next() when no playLeave functions are provided', async () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)

    usePageLeave()

    const next = vi.fn()
    routeLeaveCallback!({}, {}, next)

    // Promise.all([]) resolves immediately
    await Promise.resolve()
    expect(next).toHaveBeenCalledOnce()
  })
})
