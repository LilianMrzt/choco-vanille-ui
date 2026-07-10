import type * as React from 'react'

import type { ToggleGroup } from '@base-ui/react/toggle-group'

import type { ToggleButtonGroupOrientation } from '@components/actions/toggle-button-group/types/ToggleButtonGroup.types.ts'
import type { ThemeColor } from '@theme/types'

export type ToggleButtonGroupProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'children' | 'onChange' | 'defaultValue' | 'value'
> &
    Pick<
        ToggleGroup.Props,
        'value' | 'defaultValue' | 'onValueChange' | 'disabled' | 'loopFocus' | 'multiple'
    > & {
        /** Ref forwarded to the underlying `<div>` element. */
        ref?: React.Ref<HTMLDivElement>
        /** The toggle buttons to render inside the group. */
        children?: React.ReactNode
        /** Layout direction of the toggle group. @default 'horizontal' */
        orientation?: ToggleButtonGroupOrientation
        /** Background color of the group wrapper. Overrides the default. */
        backgroundColor?: ThemeColor
        /** Shows the group outline border. @default true */
        bordered?: boolean
        /** When `true` (default), the last pressed item cannot be unpressed. */
        requireSelection?: boolean
    }
