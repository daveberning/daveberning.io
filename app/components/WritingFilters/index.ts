import type { RouteLocationRaw } from 'vue-router'
import WritingFilters from './WritingFilters.vue'

export interface WritingFiltersProps {
  activeFilters: {
    topic: string[]
    year: string[]
    category: string[]
    source: string[]
  }
  clearFiltersLocation: RouteLocationRaw
  clearSectionLocation: (key: 'topic' | 'year' | 'category' | 'source') => RouteLocationRaw
  filterSections: Array<{
    key: 'topic' | 'year' | 'category' | 'source'
    label: string
    options: Array<{
      value: string
      label: string
      count: number
    }>
  }>
  getFilterLocation: (key: 'topic' | 'year' | 'category' | 'source', value?: string) => RouteLocationRaw
  hasHiddenTopics: boolean
  hiddenTopicOptions: Array<{
    value: string
    label: string
    count: number
  }>
  resultsLabel: string
  visibleTopicOptions: Array<{
    value: string
    label: string
    count: number
  }>
}

export {
  WritingFilters as default,
  WritingFilters,
}
