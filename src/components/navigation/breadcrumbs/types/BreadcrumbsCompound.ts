import type { FC } from 'react'

import type BreadcrumbsItem from '@components/navigation/breadcrumbs/components/breadcrumbs-item/BreadcrumbsItem.tsx'
import type { BreadcrumbsProps } from '@components/navigation/breadcrumbs/types/Breadcrumbs.props.ts'

export type BreadcrumbsCompound = FC<BreadcrumbsProps> & {
    Item: typeof BreadcrumbsItem
}
