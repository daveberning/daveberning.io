import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const portraitVariants = cva('object-contain flex-shrink-0', {
  variants: {
    size: {
      large: 'self-center lg:self-end xl:self-start h-[45dvh] w-auto lg:h-full lg:w-[35rem] lg:object-bottom xl:object-center xl:h-auto xl:w-[38rem] lg:ml-[2vw] xl:ml-[5vw] 2xl:ml-0',
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
