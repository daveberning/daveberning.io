import type { VariantProps } from 'class-variance-authority'
import type { Ref } from 'vue'
import { cva } from 'class-variance-authority'
import { useCreateContext } from '~/composables/useCreateContext'
import PortfolioPiece from './PortfolioPiece.vue'
import PortfolioPieceHeader from './PortfolioPieceHeader.vue'
import PortfolioPieceBody from './PortfolioPieceBody.vue'
import PortfolioPieceTech from './PortfolioPieceTech.vue'
import PortfolioPieceTechItem from './PortfolioPieceTechItem.vue'
import PortfolioPieceFooter from './PortfolioPieceFooter.vue'

/* Context
--------------------------------------------------------------------- */
export interface PortfolioPieceContext {
  variant: Ref<PortfolioPieceVariants['variant']>
  color: Ref<PortfolioPieceVariants['color']>
}

export const [
  injectPortfolioPieceContext,
  providePortfolioPieceContext,
] = useCreateContext<PortfolioPieceContext>('PortfolioPiece')

/* Variants
--------------------------------------------------------------------- */
export const portfolioPieceVariants = cva(
  'rounded-2xl overflow-hidden border transition-colors flex flex-col',
  {
    variants: {
      variant: {
        solid: 'bg-surface border-border text-text',
        outline: 'bg-transparent border-2 border-border text-text',
      },
      color: {
        teal: 'border-brand-teal-dark dark:border-brand-teal',
        red: 'border-brand-red-dark dark:border-brand-red',
        blue: 'border-brand-blue-dark dark:border-brand-blue',
        green: 'border-brand-green-dark dark:border-brand-green',
        purple: 'border-brand-purple-dark dark:border-brand-purple',
      },
      accent: {
        none: '',
        top: 'border-t-4',
        left: 'border-l-4',
      },
    },
    compoundVariants: [
      { accent: 'top', color: 'teal', class: 'border-t-brand-teal dark:border-t-brand-teal-dark' },
      { accent: 'top', color: 'red', class: 'border-t-brand-red dark:border-t-brand-red-dark' },
      { accent: 'top', color: 'blue', class: 'border-t-brand-blue dark:border-t-brand-blue-dark' },
      { accent: 'top', color: 'green', class: 'border-t-brand-green dark:border-t-brand-green-dark' },
      { accent: 'top', color: 'purple', class: 'border-t-brand-purple dark:border-t-brand-purple-dark' },
      { accent: 'left', color: 'teal', class: 'border-l-brand-teal dark:border-l-brand-teal-dark' },
      { accent: 'left', color: 'red', class: 'border-l-brand-red dark:border-l-brand-red-dark' },
      { accent: 'left', color: 'blue', class: 'border-l-brand-blue dark:border-l-brand-blue-dark' },
      { accent: 'left', color: 'green', class: 'border-l-brand-green dark:border-l-brand-green-dark' },
      { accent: 'left', color: 'purple', class: 'border-l-brand-purple dark:border-l-brand-purple-dark' },
    ],
    defaultVariants: {
      variant: 'solid',
      accent: 'none',
    },
  },
)

export const portfolioPieceHeaderVariants = cva('px-6 pt-6 pb-4 flex flex-col gap-1')

export const portfolioPieceBodyVariants = cva('px-6 py-2 flex-1 text-sm leading-relaxed text-text')

export const portfolioPieceTechVariants = cva('px-6 py-2 flex flex-wrap gap-2 list-none')

export const portfolioPieceTechItemVariants = cva('text-xs px-2.5 py-0.5 rounded-full border border-border text-text-muted')

export const portfolioPieceFooterVariants = cva('px-6 pt-4 pb-6 flex items-center justify-between border-t border-border mt-auto')

/* Types
--------------------------------------------------------------------- */
export type PortfolioPieceVariants = VariantProps<typeof portfolioPieceVariants>

export interface PortfolioPieceProps {
  variant?: PortfolioPieceVariants['variant']
  color?: PortfolioPieceVariants['color']
  accent?: PortfolioPieceVariants['accent']
  class?: string
  as?: string
}

export interface PortfolioPieceHeaderProps {
  title: string
  role?: string
  class?: string
  as?: string
}

export interface PortfolioPieceBodyProps {
  class?: string
}

export interface PortfolioPieceTechProps {
  class?: string
}

export interface PortfolioPieceTechItemProps {
  class?: string
}

export interface PortfolioPieceFooterProps {
  year?: number
  url?: string
  class?: string
  as?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  PortfolioPiece as default,
  PortfolioPieceHeader,
  PortfolioPieceBody,
  PortfolioPieceTech,
  PortfolioPieceTechItem,
  PortfolioPieceFooter,
}
