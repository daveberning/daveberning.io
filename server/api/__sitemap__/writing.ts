import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, 'writing')
    .where('status', '=', 'published')
    .all()

  return posts.map(post => asSitemapUrl({
    loc: post.path,
    lastmod: post.updatedAt ?? post.publishedAt,
    changefreq: 'monthly',
  }))
})
