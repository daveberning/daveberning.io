import type { RouteLocationRaw } from 'vue-router'

interface WritingPost {
  path: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  featuredImage?: string
  tags?: string[]
  readingTime?: number
  category?: string
  externalUrl?: string
  platform?: string
  status?: 'draft' | 'published'
}

interface FilterOption {
  value: string
  label: string
  count: number
}

interface FilterSection {
  key: keyof WritingFilters
  label: string
  options: FilterOption[]
}

export interface WritingFilters {
  topic: string[]
  year: string[]
  category: string[]
  source: string[]
}

const TOPIC_FILTER_LIMIT = 8

const normalizeQueryValues = (value: string | null | Array<string | null> | undefined) => {
  if (Array.isArray(value))
    return value.filter((entry): entry is string => Boolean(entry))

  return value ? [value] : []
}

export function useWritingFilters(posts: Ref<WritingPost[] | null | undefined>) {
  const route = useRoute()

  const allPosts = computed(() => posts.value ?? [])

  const topicOptions = computed<FilterOption[]>(() => {
    const counts = new Map<string, number>()

    for (const post of allPosts.value) {
      for (const tag of post.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }

    return [...counts.entries()]
      .sort((leftEntry, rightEntry) => {
        const [leftValue, leftCount] = leftEntry
        const [rightValue, rightCount] = rightEntry

        if (leftCount !== rightCount)
          return rightCount - leftCount

        return leftValue.localeCompare(rightValue)
      })
      .map(([value, count]) => ({ value, label: value, count }))
  })

  const yearOptions = computed<FilterOption[]>(() => {
    const counts = new Map<string, number>()

    for (const post of allPosts.value) {
      const year = new Date(post.publishedAt).getFullYear().toString()
      counts.set(year, (counts.get(year) ?? 0) + 1)
    }

    return [...counts.entries()]
      .sort(([left], [right]) => Number(right) - Number(left))
      .map(([value, count]) => ({ value, label: value, count }))
  })

  const categoryOptions = computed<FilterOption[]>(() => {
    const counts = new Map<string, number>()

    for (const post of allPosts.value) {
      if (!post.category)
        continue

      counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
    }

    return [...counts.entries()]
      .sort((leftEntry, rightEntry) => {
        const [leftValue, leftCount] = leftEntry
        const [rightValue, rightCount] = rightEntry

        if (leftCount !== rightCount)
          return rightCount - leftCount

        return leftValue.localeCompare(rightValue)
      })
      .map(([value, count]) => ({ value, label: value, count }))
  })

  const sourceOptions = computed<FilterOption[]>(() => {
    const counts = new Map<string, number>()

    for (const post of allPosts.value) {
      const source = post.platform?.trim() || 'Website'
      counts.set(source, (counts.get(source) ?? 0) + 1)
    }

    return [...counts.entries()]
      .sort(([left], [right]) => {
        if (left === 'Website')
          return -1
        if (right === 'Website')
          return 1
        return left.localeCompare(right)
      })
      .map(([value, count]) => ({ value, label: value, count }))
  })

  const filterSections = computed<FilterSection[]>(() => [
    {
      key: 'topic',
      label: 'Topic',
      options: topicOptions.value,
    },
    {
      key: 'year',
      label: 'Year',
      options: yearOptions.value,
    },
    {
      key: 'category',
      label: 'Category',
      options: categoryOptions.value,
    },
    {
      key: 'source',
      label: 'Source',
      options: sourceOptions.value,
    },
  ])

  const activeFilters = computed<WritingFilters>(() => ({
    topic: normalizeQueryValues(route.query.topic),
    year: normalizeQueryValues(route.query.year),
    category: normalizeQueryValues(route.query.category),
    source: normalizeQueryValues(route.query.source),
  }))

  const filteredPosts = computed(() => allPosts.value.filter((post) => {
    if (activeFilters.value.topic.length && !(post.tags ?? []).some(tag => activeFilters.value.topic.includes(tag)))
      return false

    if (activeFilters.value.year.length && !activeFilters.value.year.includes(new Date(post.publishedAt).getFullYear().toString()))
      return false

    if (activeFilters.value.category.length && (!post.category || !activeFilters.value.category.includes(post.category)))
      return false

    if (activeFilters.value.source.length) {
      const source = post.platform?.trim() || 'Website'
      if (!activeFilters.value.source.includes(source))
        return false
    }

    return true
  }))

  const resultsLabel = computed(() => {
    const filteredCount = filteredPosts.value.length
    const totalCount = allPosts.value.length

    if (filteredCount === totalCount)
      return `${totalCount} article${totalCount === 1 ? '' : 's'}`

    return `${filteredCount} of ${totalCount} article${totalCount === 1 ? '' : 's'}`
  })

  const activeFilterPills = computed(() => {
    const sectionsByKey = new Map(filterSections.value.map((section) => [section.key, section]))

    return (Object.entries(activeFilters.value) as Array<[keyof WritingFilters, string[]]>)
      .flatMap(([key, values]) =>
        values.map(value => ({
          key,
          value,
          label: `${sectionsByKey.get(key)?.label}: ${value}`,
        }))
      )
  })

  function getFilterLocation(key: keyof WritingFilters, value?: string): RouteLocationRaw {
    const query = { ...route.query }
    const currentValues = normalizeQueryValues(route.query[key])

    if (!value) {
      delete query[key]
    }
    else if (currentValues.includes(value)) {
      const nextValues = currentValues.filter(entry => entry !== value)
      if (nextValues.length)
        query[key] = nextValues
      else
        delete query[key]
    }
    else {
      query[key] = [...currentValues, value]
    }

    return {
      path: route.path,
      query,
    }
  }

  function clearSectionLocation(key: keyof WritingFilters): RouteLocationRaw {
    const query = { ...route.query }
    delete query[key]

    return {
      path: route.path,
      query,
    }
  }

  const clearFiltersLocation = computed<RouteLocationRaw>(() => ({ path: route.path }))

  const visibleTopicOptions = computed(() => topicOptions.value.slice(0, TOPIC_FILTER_LIMIT))
  const hiddenTopicOptions = computed(() => topicOptions.value.slice(TOPIC_FILTER_LIMIT))
  const hasHiddenTopics = computed(() => hiddenTopicOptions.value.length > 0)

  return {
    activeFilterPills,
    activeFilters,
    clearFiltersLocation,
    clearSectionLocation,
    filterSections,
    filteredPosts,
    getFilterLocation,
    hasHiddenTopics,
    hiddenTopicOptions,
    resultsLabel,
    visibleTopicOptions,
  }
}
