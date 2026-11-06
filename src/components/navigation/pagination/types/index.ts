import type * as React from 'react'

export type PaginationProps = Readonly<Omit<
    React.HTMLAttributes<HTMLElement>,
    'children' | 'aria-label'
> & {
    /** Accessible name for the pagination navigation landmark. */
    'aria-label': string
    /** The currently selected page, starting at 1. */
    currentPage: number
    /** The total number of available pages. */
    totalPages: number
    /** Called when the user selects a different page. */
    onPageChange: (page: number) => void
    /** Number of pages shown on each side of the current page. Defaults to 1. */
    siblingCount?: number
    /** Number of pages always shown at each boundary. Defaults to 1. */
    boundaryCount?: number
    /** Accessible label for the previous-page icon button. */
    previousLabel: string
    /** Accessible label for the next-page icon button. */
    nextLabel: string
    /** Ref forwarded to the navigation landmark. */
    ref?: React.Ref<HTMLElement>
}>
