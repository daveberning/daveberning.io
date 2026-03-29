import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const portraitVariants = cva('object-contain flex-shrink-0', {
  variants: {
    size: {
        large: 'self-center lg:self-end xl:self-start mt-4 w-[80%] h-auto lg:h-full lg:w-auto xl:h-auto xl:w-[38rem] lg:ml-[2vw] xl:ml-[5vw]',
      small: 'w-full h-auto',
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

/* Types
--------------------------------------------------------------------- */
export type PortraitVariants = VariantProps<typeof portraitVariants>

export interface PortraitProps {
  size?: PortraitVariants['size']
  class?: string
}

/* Components
--------------------------------------------------------------------- */
import Portrait from './Portrait.vue'

export {
  Portrait as default,
}
