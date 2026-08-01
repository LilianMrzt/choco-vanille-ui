import type * as React from 'react'
import type { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'

/**
 * Coordinates the pressed state of a set of `ToggleGroup.Item` components.
 *
 * By default, one item can be pressed at a time. Set `multiple` to `true` to
 * allow several values. Use `value` with `onValueChange` for controlled state,
 * or `defaultValue` for uncontrolled state.
 */
export type ToggleGroupProps<Value extends string = string> = Omit<
    BaseToggleGroup.Props<Value>,
    'className' | 'children' | 'orientation'
> & {
    /** Class applied to the group container. */
    className?: string
    /** Toggle items rendered by the group. */
    children?: React.ReactNode
    /** Arrow-key navigation direction. Defaults to `horizontal`. */
    orientation?: 'horizontal' | 'vertical'
    /** Ref forwarded to the group's `<div>` element. */
    ref?: React.Ref<HTMLDivElement>
}
