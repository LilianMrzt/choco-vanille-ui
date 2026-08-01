import type { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import type ToggleGroupItem from '@components/actions/toggle-group/components/toggle-group-item/ToggleGroupItem.tsx'

export type ToggleGroupCompound = (typeof BaseToggleGroup) & {
    displayName?: string
    Item: typeof ToggleGroupItem
}
