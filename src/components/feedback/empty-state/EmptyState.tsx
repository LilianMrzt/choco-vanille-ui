import { vars } from '@theme/styles/contract/contract.css.ts'
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
        gap={8}
        className={cn(EMPTY_STATE_STYLES.root, className)}
        {...props}
    >
        <Flex
            flexDirection={'column'}
            gap={4}
            alignItems={'center'}
            className={EMPTY_STATE_STYLES.content}
        >
            <Typography
                as={'h2'}
                variant={'h2'}
                fontSize={20}
                fontWeight={'semibold'}
            >
                {title}
            </Typography>
            <Typography
                as={'p'}
                variant={'p'}
                fontSize={14}
                color={vars.color.text.secondary}
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
