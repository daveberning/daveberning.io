import { computed, ref, type Ref } from 'vue'

export function useWritingFilter(posts: Ref<Array<{ category?: string | null | undefined, [key: string]: unknown }> | null>) {
  const selectedCategory = ref<string>('all')

  const categories = computed<string[]>(() => {
    const items = posts.value ?? []
    const unique = [...new Set(
      items
        .map(p => p.category)
        .filter((c): c is string => typeof c === 'string' && c.length > 0)
    )].sort()

    return ['all', ...unique]
  })

  const filteredPosts = computed(() => {
    const items = posts.value ?? []
    if (selectedCategory.value === 'all') return items
    return items.filter(p => p.category === selectedCategory.value)
  })

  function setCategory(cat: string) {
    selectedCategory.value = cat
  }

  return {
    selectedCategory,
    categories,
    filteredPosts,
    setCategory,
  }
}
