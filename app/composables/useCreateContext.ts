import { inject, provide, type InjectionKey } from 'vue'

/**
 * Create a context with an inject and provide function, using a unique symbol as the key.
 * @param name
 */
export function useCreateContext<T>(name: string): [() => T, (context: T) => void] {
  const key: InjectionKey<T> = Symbol(name)

  function injectContext(): T {
    const ctx = inject(key)
    if (!ctx) throw new Error(`[${name}] Missing provider — call provide${name}Context() in a parent component.`)
    return ctx
  }

  function provideContext(context: T): void {
    provide(key, context)
  }

  return [injectContext, provideContext]
}
