export default defineSitemapEventHandler(async () => {
  const posts = await queryCollection('writing')
    .where('status', '=', 'published')
    .all()

  return posts.map(post => asSitemapUrl({
    loc: post.path,
    lastmod: post.updatedAt ?? post.publishedAt,
    changefreq: 'monthly',
  }))
})
