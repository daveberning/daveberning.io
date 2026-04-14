<script setup lang="ts">
import type { WritingFilters } from '~/composables/useWritingFilters'
import type { RouteLocationRaw } from 'vue-router'

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

const props = defineProps<{
  activeFilters: WritingFilters
  clearFiltersLocation: RouteLocationRaw
  clearSectionLocation: (key: keyof WritingFilters) => RouteLocationRaw
  filterSections: FilterSection[]
  getFilterLocation: (key: keyof WritingFilters, value?: string) => RouteLocationRaw
  hasHiddenTopics: boolean
  hiddenTopicOptions: FilterOption[]
  resultsLabel: string
  visibleTopicOptions: FilterOption[]
}>()

const showAllTopics = ref(false)

const displayedSections = computed(() => props.filterSections.filter(section => section.key !== 'topic'))
const displayedTopicOptions = computed(() =>
  showAllTopics.value ? [...props.visibleTopicOptions, ...props.hiddenTopicOptions] : props.visibleTopicOptions
)

const basePillClass = 'inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
const optionPillClass = 'inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
const activePillClass = 'border-theme-light bg-theme-light text-theme-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),0_0_0_2px_rgba(255,255,255,0.12)] hover:bg-theme-light/90'
const inactivePillClass = 'border-theme-black/20 bg-theme-black/12 text-white hover:border-white/35 hover:bg-theme-black/18'
</script>

<template>
  <UiAside class="py-8">
    <UiAsideTitle>Filters</UiAsideTitle>

    <UiAsideSection>
      <UiAsideSubtitle>Results</UiAsideSubtitle>
      <UiText color="white">{{ resultsLabel }}</UiText>
    </UiAsideSection>

    <UiAsideSection>
      <div class="flex items-center justify-between gap-3">
        <UiAsideSubtitle>Topic</UiAsideSubtitle>
        <button
          v-if="hasHiddenTopics"
          type="button"
          class="text-xs font-medium text-white transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          @click="showAllTopics = !showAllTopics">
          {{ showAllTopics ? 'Show less' : `Show ${hiddenTopicOptions.length} more` }}
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          :to="clearSectionLocation('topic')"
          :class="[basePillClass, activeFilters.topic.length ? inactivePillClass : activePillClass]">
          All
        </NuxtLink>
        <NuxtLink
          v-for="option in displayedTopicOptions"
          :key="option.value"
          :to="getFilterLocation('topic', option.value)"
          :class="[optionPillClass, activeFilters.topic.includes(option.value) ? activePillClass : inactivePillClass]">
          <Icon
            v-if="activeFilters.topic.includes(option.value)"
            name="lucide:check"
            class="size-3.5 shrink-0" />
          <span class="truncate">{{ option.label }}</span>
          <span class="text-[0.7rem]">{{ option.count }}</span>
        </NuxtLink>
      </div>
    </UiAsideSection>

    <UiAsideSection
      v-for="section in displayedSections"
      :key="section.key">
      <UiAsideSubtitle>{{ section.label }}</UiAsideSubtitle>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          :to="clearSectionLocation(section.key)"
          :class="[basePillClass, activeFilters[section.key].length ? inactivePillClass : activePillClass]">
          All
        </NuxtLink>
        <NuxtLink
          v-for="option in section.options"
          :key="option.value"
          :to="getFilterLocation(section.key, option.value)"
          :class="[optionPillClass, activeFilters[section.key].includes(option.value) ? activePillClass : inactivePillClass]">
          <Icon
            v-if="activeFilters[section.key].includes(option.value)"
            name="lucide:check"
            class="size-3.5 shrink-0" />
          <span class="truncate">{{ option.label }}</span>
          <span class="text-[0.7rem]">{{ option.count }}</span>
        </NuxtLink>
      </div>
    </UiAsideSection>

    <UiAsideSection v-if="activeFilters.topic.length || activeFilters.year.length || activeFilters.category.length || activeFilters.source.length">
        <NuxtLink
        :to="clearFiltersLocation"
        class="inline-flex items-center justify-center rounded-full border border-theme-black/20 bg-theme-black/12 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/35 hover:bg-theme-black/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
        Clear all filters
      </NuxtLink>
    </UiAsideSection>
  </UiAside>
</template>
