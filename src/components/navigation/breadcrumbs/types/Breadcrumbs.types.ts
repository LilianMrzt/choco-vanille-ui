import type { LinkColor } from '@components/navigation/link'
import type { BREADCRUMBS_SEPARATORS } from '@components/navigation/breadcrumbs/constants'

export type BreadcrumbsSeparator =
    (typeof BREADCRUMBS_SEPARATORS)[keyof typeof BREADCRUMBS_SEPARATORS]

export type BreadcrumbItem = {
    /** Visible label for the breadcrumb item. */
    label: string
    /** Destination URL. Omit this for the current item. */
    href?: string
    /** Marks this item as the current page. Defaults to the last item. */
    current?: boolean
    /** Theme color of this item's link. Overrides the Breadcrumbs color. */
    color?: LinkColor
}
