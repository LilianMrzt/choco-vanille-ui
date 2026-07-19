import { useCallback, useEffect, useState } from 'react'
import type { UseTooltipOptions, UseTooltipReturn } from '@components/overlay/tooltip/hooks/use-tooltip/types'

/**
 * Manages tooltip open state so that `BaseTooltip.Root` stays always controlled,
 * avoiding the controlled→uncontrolled transition bug in Base UI when `disabled` toggles.
 *
 * When `disabled` becomes true the internal state is reset, so the tooltip
 * never appears stale when `disabled` goes back to false.
 */
export const useTooltip = ({ disabled, open, onOpenChange }: UseTooltipOptions): UseTooltipReturn => {
    const [internalOpen, setInternalOpen] = useState(false)

    useEffect(() => {
        if (disabled) {setInternalOpen(false)}
    }, [disabled])

    const handleOpenChange = useCallback(
        (isOpen: boolean) => {
            setInternalOpen(isOpen)
            onOpenChange?.(isOpen)
        },
        [onOpenChange],
    )

    const effectiveOpen = disabled ? false : (open !== undefined ? open : internalOpen)

    return { effectiveOpen, handleOpenChange }
}
