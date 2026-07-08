import type { FC } from 'react'
import type { Select as BaseSelect } from '@base-ui/react/select'

import type { SelectContentProps } from '@components/forms/select/components/select-content/types/SelectContent.props.ts'
import type { SelectItemProps } from '@components/forms/select/components/select-item/types/SelectItem.props.ts'
import type { SelectTriggerProps } from '@components/forms/select/components/select-trigger/types/SelectTrigger.props.ts'

type SelectRoot = FC<BaseSelect.Root.Props<string>>

export type SelectCompound = SelectRoot & {
    Trigger: FC<SelectTriggerProps>
    Content: FC<SelectContentProps>
    List: FC<BaseSelect.List.Props>
    Group: FC<BaseSelect.Group.Props>
    Label: FC<BaseSelect.GroupLabel.Props>
    Item: FC<SelectItemProps>
    Separator: FC<BaseSelect.Separator.Props>
}
