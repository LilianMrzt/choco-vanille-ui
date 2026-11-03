import type { ToastVariant } from '@components/feedback/toast/types/Toast.types.ts'
import CircleCheckIcon from '@resources/asset/CircleCheckIcon.svg?react'
import CircleErrorIcon from '@resources/asset/CircleErrorIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import TriangleAlertIcon from '@resources/asset/TriangleAlertIcon.svg?react'
import { vars } from '@theme/styles/contract/contract.css.ts'
import type { IconComponent } from '@components/foundation/icon'

export { TOAST_VARIANTS } from '@components/feedback/toast/constants/toastVariants.const.ts'
export { TOAST_CHANNELS } from '@components/feedback/toast/constants/toastChannels.const.ts'
export { TOAST_WIDTH } from '@components/feedback/toast/constants/toastDimensions.const.ts'

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
