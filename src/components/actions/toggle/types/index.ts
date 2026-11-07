import type * as React from 'react'
import type { Toggle as BaseToggle } from '@base-ui/react/toggle'
import type { ButtonColorShared, ButtonLayoutProps, ButtonSizeShared } from '@components/actions/_shared/buttons/types'
import type { IconComponent } from '@components/foundation/icon'
import type { Radius } from '@theme/tokens/radius/types/index.ts'

/** Supported toggle treatments. */
export type ToggleVariant = 'ghost' | 'ghostSubtle' | 'outlined' | 'outlinedSubtle'
/** Supported semantic color intents. */
export type ToggleColor = ButtonColorShared
/** Supported size presets. */
export type ToggleSize = ButtonSizeShared
/** Supported radius overrides. */
export type ToggleRadius = keyof Radius

/** Text mode with optional decorative icons. */
export type ToggleLabelContent = Readonly<{
    label: string
    icon?: never
    'aria-label'?: string
    startIcon?: IconComponent
    endIcon?: IconComponent
}>

/** Icon-only mode requires an accessible name. */
export type ToggleIconContent = Readonly<{
    label?: never
    icon: IconComponent
    'aria-label': string
    startIcon?: never
    endIcon?: never
}>

/** Accessible text or icon-only content. */
export type ToggleContent = ToggleLabelContent | ToggleIconContent

/** Standalone or group toggle props; state is coordinated by a surrounding group. */
export type ToggleProps = Readonly<
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'> &
    ToggleContent & {
        /** Treatment; defaults to `ghostSubtle`. */
        variant?: ToggleVariant
        /** Semantic color intent; defaults to `primary`. */
        color?: ToggleColor
        /** Height at a 16px root: sm 28px, md 36px, lg 44px. Defaults to `md`. Prefer lg for touch. */
        size?: ToggleSize
        /** Radius override. */
        radius?: ToggleRadius
        /** Ref to the native button. */
        ref?: React.Ref<HTMLButtonElement>
    } &
    Pick<BaseToggle.Props, 'pressed' | 'defaultPressed' | 'onPressedChange' | 'value' | 'disabled'> &
    ButtonLayoutProps
>
