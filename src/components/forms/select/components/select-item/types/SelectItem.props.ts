import type * as RadixSelect from '@radix-ui/react-select'

/** Props for a styled select item. */
export type SelectItemProps = RadixSelect.SelectItemProps & {
    /** Visible label for the item. */
    label?: string
}
