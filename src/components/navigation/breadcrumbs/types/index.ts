import type * as React from 'react'

import type { LinkColor } from '@components/navigation/link'
import type Breadcrumbs from '@components/navigation/breadcrumbs/Breadcrumbs.tsx'
import type { BreadcrumbsItemProps } from '@components/navigation/breadcrumbs/components/breadcrumbs-item/types'
import type { BREADCRUMBS_SEPARATORS } from '@components/navigation/breadcrumbs/constants'

/** Decorative separator variants. */
export type BreadcrumbsSeparator = (typeof BREADCRUMBS_SEPARATORS)[keyof typeof BREADCRUMBS_SEPARATORS]

/** Props for the breadcrumb navigation landmark. */
export type BreadcrumbsProps = Readonly<
    Omit<React.HTMLAttributes<HTMLElement>, 'aria-label' | 'children'> &
    React.RefAttributes<HTMLElement> & {
        /** Accessible landmark name. */
        'aria-label': string
        /** Ordered items; the last is current by default. */
        children: React.ReactElement<BreadcrumbsItemProps> | React.ReactElement<BreadcrumbsItemProps>[]
        /** Theme color for links unless overridden by an item. */
        color?: LinkColor
        /** Decorative separator; defaults to `chevron`. */
        separator?: BreadcrumbsSeparator
    }
>

/** Breadcrumb root and its item slot. */
export type BreadcrumbsCompound = typeof Breadcrumbs
