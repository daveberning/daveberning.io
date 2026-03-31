import { ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { useWritingFilter } from './useWritingFilter'

describe('useWritingFilter', () => {
  describe('categories', () => {
    it('returns ["all"] when posts is null', () => {
      const posts = ref(null)
      const { categories } = useWritingFilter(posts)
      expect(categories.value).toEqual(['all'])
    })

    it('returns ["all"] when posts is an empty array', () => {
      const posts = ref([])
      const { categories } = useWritingFilter(posts)
      expect(categories.value).toEqual(['all'])
    })

    it('derives unique sorted categories from posts, prepended with "all"', () => {
      const posts = ref([
        { category: 'Vue' },
        { category: 'TypeScript' },
        { category: 'Vue' },
        { category: 'Nuxt' },
      ])
      const { categories } = useWritingFilter(posts)
      expect(categories.value).toEqual(['all', 'Nuxt', 'TypeScript', 'Vue'])
    })

    it('excludes posts with null category', () => {
      const posts = ref([
        { category: 'Vue' },
        { category: null },
      ])
      const { categories } = useWritingFilter(posts)
      expect(categories.value).toEqual(['all', 'Vue'])
    })

    it('excludes posts with undefined category', () => {
      const posts = ref([
        { category: 'Vue' },
        { category: undefined },
      ])
      const { categories } = useWritingFilter(posts)
      expect(categories.value).toEqual(['all', 'Vue'])
    })

    it('excludes posts with empty string category', () => {
      const posts = ref([
        { category: 'Vue' },
        { category: '' },
      ])
      const { categories } = useWritingFilter(posts)
      expect(categories.value).toEqual(['all', 'Vue'])
    })
  })

  describe('filteredPosts', () => {
    it('returns all posts when selectedCategory is "all"', () => {
      const posts = ref([
        { category: 'Vue', title: 'Post A' },
        { category: 'Nuxt', title: 'Post B' },
      ])
      const { filteredPosts } = useWritingFilter(posts)
      expect(filteredPosts.value).toHaveLength(2)
    })

    it('returns all posts (including those without a category) when filter is "all"', () => {
      const posts = ref([
        { category: 'Vue', title: 'Post A' },
        { title: 'Post B' },
        { category: null, title: 'Post C' },
      ])
      const { filteredPosts } = useWritingFilter(posts)
      expect(filteredPosts.value).toHaveLength(3)
    })

    it('filters posts by the selected category', () => {
      const posts = ref([
        { category: 'Vue', title: 'Post A' },
        { category: 'Nuxt', title: 'Post B' },
        { category: 'Vue', title: 'Post C' },
      ])
      const { filteredPosts, setCategory } = useWritingFilter(posts)
      setCategory('Vue')
      expect(filteredPosts.value).toHaveLength(2)
      expect(filteredPosts.value.every(p => p.category === 'Vue')).toBe(true)
    })

    it('excludes posts without a category when a specific category filter is active', () => {
      const posts = ref([
        { category: 'Vue', title: 'Post A' },
        { title: 'Post B' },
        { category: null, title: 'Post C' },
      ])
      const { filteredPosts, setCategory } = useWritingFilter(posts)
      setCategory('Vue')
      expect(filteredPosts.value).toHaveLength(1)
      expect(filteredPosts.value[0]!.title).toBe('Post A')
    })

    it('returns an empty array when no posts match the selected category', () => {
      const posts = ref([
        { category: 'Vue', title: 'Post A' },
      ])
      const { filteredPosts, setCategory } = useWritingFilter(posts)
      setCategory('Nuxt')
      expect(filteredPosts.value).toHaveLength(0)
    })

    it('returns an empty array when posts is null and a category is selected', () => {
      const posts = ref(null)
      const { filteredPosts, setCategory } = useWritingFilter(posts)
      setCategory('Vue')
      expect(filteredPosts.value).toHaveLength(0)
    })
  })

  describe('setCategory', () => {
    it('updates selectedCategory', () => {
      const posts = ref([{ category: 'Vue' }])
      const { selectedCategory, setCategory } = useWritingFilter(posts)
      expect(selectedCategory.value).toBe('all')
      setCategory('Vue')
      expect(selectedCategory.value).toBe('Vue')
    })

    it('reactively updates filteredPosts when setCategory is called', () => {
      const posts = ref([
        { category: 'Vue', title: 'Post A' },
        { category: 'Nuxt', title: 'Post B' },
      ])
      const { filteredPosts, setCategory } = useWritingFilter(posts)

      expect(filteredPosts.value).toHaveLength(2)

      setCategory('Nuxt')
      expect(filteredPosts.value).toHaveLength(1)
      expect(filteredPosts.value[0]!.title).toBe('Post B')

      setCategory('all')
      expect(filteredPosts.value).toHaveLength(2)
    })
  })
})
