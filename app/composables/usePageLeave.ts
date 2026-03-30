/**
 * Uses Vue Router's onBeforeRouteLeave to play leave animations before navigating away from the page.
 * @param playLeaves
 */
export function usePageLeave(...playLeaves: Array<() => Promise<void>>) {
  onBeforeRouteLeave(async (_to, _from, next) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      next()
      return
    }
    await Promise.all(playLeaves.map(fn => fn()))
    next()
  })
}
