import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const portraitVariants = cva(
  [
    'object-contain flex-shrink-0 self-center lg:self-end xl:self-start mt-4',
    'h-[60%] lg:h-auto lg:w-[33rem] xl:w-[38rem]',
    'lg:ml-[5vw]',
  ], {
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
