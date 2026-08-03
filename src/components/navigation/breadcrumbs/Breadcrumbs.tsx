import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { Link } from '@components/navigation/link'
import {
    BREADCRUMBS_SEPARATOR_SYMBOLS,
    BREADCRUMBS_SEPARATORS,
} from '@components/navigation/breadcrumbs/constants'
import { BREADCRUMBS_STYLES } from '@components/navigation/breadcrumbs/styles/Breadcrumbs.css.ts'
import type { BreadcrumbsProps } from '@components/navigation/breadcrumbs/types/Breadcrumbs.props.ts'

const Breadcrumbs: FC<BreadcrumbsProps> = memo(({
    'aria-label': ariaLabel,
    items,
    color,
    separator = BREADCRUMBS_SEPARATORS.chevron,
    className,
    ref,
    ...props
}) => (
    <nav
        ref={ref}
        aria-label={ariaLabel}
        className={className}
        {...props}
    >
        <ol className={BREADCRUMBS_STYLES.list}>
            {items.map((item, index) => {
                const hasExplicitCurrent = items.some(({ current }) => current)
                const isCurrent = hasExplicitCurrent
                    ? item.current === true
                    : index === items.length - 1
                const itemContent = isCurrent || !item.href ? (
                    <Typography
                        as={'span'}
                        variant={'span'}
                        fontSize={'md'}
                        className={isCurrent ? BREADCRUMBS_STYLES.current : undefined}
                        aria-current={isCurrent ? 'page' : undefined}
                    >
                        {item.label}
                    </Typography>
                ) : (
                    <Link
                        href={item.href}
                        label={item.label}
                        color={item.color ?? color}
                    />
                )

                return (
                    <li
                        key={`${item.label}-${index}`}
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
                        {itemContent}
                    </li>
                )
            })}
        </ol>
    </nav>
))

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
