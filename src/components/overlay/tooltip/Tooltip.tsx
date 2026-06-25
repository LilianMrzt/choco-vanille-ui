import * as RadixTooltip from '@radix-ui/react-tooltip'

import type { TooltipProps } from '@components/overlay/tooltip/types/Tooltip.props.ts'
import { tooltipArrowClass, tooltipContentClass } from '@components/overlay/tooltip/Tooltip.css.ts'
import { cn } from '@utils/cn.ts'
import type {FC} from "react";

const Tooltip: FC<TooltipProps> = ({
    children,
    content,
    side = 'top',
    align = 'center',
    delayDuration = 300,
    disabled = false,
    className,
    open,
    onOpenChange,
}) => {
    if (disabled) {
        return <>{children}</>
    }

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
                        className={cn(tooltipContentClass, className)}
                        sideOffset={6}
                    >
                        {content}
                        <RadixTooltip.Arrow className={tooltipArrowClass} />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
