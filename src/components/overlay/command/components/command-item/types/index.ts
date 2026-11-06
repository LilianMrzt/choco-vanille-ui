/**
 * Props for `Command.Item`.
 *
 * `role` and `aria-selected` are managed internally and must not be overridden.
 */
export type CommandItemProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'role' | 'aria-selected' | 'onSelect'
> & {
    /**
     * Called when the item is activated by pointer click or Enter key.
     */
    onSelect?: () => void
    /**
     * Additional keywords to match against the search query.
     * When omitted, the item's text content (`children`) is used for filtering.
     */
    keywords?: string[]
    /**
     * Prevents the item from being selected.
     * @default false
     */
    disabled?: boolean
    /**
     * Iconify icon identifier rendered at the leading edge.
     */
    icon?: IconComponent
    /**
     * Keyboard shortcut hint rendered at the trailing edge.
     * Purely decorative — not a functional key binding.
     */
    shortcut?: string
}
import type { IconComponent } from '@components/foundation/icon'
