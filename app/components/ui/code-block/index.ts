import { cva } from 'class-variance-authority'
import CodeBlock from './CodeBlock.vue'
import CodeBlockLabel from './CodeBlockLabel.vue'
import CodeBlockCopyButton from './CodeBlockCopyButton.vue'

/* Variants
--------------------------------------------------------------------- */
export const codeBlockVariants = cva('', {
  variants: {
    variant: {
      inline: 'bg-surface rounded-sm px-1.5 py-0.5 text-sm font-mono',
      block:  'rounded-lg bg-surface border border-border overflow-hidden my-4',
    },
    agent: {
      'none':                        '',
      'front-end-software-engineer': '',
      'qa-engineer':                 '',
      'seo-copywriter':              '',
      'ui-designer':                 '',
    },
  },
  compoundVariants: [
    /* Inline + agent: colored background on the <code> element */
    { variant: 'inline', agent: 'front-end-software-engineer', class: 'font-bold bg-cyan-400 text-white dark:bg-cyan-500' },
    { variant: 'inline', agent: 'qa-engineer',                 class: 'font-bold bg-green-500 text-white dark:bg-green-600' },
    { variant: 'inline', agent: 'seo-copywriter',              class: 'font-bold bg-pink-400 text-white dark:bg-pink-500' },
    { variant: 'inline', agent: 'ui-designer',                 class: 'font-bold bg-amber-500 text-white dark:bg-amber-600' },
  ],
  defaultVariants: {
    variant: 'inline',
    agent:   'none',
  },
})

export const codeBlockLabelVariants = cva(
  'flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white border-b border-border',
  {
    variants: {
      agent: {
        'front-end-software-engineer': 'bg-cyan-400',
        'qa-engineer':                 'bg-green-500',
        'seo-copywriter':              'bg-pink-500',
        'ui-designer':                 'bg-amber-400',
      },
    },
  },
)

/* Types
--------------------------------------------------------------------- */
export type AgentSlug = 'none' | 'front-end-software-engineer' | 'qa-engineer' | 'seo-copywriter' | 'ui-designer'
export type CodeBlockVariant = 'inline' | 'block'

export const codeBlockBlockAgentBorderVariants = cva('', {
  variants: {
    agent: {
      'none':                        '',
      'front-end-software-engineer': 'border-3 border-cyan-400',
      'qa-engineer':                 'border-3 border-green-500',
      'seo-copywriter':              'border-3 border-pink-500',
      'ui-designer':                 'border-3 border-amber-400',
    },
  },
  defaultVariants: {
    agent: 'none',
  },
})

export interface CodeBlockProps {
  variant?: CodeBlockVariant
  language?: string
  agent?: AgentSlug
  code?: string
  class?: string
  preClass?: string | string[]
  preStyle?: string | Record<string, string>
}

export interface CodeBlockLabelProps {
  agent: AgentSlug
  class?: string
}

export interface CodeBlockCopyButtonProps {
  code: string
  class?: string
}

export const agentDisplayNames: Record<AgentSlug, string> = {
  'none':                        '',
  'front-end-software-engineer': 'Front-end Software Engineer',
  'qa-engineer':                 'QA Engineer',
  'seo-copywriter':              'SEO Copywriter',
  'ui-designer':                 'UI/UX Designer',
}

/* Components
--------------------------------------------------------------------- */
export {
  CodeBlock as default,
  CodeBlockLabel,
  CodeBlockCopyButton,
}
