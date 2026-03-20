import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const portraitVariants = cva(
  [
    'object-contain object-bottom flex-shrink-0 self-end',
    'h-[calc(100vh-1rem)] md:w-10rem w-auto',
    'ml-[clamp(1rem,9vw,9rem)]',
  ].join(' '), {
    variants: {
      size: {
        default: [],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

/* Types
--------------------------------------------------------------------- */
export type PortraitVariants = VariantProps<typeof portraitVariants>

export interface PortraitProps {
  src: string
  alt?: string
  size?: PortraitVariants['size']
  class?: string
}

/* Components
--------------------------------------------------------------------- */
import Portrait from './Portrait.vue'

export {
  Portrait as default,
  Portrait
}
