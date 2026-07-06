import type { Select as BaseSelect } from '@base-ui/react/select'

/** Props for a styled select item. */
export type SelectItemProps = BaseSelect.Item.Props & {
    /** Visible label for the item. */
    label?: string
}
