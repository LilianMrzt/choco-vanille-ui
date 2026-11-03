import { memo, type FC } from 'react'

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { COLLAPSIBLE_TRIGGER_STYLES } from '@components/surfaces/collapsible/components/collapsible-trigger/styles/CollapsibleTrigger.css.ts'
import type { CollapsibleTriggerProps } from '@components/surfaces/collapsible/components/collapsible-trigger/types/CollapsibleTrigger.props.ts'
import { RotatingChevron } from '@components/_common/rotating-chevron'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

/**
 * Toggle trigger slot for `Collapsible` backed by Base UI Collapsible.Trigger.
 * Renders `label` with optional `startIcon`/`endIcon`, or custom `children`.
 * Always appends a rotating chevron to indicate the open/closed state.
 */
const CollapsibleTrigger: FC<CollapsibleTriggerProps> = memo(({
    className,
    children,
    label,
    startIcon,
    endIcon,
    ...props
}) => (
    <BaseCollapsible.Trigger
        className={cn(COLLAPSIBLE_TRIGGER_STYLES.root, className)}
        {...props}
    >
        {label ? (
            <Flex
                as={'span'}
                alignItems={'center'}
                gap={8}
            >
                {startIcon && (
                    <Icon
                        icon={startIcon}
                        size={'sm'}
                    />
                )}
                <Typography
                    as={'span'}
                    variant={'span'}
                    fontSize={14}
                >
                    {label}
                </Typography>
                {endIcon && (
                    <Icon
                        icon={endIcon}
                        size={'sm'}
                    />
                )}
            </Flex>
        ) : (
            children
        )}
        <RotatingChevron size={'sm'} />
    </BaseCollapsible.Trigger>
))

CollapsibleTrigger.displayName = 'Collapsible.Trigger'

export default CollapsibleTrigger
