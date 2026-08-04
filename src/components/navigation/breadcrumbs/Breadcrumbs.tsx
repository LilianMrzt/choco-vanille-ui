import {
    Children,
    isValidElement,
    memo,
    type ReactElement,
} from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import BreadcrumbsItem from '@components/navigation/breadcrumbs/components/breadcrumbs-item/BreadcrumbsItem.tsx'
import type { BreadcrumbsItemProps } from '@components/navigation/breadcrumbs/components/breadcrumbs-item/types/BreadcrumbsItem.props.ts'
import {
    BREADCRUMBS_SEPARATOR_SYMBOLS,
    BREADCRUMBS_SEPARATORS,
} from '@components/navigation/breadcrumbs/constants'
import { BREADCRUMBS_STYLES } from '@components/navigation/breadcrumbs/styles/Breadcrumbs.css.ts'
import type { BreadcrumbsCompound } from '@components/navigation/breadcrumbs/types/BreadcrumbsCompound.ts'
import type { BreadcrumbsProps } from '@components/navigation/breadcrumbs/types/Breadcrumbs.props.ts'

const Breadcrumbs = memo(({
    'aria-label': ariaLabel,
    children,
    color,
    separator = BREADCRUMBS_SEPARATORS.chevron,
    className,
    ref,
    ...props
}: BreadcrumbsProps) => {
    const items = Children.toArray(children).filter(
        (child): child is ReactElement<BreadcrumbsItemProps> =>
            isValidElement<BreadcrumbsItemProps>(child),
    )
    const hasExplicitCurrent = items.some(({ props: item }) => item.current)

    return (
        <nav
            ref={ref}
            aria-label={ariaLabel}
            className={className}
            {...props}
        >
            <ol className={BREADCRUMBS_STYLES.list}>
                {items.map((item, index) => {
                    const isCurrent = hasExplicitCurrent
                        ? item.props.current === true
                        : index === items.length - 1

                    return (
                        <li
                            key={item.key}
                            className={BREADCRUMBS_STYLES.item}
                        >
                            {index > 0 &&
                                (separator === BREADCRUMBS_SEPARATORS.chevron ? (
                                    <Icon
                                        icon={'lucide:chevron-right'}
                                        size={'sm'}
                                        className={BREADCRUMBS_STYLES.separator}
                                    />
                                ) : (
                                    <Typography
                                        as={'span'}
                                        variant={'span'}
                                        className={BREADCRUMBS_STYLES.separatorText}
                                        aria-hidden={'true'}
                                    >
                                        {BREADCRUMBS_SEPARATOR_SYMBOLS[separator]}
                                    </Typography>
                                ))}
                            <BreadcrumbsItem
                                {...item.props}
                                current={isCurrent}
                                color={item.props.color ?? color}
                            />
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}) as unknown as BreadcrumbsCompound

Breadcrumbs.displayName = 'Breadcrumbs'
Breadcrumbs.Item = BreadcrumbsItem

export default Breadcrumbs
