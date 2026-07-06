import { createContext } from 'react'

/**
 * Tracks whether a `TooltipProvider` is present in the tree.
 *
 * `Tooltip` reads this to decide whether it can rely on a shared
 * `RadixTooltip.Provider` (preferred — enables shared `skipDelayDuration`
 * timing) or must render its own local provider as a standalone fallback.
 */
export const TooltipProviderContext = createContext(false)
