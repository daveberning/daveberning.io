import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import type { ThemeColor } from '~/composables/useTheme'
import { useCreateContext } from '~/composables/useCreateContext'

/* Context
--------------------------------------------------------------------- */
interface AsideContext {
  color: Ref<ThemeColor>
}

export const [
  injectAsideContext,
  provideAsideContext
] = useCreateContext<AsideContext>('Aside')

/* Variants
--------------------------------------------------------------------- */
export const asideVariants = cva('flex flex-col gap-4', {
  variants: {
    color: {
      teal:   '',
      red:    '',
      blue:   '',
      green:  '',
      purple: '',
    },
  },
  defaultVariants: {
    color: 'teal',
  },
})

/* Types
--------------------------------------------------------------------- */
export type AsideVariants = VariantProps<typeof asideVariants>

export interface AsideProps {
  color?: ThemeColor
  class?: string
}

export interface AsideTitleProps {
  class?: string
}

export interface AsideSubtitleProps {
  class?: string
}

export interface AsideSectionProps {
  class?: string
}

export interface AsideListProps {
  items: string[]
  class?: string
}

/* Components
--------------------------------------------------------------------- */
import Aside from './Aside.vue'
import AsideTitle from './AsideTitle.vue'
import AsideSubtitle from './AsideSubtitle.vue'
import AsideSection from './AsideSection.vue'
import AsideList from './AsideList.vue'

export {
  Aside as default,
  AsideTitle,
  AsideSubtitle,
  AsideSection,
  AsideList,
}
