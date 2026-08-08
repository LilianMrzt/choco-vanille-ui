import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { memo, useContext, type FC } from 'react'

import type { TooltipProps } from '@components/overlay/tooltip/types/Tooltip.props.ts'
import { TOOLTIP_STYLES } from '@components/overlay/tooltip/styles/Tooltip.css.ts'
import { TooltipProviderContext } from '@components/overlay/tooltip/context/TooltipProvider.context.ts'
import { cn } from '@utils/cn.ts'
import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'
import { useTooltip } from '@components/overlay/tooltip/hooks/use-tooltip/useTooltip.hook.ts'

/**
 * Floating tooltip backed by Base UI Tooltip. Wraps a trigger child and
 * shows `content` in a portal positioner. Shares timing via a
 * `TooltipProvider` when available; otherwise falls back to a local
 * provider. Supports `position` shorthand or explicit `side`/`align`.
 * Set `disabled` to suppress the popup without removing the trigger.
 */
const Tooltip: FC<TooltipProps> = memo(({
    children,
    content,
    position,
    side: sideProp = 'top',
    align: alignProp = 'center',
    delayDuration = 0,
    disabled = false,
    openOnFocus = true,
    arrow = false,
    closeOnClick = true,
    className,
    open,
    defaultOpen,
    onOpenChange,
}) => {
    const hasProvider = useContext(TooltipProviderContext)

    const { side, align } = position
        ? parsePosition(position)
        : { side: sideProp, align: alignProp }

    const { effectiveOpen, handleOpenChange } = useTooltip({ disabled, open, defaultOpen, onOpenChange })
    const handleTooltipOpenChange = (
        isOpen: boolean,
        details: BaseTooltip.Root.ChangeEventDetails,
    ) => {
        if (!openOnFocus && details.reason === 'trigger-focus') {
            return
        }

        handleOpenChange(isOpen)
    }

    const root = (
        <BaseTooltip.Root
            open={effectiveOpen}
            onOpenChange={handleTooltipOpenChange}
        >
            <BaseTooltip.Trigger
                delay={delayDuration}
                closeOnClick={closeOnClick}
                render={children}
            />

            {!disabled && (
                <BaseTooltip.Portal>
                    <BaseTooltip.Positioner
                        side={side}
                        align={align}
                        sideOffset={arrow ? 11 : 6}
                        className={'isolate'}
                    >
                        <BaseTooltip.Popup
                            role={'tooltip'}
                            className={cn(TOOLTIP_STYLES.content, className)}
                        >
                            {arrow && <BaseTooltip.Arrow className={TOOLTIP_STYLES.arrow} />}
                            {content}
                        </BaseTooltip.Popup>
                    </BaseTooltip.Positioner>
                </BaseTooltip.Portal>
            )}
        </BaseTooltip.Root>
    )

    // Prefer the shared provider (mounted by `ThemeProvider` or a consumer's
    // `TooltipProvider`) so timing — notably the skip-delay timeout between
    // adjacent triggers — is shared. Fall back to a local provider so a
    // standalone `Tooltip` still works without any setup.
    return hasProvider ? root : <BaseTooltip.Provider delay={delayDuration}>{root}</BaseTooltip.Provider>
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
