import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { memo, type FC } from 'react'

import { TooltipProviderContext } from '@components/overlay/tooltip/context/TooltipProvider.context.ts'
import type { TooltipProviderProps } from '@components/overlay/tooltip/components/tooltip-provider/types'

/**
 * Shares tooltip timing across every descendant `Tooltip`.
 *
 * Mount it once near the root of your app so that moving between adjacent
 * triggers reuses the open state and skips the reopen delay (`timeout`) —
 * the behavior a single shared provider is designed for.
 *
 * `ThemeProvider` already renders one, so you only need this when rendering
 * tooltips outside of a `ThemeProvider`. A standalone `Tooltip` still works
 * without any provider (it falls back to its own).
 * @param props - Provider timing and children.
 * @param props.children - Subtree sharing tooltip timing.
 * @param props.delayDuration - Provider opening delay, defaulting to `300`.
 * @param props.skipDelayDuration - Skip-delay window, defaulting to `300`.
 * @returns The provider and its children.
 * @example
 * <TooltipProvider><App /></TooltipProvider>
 */
const TooltipProvider: FC<TooltipProviderProps> = memo(({
    children,
    delayDuration = 300,
    skipDelayDuration = 300,
}) => (
    <TooltipProviderContext.Provider value={true}>
        <BaseTooltip.Provider
            delay={delayDuration}
            timeout={skipDelayDuration}
        >
            {children}
        </BaseTooltip.Provider>
    </TooltipProviderContext.Provider>
))

TooltipProvider.displayName = 'TooltipProvider'

export default TooltipProvider
