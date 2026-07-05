import * as RadixSelect from '@radix-ui/react-select'

import {
    SelectContent,
    SelectGroup,
    SelectIcon,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from '@components/forms/select/components'
import type { SelectCompound } from '@components/forms/select/types/Select.types.ts'

// Re-export styles so consumers can target / extend them.
export { SELECT_TRIGGER_STYLES } from '@components/forms/select/components/select-trigger/SelectTrigger.css.ts'
export { SELECT_CONTENT_STYLES } from '@components/forms/select/components/select-content/SelectContent.css.ts'
export { SELECT_ITEM_STYLES } from '@components/forms/select/components/select-item/SelectItem.css.ts'
export { SELECT_LABEL_STYLES } from '@components/forms/select/components/select-label/SelectLabel.css.ts'
export { SELECT_SEPARATOR_STYLES } from '@components/forms/select/components/select-separator/SelectSeparator.css.ts'

/**
 * A styled select control built on top of `@radix-ui/react-select`.
 *
 * Exposes the full Radix Select API as compound subcomponents, all styled to
 * match the library's design tokens. The trigger looks and behaves like a
 * TextField, and the listbox popup follows the same visual language as the
 * DropdownMenu and Popover components.
 *
 * For a simpler, field-style API (label, helperText, error, options array),
 * use `SelectField`.
 *
 * @example
 * ```tsx
 * <Select value={value} onValueChange={setValue}>
 *   <Select.Trigger placeholder="Pick a fruit" />
 *   <Select.Content>
 *     <Select.Viewport>
 *       <Select.Item value="apple">Apple</Select.Item>
 *       <Select.Item value="banana">Banana</Select.Item>
 *     </Select.Viewport>
 *   </Select.Content>
 * </Select>
 * ```
 */
const Select = ((props) => <RadixSelect.Root {...props} />) as SelectCompound

Select.displayName = 'Select'

Select.Trigger = SelectTrigger
Select.Value = SelectValue
Select.Icon = SelectIcon
Select.Portal = SelectPortal
Select.Content = SelectContent
Select.Viewport = SelectViewport
Select.Group = SelectGroup
Select.Label = SelectLabel
Select.Item = SelectItem
Select.ItemText = SelectItemText
Select.ItemIndicator = SelectItemIndicator
Select.Separator = SelectSeparator

export default Select
