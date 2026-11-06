import type { ToggleProps } from '@components/actions/toggle'
import type { ToggleGroupProps } from '@components/actions/toggle-group'

/** Story-only group controls, never forwarded to an item. */
export type ToggleStoryArgs = ToggleProps & {
    groupMultiple?: boolean
    groupOrientation?: 'horizontal' | 'vertical'
    groupDisabled?: boolean
    groupValue?: string[]
    groupOnValueChange?: ToggleGroupProps['onValueChange']
}
