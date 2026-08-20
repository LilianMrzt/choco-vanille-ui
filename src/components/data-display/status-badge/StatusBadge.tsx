import { memo, type FC } from 'react'

import { STATUS_BADGE_STYLES } from '@components/data-display/status-badge/styles/StatusBadge.css.ts'
import type { StatusBadgeProps } from '@components/data-display/status-badge/types/StatusBadge.props.ts'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'

/**
 * Wraps one component and places a small colored indicator in one of its
 * corners. A numbered indicator is announced as its numeric value unless an
 * accessible `label` is given.
 */
const StatusBadge: FC<StatusBadgeProps> = memo(
    ({ children, color, position, size, number, label, className, ref, ...props }) => (
        <Box
            as={'span'}
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
    ),
)

StatusBadge.displayName = 'StatusBadge'

export default StatusBadge
