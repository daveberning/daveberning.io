import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import ProseImgComponent from './ProseImg.vue'

/* Variants
--------------------------------------------------------------------- */
export const proseImgVariants = cva('my-6', {
  variants: {
    align: {
      center: 'block mx-auto max-w-2xl w-full',
      full:   'block w-full',
      left:   'block w-full sm:float-left sm:w-auto sm:mr-6 sm:mb-4 sm:max-w-sm',
      right:  'block w-full sm:float-right sm:w-auto sm:ml-6 sm:mb-4 sm:max-w-sm',
    },
  },
  defaultVariants: {
    align: 'center',
  },
})

/* Types
--------------------------------------------------------------------- */
export type ProseImgVariants = VariantProps<typeof proseImgVariants>

export interface ProseImgProps {
  src: string
  alt: string
  caption?: string
  align?: ProseImgVariants['align']
  width?: string | number
  height?: string | number
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  ProseImgComponent as default,
}
