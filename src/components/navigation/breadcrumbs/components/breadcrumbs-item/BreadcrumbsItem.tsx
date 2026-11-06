import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { Link } from '@components/navigation/link'
import { BREADCRUMBS_STYLES } from '@components/navigation/breadcrumbs/Breadcrumbs.css.ts'
import type { BreadcrumbsItemProps } from '@components/navigation/breadcrumbs/components/breadcrumbs-item/types'

/**
 * Single breadcrumb entry. Renders as a `Link` when `href` is provided and
 * the item is not current; otherwise renders as a static `<span>` with
 * `aria-current="page"`.
 * Link attributes are forwarded when the item renders as a link.
 * @param props - Item and link attributes.
 * @param props.label - Visible item text.
 * @param props.href - Link destination.
 * @param props.current - Whether this is the current item; defaults to `false`.
 * @param props.color - Link color token.
 * @returns The breadcrumb item.
 * @example
 * <Breadcrumbs.Item label="Products" href="/products" />
 */
const BreadcrumbsItem: FC<BreadcrumbsItemProps> = memo(({
    label,
    href,
    current = false,
    color,
    ...linkProps
}) => {
    if (current || !href) {
        return (
            <Typography
                as={'span'}
                variant={'span'}
                fontSize={16}
                className={current ? BREADCRUMBS_STYLES.current : undefined}
                aria-current={current ? 'page' : undefined}
            >
                {label}
            </Typography>
        )
    }

    return (
        <Link
            href={href}
            label={label}
            color={color}
            {...linkProps}
        />
    )
})

BreadcrumbsItem.displayName = 'Breadcrumbs.Item'

export default BreadcrumbsItem
