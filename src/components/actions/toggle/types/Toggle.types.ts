import type { ButtonColorShared, ButtonSizeShared } from '@components/actions/_shared/buttons/types'
import type { Radius } from '@theme/tokens/radius/types/index.ts'
import type { IconComponent } from '@components/foundation/icon'

export type ToggleVariant = 'ghost' | 'outlined'
export type ToggleColor = ButtonColorShared
export type ToggleSize = ButtonSizeShared
export type ToggleRadius = keyof Radius

export type ToggleLabelContent = {
    label: string
    icon?: never
    'aria-label'?: string
    startIcon?: IconComponent
    endIcon?: IconComponent
}

export type ToggleIconContent = {
    label?: never
    icon: IconComponent
    'aria-label': string
    startIcon?: never
    endIcon?: never
}

export type ToggleContent = ToggleLabelContent | ToggleIconContent
