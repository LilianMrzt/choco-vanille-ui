import * as RadixTooltip from '@radix-ui/react-tooltip'

import type { TooltipProps } from '@components/overlay/tooltip/types/Tooltip.props.ts'
import { TOOLTIP_STYLES } from '@components/overlay/tooltip/Tooltip.css.ts'
import { TooltipProviderContext } from '@components/overlay/tooltip/context/TooltipProvider.context.ts'
import { cn } from '@utils/cn.ts'
import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'

import { type FC, useContext } from 'react'

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
    const hasProvider = useContext(TooltipProviderContext)

    const { side, align } = position
        ? parsePosition(position)
        : { side: sideProp, align: alignProp }

    if (disabled) {
        return <>{children}</>
    }

    const root = (
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
    )

    // Prefer the shared provider (mounted by `ThemeProvider` or a consumer's
    // `TooltipProvider`) so timing — notably `skipDelayDuration` between
    // adjacent triggers — is shared. Fall back to a local provider so a
    // standalone `Tooltip` still works without any setup.
    return hasProvider ? root : <RadixTooltip.Provider>{root}</RadixTooltip.Provider>
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
