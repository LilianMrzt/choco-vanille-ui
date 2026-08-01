import type * as React from 'react'
import type { Toggle as BaseToggle } from '@base-ui/react/toggle'

import type {
    ToggleColor,
    ToggleContent,
    ToggleRadius,
    ToggleSize,
    ToggleVariant,
} from '@components/actions/toggle/types/Toggle.types.ts'

export type ToggleProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'color'
> &
    ToggleContent & {
        variant?: ToggleVariant
        color?: ToggleColor
        /** Toggle size. Defaults to `md`. */
        size?: ToggleSize
        radius?: ToggleRadius
        ref?: React.Ref<HTMLButtonElement>
    } &
    Pick<
        BaseToggle.Props,
        'pressed' | 'defaultPressed' | 'onPressedChange' | 'value' | 'disabled'
    >
