import type { FC } from 'react'

import { STATUS_BADGE_STYLES } from '@components/data-display/status-badge/StatusBadge.css.ts'
import type { StatusBadgeProps } from '@components/data-display/status-badge/types'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'

/**
 * Adds a corner indicator to one element without changing its interactions.
 * Defaults to a primary, md dot in the top-right corner. Dots without a label
 * are decorative; named or numbered indicators expose a status region.
 * Numbers grow horizontally to keep their full value visible. Native props,
 * events and ref target the outer span; consumer style wins over layout props.
 *
 * @param props - Wrapped element, indicator content and native span attributes.
 * @param props.children - Single element displayed beneath the indicator.
 * @param props.color - Indicator color intent; defaults to `primary`.
 * @param props.position - Indicator corner; defaults to `top-right`.
 * @param props.size - Indicator size preset; defaults to `md`.
 * @param props.number - Optional numeric content; zero is displayed and long values grow horizontally.
 * @param props.label - Accessible status name; omitted numbered indicators use their numeric value.
 * @param props.className - Consumer class merged with the wrapper classes.
 * @param props.ref - Ref forwarded to the outer span, not the indicator.
 * @param props.display - Wrapper CSS display; defaults to `inline-block`.
 * @returns The wrapped content and its optional accessible status.
 * @example
 * <StatusBadge number={3} label="Unread messages"><Avatar initials="JD" /></StatusBadge>
 */
const StatusBadge: FC<StatusBadgeProps> =
    ({ children, color, position, size, number, label, className, ref, display = 'inline-block', ...props }) => (
        <Box
            as={'span'}
            display={display}
            position={'relative'}
            ref={ref}
            className={cn(STATUS_BADGE_STYLES.root, className)}
            {...props}
        >
            {children}
            <span
                aria-hidden={label !== undefined || number !== undefined ? undefined : true}
                aria-label={label ?? (number !== undefined ? String(number) : undefined)}
                className={STATUS_BADGE_STYLES.indicator({
                    color,
                    position,
                    size,
                    hasNumber: number !== undefined,
                })}
                role={label !== undefined || number !== undefined ? 'status' : undefined}
            >
                {number !== undefined ? (
                    <span className={STATUS_BADGE_STYLES.number}>{number}</span>
                ) : null}
            </span>
        </Box>
    )

StatusBadge.displayName = 'StatusBadge'

export default StatusBadge
