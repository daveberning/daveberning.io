import { cva } from 'class-variance-authority'
import Resume from './Resume.vue'
import ResumeSection from './ResumeSection.vue'
import ResumeEntry from './ResumeEntry.vue'

/* Variants
--------------------------------------------------------------------- */
export const resumeVariants = cva(
  'w-full rounded-lg border border-border bg-background text-text print:max-w-none print:rounded-none print:border-0 print:bg-white print:text-zinc-950',
)

export const resumeSectionVariants = cva(
  'break-inside-avoid border-t border-border pt-6 first:border-t-0 first:pt-0 print:border-zinc-200/80',
)

export const resumeEntryVariants = cva(
  'break-inside-avoid pb-6 last:pb-0',
)

/* Types
--------------------------------------------------------------------- */
export interface ResumeProps {
  class?: string
  as?: string
}

export interface ResumeSectionProps {
  title: string
  class?: string
  as?: string
  contentClass?: string
}

export interface ResumeEntryProps {
  title: string
  organization: string
  period: string
  location?: string
  summary?: string
  class?: string
  as?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  Resume as default,
  ResumeSection,
  ResumeEntry,
}
