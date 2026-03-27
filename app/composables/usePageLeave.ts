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
