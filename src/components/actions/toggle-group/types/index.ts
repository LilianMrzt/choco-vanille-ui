import type * as React from 'react'
import type { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import type { ToggleProps } from '@components/actions/toggle/types'

/** A group item requires a unique value; its pressed state is managed by the group. */
export type ToggleGroupItemProps = ToggleProps & Readonly<{ value: string }>

/** Group selection, orientation and native container props. */
export type ToggleGroupProps<Value extends string = string> = Readonly<
    Omit<BaseToggleGroup.Props<Value>, 'className' | 'children' | 'orientation'> & {
        /** Class applied to the group container. */
        className?: string
        /** Toggle items rendered by the group. */
        children?: React.ReactNode
        /** Arrow-key direction; defaults to `horizontal`. */
        orientation?: 'horizontal' | 'vertical'
        /** Ref to the rendered div. */
        ref?: React.Ref<HTMLDivElement>
    }
>

/** Generic group component and its item slot. */
export type ToggleGroupCompound = (<Value extends string>(
    props: ToggleGroupProps<Value>,
) => React.ReactElement) & Readonly<{
    Item: React.FC<ToggleGroupItemProps>
}> & { displayName?: string }
