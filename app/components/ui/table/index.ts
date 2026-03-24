import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const tableVariants = cva(
  'w-full caption-bottom text-sm border-collapse',
)

export const tableHeaderVariants = cva(
  '[&_tr]:border-b [&_tr]:border-border',
)

export const tableBodyVariants = cva(
  '[&_tr:last-child]:border-0',
)

export const tableFooterVariants = cva(
  'border-t border-border font-medium',
)

export const tableRowVariants = cva(
  'border-b border-border transition-colors hover:bg-surface',
)

export const tableHeadVariants = cva(
  'h-10 px-4 text-left align-middle font-semibold text-text-muted',
)

export const tableCellVariants = cva(
  'px-4 py-3 align-middle',
)

export const tableCaptionVariants = cva(
  'mt-4 text-sm text-text-muted',
)

/* Types
--------------------------------------------------------------------- */
export interface TableProps {
  class?: string
  as?: string
}

export interface TableHeaderProps {
  class?: string
}

export interface TableBodyProps {
  class?: string
}

export interface TableFooterProps {
  class?: string
}

export interface TableRowProps {
  class?: string
}

export interface TableHeadProps {
  class?: string
  as?: string
}

export interface TableCellProps {
  class?: string
  as?: string
}

export interface TableCaptionProps {
  class?: string
}

/* Components
--------------------------------------------------------------------- */
import Table from './Table.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import TableRow from './TableRow.vue'
import TableHead from './TableHead.vue'
import TableCell from './TableCell.vue'
import TableCaption from './TableCaption.vue'

export {
  Table as default,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
