import * as RadixTooltip from '@radix-ui/react-tooltip'

import type { TooltipProps } from '@components/overlay/tooltip/types/Tooltip.props.ts'
import { TOOLTIP_STYLES } from '@components/overlay/tooltip/Tooltip.css.ts'
import { cn } from '@utils/cn.ts'
import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'

import type { FC } from 'react'

const Tooltip: FC<TooltipProps> = ({
    children,
    content,
    position,
    side: sideProp = 'top',
    align: alignProp = 'center',
    delayDuration = 300,
    disabled = false,
    className,
    open,
    onOpenChange,
}) => {
    if (disabled) {
        return <>{children}</>
    }

    const { side, align } = position
        ? parsePosition(position)
        : { side: sideProp, align: alignProp }

    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root
                delayDuration={delayDuration}
                open={open}
                onOpenChange={onOpenChange}
            >
                <RadixTooltip.Trigger asChild>
                    {children}
                </RadixTooltip.Trigger>

                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        side={side}
                        align={align}
                        className={cn(TOOLTIP_STYLES.content, className)}
                        sideOffset={6}
                    >
                        {content}
                        <RadixTooltip.Arrow className={TOOLTIP_STYLES.arrow} />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
