export const useSiteInfo = () => {
  return useAsyncData('site-info', () => queryCollection('siteInfo').first())
}
