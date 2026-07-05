import type { FC } from 'react'
import type * as RadixSelect from '@radix-ui/react-select'

import type { SelectContentProps } from '@components/forms/select/components/select-content/types/SelectContent.props.ts'
import type { SelectItemProps } from '@components/forms/select/components/select-item/types/SelectItem.props.ts'
import type { SelectTriggerProps } from '@components/forms/select/components/select-trigger/types/SelectTrigger.props.ts'

type SelectRoot = FC<RadixSelect.SelectProps>

export type SelectCompound = SelectRoot & {
    Trigger: FC<SelectTriggerProps>
    Value: FC<RadixSelect.SelectValueProps>
    Icon: FC<RadixSelect.SelectIconProps>
    Portal: FC<RadixSelect.SelectPortalProps>
    Content: FC<SelectContentProps>
    Viewport: FC<RadixSelect.SelectViewportProps>
    Group: FC<RadixSelect.SelectGroupProps>
    Label: FC<RadixSelect.SelectLabelProps>
    Item: FC<SelectItemProps>
    ItemText: FC<RadixSelect.SelectItemTextProps>
    ItemIndicator: FC<RadixSelect.SelectItemIndicatorProps>
    Separator: FC<RadixSelect.SelectSeparatorProps>
}
