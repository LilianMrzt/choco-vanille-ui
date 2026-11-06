import { memo, type FC } from 'react'

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { COLLAPSIBLE_TRIGGER_STYLES } from '@components/surfaces/collapsible/components/collapsible-trigger/CollapsibleTrigger.css.ts'
import type { CollapsibleTriggerProps } from '@components/surfaces/collapsible/components/collapsible-trigger/types'
import { RotatingChevron } from '@components/_common/rotating-chevron'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

/**
 * Toggle trigger slot for `Collapsible` backed by Base UI Collapsible.Trigger.
 * Renders `label` with optional `startIcon`/`endIcon`, or custom `children`.
 * Always appends a rotating chevron to indicate the open/closed state.
 * Supply a label, named children or an ARIA name. Attributes and ref are
 * forwarded to the trigger.
 * @param props - Trigger options and forwarded attributes.
 * @param props.className - Additional class or state-dependent class function.
 * @param props.children - Custom trigger contents when no label is supplied.
 * @param props.label - Visible trigger text.
 * @param props.startIcon - Optional decorative leading icon.
 * @param props.endIcon - Optional decorative trailing icon.
 * @returns The trigger.
 * @example
 * <Collapsible.Trigger label="Details" />
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
        className={typeof className === 'function'
            ? (state) => cn(COLLAPSIBLE_TRIGGER_STYLES.root, className(state))
            : cn(COLLAPSIBLE_TRIGGER_STYLES.root, className)}
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
