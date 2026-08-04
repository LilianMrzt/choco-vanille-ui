import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { Link } from '@components/navigation/link'
import { BREADCRUMBS_STYLES } from '@components/navigation/breadcrumbs/styles/Breadcrumbs.css.ts'
import type { BreadcrumbsItemProps } from '@components/navigation/breadcrumbs/components/breadcrumbs-item/types/BreadcrumbsItem.props.ts'

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
                fontSize={'md'}
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
