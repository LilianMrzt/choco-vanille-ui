import { CHEVRON_RIGHT_ICON as ChevronRightIcon } from '@constants/icon-registry'
import {
    Children,
    isValidElement,
    memo,
    type ReactElement,
    type FC,
} from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import BreadcrumbsItem from '@components/navigation/breadcrumbs/components/breadcrumbs-item/BreadcrumbsItem.tsx'
import type { BreadcrumbsItemProps } from '@components/navigation/breadcrumbs/components/breadcrumbs-item/types'
import {
    BREADCRUMBS_SEPARATOR_SYMBOLS,
    BREADCRUMBS_SEPARATORS,
} from '@components/navigation/breadcrumbs/constants'
import { BREADCRUMBS_STYLES } from '@components/navigation/breadcrumbs/Breadcrumbs.css.ts'
import type { BreadcrumbsProps } from '@components/navigation/breadcrumbs/types'

/**
 * Breadcrumb trail rendered as a `<nav>` with an ordered list. Each child
 * `BreadcrumbsItem` is separated by the configured `separator` (chevron icon
 * or a text symbol). The last item (or the one with `current`) receives
 * `aria-current="page"`.
 *
 * Compound slot: `Breadcrumbs.Item`.
 * Native attributes and ref target the navigation landmark.
 * @param props - Navigation attributes and breadcrumb options.
 * @param props["aria-label"] - Accessible landmark name.
 * @param props.children - Ordered breadcrumb items.
 * @param props.color - Theme color for links.
 * @param props.separator - Decorative separator; defaults to `chevron`.
 * @param props.className - Additional navigation class.
 * @param props.ref - Ref to the navigation element.
 * @returns The breadcrumb landmark.
 * @example
 * <Breadcrumbs aria-label="Breadcrumb"><Breadcrumbs.Item label="Home" /></Breadcrumbs>
 */
const BreadcrumbsRoot: FC<BreadcrumbsProps> = memo(({
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
                                        icon={ChevronRightIcon}
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
})

BreadcrumbsRoot.displayName = 'Breadcrumbs'

/**
 * Breadcrumb navigation with a namespaced item slot.
 * @example
 * <Breadcrumbs aria-label="Breadcrumb"><Breadcrumbs.Item label="Home" /></Breadcrumbs>
 */
const Breadcrumbs = Object.assign(BreadcrumbsRoot, { Item: BreadcrumbsItem })

export default Breadcrumbs
