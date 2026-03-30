import { describe, expect, it, vi } from 'vitest'

const { state } = vi.hoisted(() => ({
  state: {
    injectReturnValue: undefined as unknown,
    provideSpy: vi.fn(),
  },
}))

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    inject: () => state.injectReturnValue,
    provide: state.provideSpy,
  }
})

import { useCreateContext } from './useCreateContext'

describe('useCreateContext', () => {
  it('throws when no provider is present', () => {
    state.injectReturnValue = undefined
    const [injectContext] = useCreateContext<{ value: string }>('Example')

    expect(() => injectContext()).toThrow('[Example] Missing provider')
  })

  it('returns the injected context and provides the context', () => {
    const context = { value: 'ready' }
    state.injectReturnValue = context

    const [injectContext, provideContext] = useCreateContext<typeof context>('Example')

    expect(injectContext()).toBe(context)

    provideContext(context)

    expect(state.provideSpy).toHaveBeenCalledWith(expect.any(Symbol), context)
  })
})
