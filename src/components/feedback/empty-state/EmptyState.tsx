import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { EMPTY_STATE_STYLES } from '@components/feedback/empty-state/styles/EmptyState.css.ts'
import type { EmptyStateProps } from '@components/feedback/empty-state/types/EmptyState.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Centered placeholder for empty data states. Renders a heading `title`,
 * a descriptive paragraph, and an optional `action` slot for a call-to-action
 * button or link.
 */
const EmptyState: FC<EmptyStateProps> = memo(({
    title,
    description,
    action,
    className,
    ref,
    ...props
}) => (
    <Flex
        ref={ref}
        flexDirection={'column'}
        gap={'sm'}
        className={cn(EMPTY_STATE_STYLES.root, className)}
        {...props}
    >
        <Flex
            flexDirection={'column'}
            gap={'xs'}
            alignItems={'center'}
            className={EMPTY_STATE_STYLES.content}
        >
            <Typography
                as={'h2'}
                variant={'h2'}
                fontSize={'xl'}
                fontWeight={'semibold'}
            >
                {title}
            </Typography>
            <Typography
                as={'p'}
                variant={'p'}
                fontSize={'sm'}
                color={'textSecondary'}
            >
                {description}
            </Typography>
        </Flex>
        {action && (
            <div className={EMPTY_STATE_STYLES.action}>
                {action}
            </div>
        )}
    </Flex>
))

EmptyState.displayName = 'EmptyState'

export default EmptyState
