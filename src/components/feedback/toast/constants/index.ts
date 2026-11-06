import type { ToastVariant } from '@components/feedback/toast/types'
import CircleCheckIcon from '@resources/asset/CircleCheckIcon.svg?react'
import CircleErrorIcon from '@resources/asset/CircleErrorIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import TriangleAlertIcon from '@resources/asset/TriangleAlertIcon.svg?react'
import { vars } from '@theme/styles/contract/contract.css.ts'
import type { IconComponent } from '@components/foundation/icon'

export const TOAST_VARIANTS = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
} as const

export const TOAST_CHANNELS = {
    notifications: 'notifications',
    toasts: 'toasts',
} as const

export const TOAST_WIDTH = '20rem'

export const VARIANT_TO_ICON: Record<ToastVariant, IconComponent> = {
    info: InfoIcon,
    success: CircleCheckIcon,
    warning: TriangleAlertIcon,
    error: CircleErrorIcon,
}

export const VARIANT_TO_COLOR: Record<ToastVariant, string> = {
    info: vars.color.info.main,
    success: vars.color.success.main,
    warning: vars.color.warning.main,
    error: vars.color.danger.main,
}
