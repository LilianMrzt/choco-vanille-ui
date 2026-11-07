import type { NotificationCardVariant } from '@components/feedback/notification-card/types'
import CircleCheckIcon from '@resources/asset/CircleCheckIcon.svg?react'
import CircleErrorIcon from '@resources/asset/CircleErrorIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import TriangleAlertIcon from '@resources/asset/TriangleAlertIcon.svg?react'
import { vars } from '@theme/styles/contract/contract.css.ts'
import type { IconComponent } from '@components/foundation/icon'

export const NOTIFICATION_CARD_VARIANTS = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
} as const

export const VARIANT_TO_ICON: Record<NotificationCardVariant, IconComponent> = {
    info: InfoIcon,
    success: CircleCheckIcon,
    warning: TriangleAlertIcon,
    danger: CircleErrorIcon,
}

export const VARIANT_TO_COLOR: Record<NotificationCardVariant, string> = {
    info: vars.color.info.subtleForeground,
    success: vars.color.success.subtleForeground,
    warning: vars.color.warning.subtleForeground,
    danger: vars.color.danger.subtleForeground,
}

export const VARIANT_TO_BACKGROUND: Record<NotificationCardVariant, string> = {
    info: vars.color.info.subtle,
    success: vars.color.success.subtle,
    warning: vars.color.warning.subtle,
    danger: vars.color.danger.subtle,
}

/** Decorative icon borders, matching the outlinedSubtle Badge treatment. */
export const VARIANT_TO_BORDER_COLOR: Record<NotificationCardVariant, string> = {
    info: vars.color.info.subtleHover,
    success: vars.color.success.subtleHover,
    warning: vars.color.warning.subtleHover,
    danger: vars.color.danger.subtleHover,
}
