import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { Link } from '@components/navigation/link'
import { BREADCRUMBS_STYLES } from '@components/navigation/breadcrumbs/styles/Breadcrumbs.css.ts'
import type { BreadcrumbsItemProps } from '@components/navigation/breadcrumbs/components/breadcrumbs-item/types/BreadcrumbsItem.props.ts'

/**
 * Single breadcrumb entry. Renders as a `Link` when `href` is provided and
 * the item is not current; otherwise renders as a static `<span>` with
 * `aria-current="page"`.
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
