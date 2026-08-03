import type * as React from 'react'
import type { RefAttributes } from 'react'

import type { LinkColor } from '@components/navigation/link'
import type {
    BreadcrumbItem,
    BreadcrumbsSeparator,
} from '@components/navigation/breadcrumbs/types/Breadcrumbs.types.ts'

export type BreadcrumbsProps = Omit<
    React.HTMLAttributes<HTMLElement>,
    'children' | 'aria-label'
> &
    RefAttributes<HTMLElement> & {
        /** Accessible name for the breadcrumb navigation landmark. */
        'aria-label': string
        /** Ordered breadcrumb items. The last item is current by default. */
        items: BreadcrumbItem[]
        /** Theme color applied to breadcrumb links unless overridden by an item. */
        color?: LinkColor
        /** Visual separator between items. Defaults to `chevron`. */
        separator?: BreadcrumbsSeparator
    }
