import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'
import InternalMain from './InternalMain.vue'
import InternalAside from './InternalAside.vue'

/* Context
--------------------------------------------------------------------- */
interface InternalContext {
  hasAside:    Ref<boolean>
  setHasAside: (v: boolean) => void
}

const [injectInternalContext, provideInternalContext] = useCreateContext<InternalContext>('Internal')

export { injectInternalContext, provideInternalContext }

/* Types
--------------------------------------------------------------------- */
export interface InternalMainProps {
  class?: string
}

export interface InternalAsideProps {
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export { InternalMain, InternalAside }
