import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'
import Endorsement from './Endorsement.vue'
import EndorsementContent from './EndorsementContent.vue'
import EndorsementAttribution from './EndorsementAttribution.vue'
import EndorsementPhoto from './EndorsementPhoto.vue'
import EndorsementName from './EndorsementName.vue'
import EndorsementRole from './EndorsementRole.vue'

/* Context
--------------------------------------------------------------------- */
interface EndorsementContext {
  name: Ref<string>
}

export const [
  injectEndorsementContext,
  provideEndorsementContext
] = useCreateContext<EndorsementContext>('Endorsement')

/* Variants
--------------------------------------------------------------------- */
export const endorsementVariants = cva(
  'rounded-2xl border border-border bg-surface flex flex-col gap-6 p-6 sm:p-8',
)

export const endorsementContentVariants = cva('flex flex-col gap-3')

export const endorsementAttributionVariants = cva('flex flex-col gap-4')

export const endorsementPhotoVariants = cva(
  'size-12 rounded-full shrink-0 ring-2 ring-border overflow-hidden flex items-center justify-center',
)

export const endorsementNameVariants = cva('text-sm font-semibold text-text')

export const endorsementRoleVariants = cva('text-xs text-text-muted')

/* Types
--------------------------------------------------------------------- */
export interface EndorsementProps {
  name:   string
  class?: string
  as?:    string
}

export interface EndorsementContentProps {
  class?: string
}

export interface EndorsementAttributionProps {
  class?: string
}

export interface EndorsementPhotoProps {
  src?:   string
  class?: string
}

export interface EndorsementNameProps {
  class?: string
}

export interface EndorsementRoleProps {
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  Endorsement as default,
  EndorsementContent,
  EndorsementAttribution,
  EndorsementPhoto,
  EndorsementName,
  EndorsementRole,
}
