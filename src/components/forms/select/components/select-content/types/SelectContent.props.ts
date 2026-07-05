import type * as RadixSelect from '@radix-ui/react-select'

/** Props for the styled content (listbox popup). */
export type SelectContentProps = RadixSelect.SelectContentProps & {
    /** Accessible name for the select listbox popup. */
    listboxAriaLabel?: string
}
