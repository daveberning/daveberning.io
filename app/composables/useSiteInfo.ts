/**
 * Fetches site information from the 'siteInfo' collection.
 */
export function useSiteInfo() {
  return useAsyncData('site-info', () => queryCollection('siteInfo').first())
}
