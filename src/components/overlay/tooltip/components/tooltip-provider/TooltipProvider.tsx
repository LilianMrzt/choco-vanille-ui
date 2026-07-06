import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

import { TooltipProviderContext } from '@components/overlay/tooltip/context/TooltipProvider.context.ts'
import type { TooltipProviderProps } from '@components/overlay/tooltip/components/tooltip-provider/types/TooltipProvider.props.ts'

import type { FC } from 'react'

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
 */
const TooltipProvider: FC<TooltipProviderProps> = ({
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
)

TooltipProvider.displayName = 'TooltipProvider'

export default TooltipProvider
