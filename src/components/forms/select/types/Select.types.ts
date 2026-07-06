import type { FC } from 'react'
import type { Select as BaseSelect } from '@base-ui/react/select'

import type { SelectContentProps } from '@components/forms/select/components/select-content/types/SelectContent.props.ts'
import type { SelectItemProps } from '@components/forms/select/components/select-item/types/SelectItem.props.ts'
import type { SelectTriggerProps } from '@components/forms/select/components/select-trigger/types/SelectTrigger.props.ts'

type SelectRoot = FC<BaseSelect.Root.Props<string>>

export type SelectCompound = SelectRoot & {
    Trigger: FC<SelectTriggerProps>
    Value: FC<BaseSelect.Value.Props>
    Icon: FC<BaseSelect.Icon.Props>
    Portal: FC<BaseSelect.Portal.Props>
    Content: FC<SelectContentProps>
    Viewport: FC<BaseSelect.List.Props>
    Group: FC<BaseSelect.Group.Props>
    Label: FC<BaseSelect.GroupLabel.Props>
    Item: FC<SelectItemProps>
    ItemText: FC<BaseSelect.ItemText.Props>
    ItemIndicator: FC<BaseSelect.ItemIndicator.Props>
    Separator: FC<BaseSelect.Separator.Props>
}
