import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { COLLAPSIBLE_TRIGGER_STYLES } from '@components/surfaces/collapsible/components/collapsible-trigger/styles/CollapsibleTrigger.css.ts'
import type { CollapsibleTriggerProps } from '@components/surfaces/collapsible/components/collapsible-trigger/types/CollapsibleTrigger.props.ts'
import { RotatingChevron } from '@components/_common/rotating-chevron'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

const CollapsibleTrigger = ({
    className,
    children,
    label,
    startIcon,
    endIcon,
    ...props
}: CollapsibleTriggerProps) => (
    <BaseCollapsible.Trigger
        className={cn(COLLAPSIBLE_TRIGGER_STYLES.root, className)}
        {...props}
    >
        {label ? (
            <Flex
                as={'span'}
                alignItems={'center'}
                gap={'sm'}
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
                    fontSize={'sm'}
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
)

CollapsibleTrigger.displayName = 'Collapsible.Trigger'

export default CollapsibleTrigger
