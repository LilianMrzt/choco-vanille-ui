import type { FC } from 'react'

import type ToggleButtonGroupIconItem from '@components/actions/toggle-button-group/components/toggle-button-group-icon-item/ToggleButtonGroupIconItem.tsx'
import type ToggleButtonGroupItem from '@components/actions/toggle-button-group/components/toggle-button-group-item/ToggleButtonGroupItem.tsx'
import type { ToggleButtonGroupProps } from '@components/actions/toggle-button-group/types/ToggleButtonGroup.props.ts'

export type ToggleButtonGroupCompound = FC<ToggleButtonGroupProps> & {
    Item: typeof ToggleButtonGroupItem
    IconItem: typeof ToggleButtonGroupIconItem
}
