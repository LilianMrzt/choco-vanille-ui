import type { ButtonColorShared, ButtonSizeShared } from '@components/actions/_shared/buttons/types'
import type { Radius } from '@theme/tokens/radii.ts'

export type ToggleVariant = 'ghost' | 'outlined'
export type ToggleColor = ButtonColorShared
export type ToggleSize = ButtonSizeShared
export type ToggleRadius = keyof Radius

export type ToggleLabelContent = {
    label: string
    icon?: never
    'aria-label'?: string
    startIcon?: string
    endIcon?: string
}

export type ToggleIconContent = {
    label?: never
    icon: string
    'aria-label': string
    startIcon?: never
    endIcon?: never
}

export type ToggleContent = ToggleLabelContent | ToggleIconContent
