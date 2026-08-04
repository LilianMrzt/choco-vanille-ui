import type { LinkProps } from '@components/navigation/link'

export type BreadcrumbsItemProps = LinkProps & {
    /** Marks this item as the current page. The last item is current by default. */
    current?: boolean
}
