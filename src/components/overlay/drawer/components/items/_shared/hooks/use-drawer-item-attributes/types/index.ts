import type { IconSize } from '@components'

/**
 * Common drawer item state derived from the drawer context.
 */
export type DrawerItemAttributes = {
    /** Current animation state based on drawer open/close. */
    state: 'open' | 'closed'
    /** Raw open state from the drawer context. */
    open: boolean
    /** Icon size resolved from the row size or explicit override. */
    resolvedIconSize: IconSize
    /** Common data attributes applied to the row element. */
    itemAttributes: {
        'data-state': 'open' | 'closed'
        'data-mode': string
        'data-position': string
    }
}
