import type { ToastVariant } from '@components/feedback/toast/types/Toast.types.ts'
import { IconRegistry } from '@constants/icons'
import type { ThemeColor } from '@theme'

export { TOAST_VARIANTS } from '@components/feedback/toast/constants/toastVariants.const.ts'
export { TOAST_CHANNELS } from '@components/feedback/toast/constants/toastChannels.const.ts'
export { TOAST_WIDTH } from '@components/feedback/toast/constants/toastDimensions.const.ts'

export const VARIANT_TO_ICON: Record<ToastVariant, string> = {
    info: IconRegistry.info,
    success: IconRegistry.success,
    warning: IconRegistry.warning,
    error: IconRegistry.error,
}

export const VARIANT_TO_COLOR: Record<ToastVariant, ThemeColor> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'destructive',
}
