import BreakpointReporter from './BreakpointReporter.vue'

/* Types
--------------------------------------------------------------------- */
export interface BreakpointReporterProps {
  class?: string
  dev?: boolean
}

export type BreakpointLabel = 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | '2XL'

export interface Breakpoint {
  label: BreakpointLabel
  minWidth: number
}

export const breakpoints: Breakpoint[] = [
  { label: '2XL', minWidth: 1536 },
  { label: 'XL', minWidth: 1280 },
  { label: 'LG', minWidth: 1024 },
  { label: 'MD', minWidth: 768 },
  { label: 'SM', minWidth: 640 },
  { label: 'XS', minWidth: 0 },
]

export function getBreakpointLabel(width: number): BreakpointLabel {
  const match = breakpoints.find(bp => width >= bp.minWidth)
  return match ? match.label : 'XS'
}

/* Components
--------------------------------------------------------------------- */
export {
  BreakpointReporter as default,
}
