/**
 * Props for `Command.Input`.
 *
 * ARIA attributes managed internally (`role`, `aria-expanded`,
 * `aria-controls`, `aria-activedescendant`) are omitted to prevent
 * accidental override of the combobox contract.
 */
export type CommandInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'role' | 'aria-expanded' | 'aria-controls' | 'aria-activedescendant' | 'type'
> & {
    /**
     * Placeholder text shown when the input is empty.
     * @default 'Search...'
     */
    placeholder?: string
    /**
     * Accessible label applied when `aria-label` is not provided explicitly.
     * Override for i18n.
     * @default 'Search'
     */
    defaultAriaLabel?: string
    /**
     * Accessible label for the clear button that appears when the input has a
     * value. Override for i18n.
     * @default 'Clear search'
     */
    defaultClearAriaLabel?: string
    /**
     * Called when the user activates the clear button to reset the search.
     */
    onClear?: () => void
}
