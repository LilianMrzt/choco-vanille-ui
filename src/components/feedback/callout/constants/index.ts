import CircleCheckIcon from '@resources/asset/CircleCheckIcon.svg?react'
import CircleErrorIcon from '@resources/asset/CircleErrorIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import TriangleAlertIcon from '@resources/asset/TriangleAlertIcon.svg?react'
import type { CalloutVariant } from '@components/feedback/callout/types/Callout.types.ts'
import type { ThemeColor } from '@theme/tokens/colors/types/index.ts'
import type { IconButtonColor } from '@components/actions/icon-button/types/IconButton.types.ts'
import type { IconComponent } from '@components/foundation/icon'

export const VARIANT_TO_ICON: Record<CalloutVariant, IconComponent> = {
    info: InfoIcon,
    success: CircleCheckIcon,
    warning: TriangleAlertIcon,
    error: CircleErrorIcon,
}

export const VARIANT_TO_COLOR: Record<CalloutVariant, ThemeColor> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'danger',
}

export const VARIANT_TO_ACTION_COLOR: Record<CalloutVariant, IconButtonColor> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'destructive',
}
