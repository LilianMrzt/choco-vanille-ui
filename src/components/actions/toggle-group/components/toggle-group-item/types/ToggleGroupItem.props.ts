import type * as React from 'react'
import type { Toggle as BaseToggle } from '@base-ui/react/toggle'
import type {
    ToggleColor,
    ToggleContent,
    ToggleRadius,
    ToggleSize,
    ToggleVariant,
} from '@components/actions/toggle/types/Toggle.types.ts'

export type ToggleGroupItemProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'color'
> &
    ToggleContent & {
        value: string
        variant?: ToggleVariant
        subtle?: boolean
        color?: ToggleColor
        size?: ToggleSize
        radius?: ToggleRadius
        ref?: React.Ref<HTMLButtonElement>
    } &
    Pick<BaseToggle.Props, 'disabled'>
