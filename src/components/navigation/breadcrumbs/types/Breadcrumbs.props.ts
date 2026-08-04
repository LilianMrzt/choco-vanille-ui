import type * as React from 'react'
import type { RefAttributes } from 'react'

import type { LinkColor } from '@components/navigation/link'
import type { BreadcrumbsItemProps } from '@components/navigation/breadcrumbs/components/breadcrumbs-item/types/BreadcrumbsItem.props.ts'
import type { BreadcrumbsSeparator } from '@components/navigation/breadcrumbs/types/Breadcrumbs.types.ts'

export type BreadcrumbsProps = Omit<
    React.HTMLAttributes<HTMLElement>,
    'aria-label' | 'children'
> &
    RefAttributes<HTMLElement> & {
        /** Accessible name for the breadcrumb navigation landmark. */
        'aria-label': string
        /** Ordered `Breadcrumbs.Item` elements. The last item is current by default. */
        children: React.ReactElement<BreadcrumbsItemProps> | React.ReactElement<BreadcrumbsItemProps>[]
        /** Theme color applied to breadcrumb links unless overridden by an item. */
        color?: LinkColor
        /** Visual separator between items. Defaults to `chevron`. */
        separator?: BreadcrumbsSeparator
    }
