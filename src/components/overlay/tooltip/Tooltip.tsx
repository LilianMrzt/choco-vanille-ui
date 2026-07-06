import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

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
        <BaseTooltip.Root
            open={open}
            onOpenChange={(isOpen) => onOpenChange?.(isOpen)}
        >
            <BaseTooltip.Trigger
                delay={delayDuration}
                render={children}
            />

            <BaseTooltip.Portal>
                <BaseTooltip.Positioner
                    side={side}
                    align={align}
                    sideOffset={6}
                    className={'isolate'}
                >
                    <BaseTooltip.Popup className={cn(TOOLTIP_STYLES.content, className)}>
                        {content}
                    </BaseTooltip.Popup>
                </BaseTooltip.Positioner>
            </BaseTooltip.Portal>
        </BaseTooltip.Root>
    )

    // Prefer the shared provider (mounted by `ThemeProvider` or a consumer's
    // `TooltipProvider`) so timing — notably the skip-delay timeout between
    // adjacent triggers — is shared. Fall back to a local provider so a
    // standalone `Tooltip` still works without any setup.
    return hasProvider ? root : <BaseTooltip.Provider delay={delayDuration}>{root}</BaseTooltip.Provider>
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
