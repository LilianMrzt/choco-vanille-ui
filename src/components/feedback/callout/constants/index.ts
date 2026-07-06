import { IconRegistry } from '@constants/icons'
import type { CalloutVariant } from '@components/feedback/callout/types/Callout.types.ts'
import type { ThemeColor } from '@theme'

export const VARIANT_TO_ICON: Record<CalloutVariant, string> = {
    info: IconRegistry.info,
    success: IconRegistry.success,
    warning: IconRegistry.warning,
    error: IconRegistry.error,
}

export const VARIANT_TO_COLOR: Record<CalloutVariant, ThemeColor> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'destructive',
}
