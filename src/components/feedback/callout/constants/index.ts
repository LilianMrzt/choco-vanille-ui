import { CIRCLE_CHECK_ICON as CircleCheckIcon, CIRCLE_ERROR_ICON as CircleErrorIcon, INFO_ICON as InfoIcon, TRIANGLE_ALERT_ICON as TriangleAlertIcon } from '@constants/icon-registry'
import type { CalloutVariant } from '@components/feedback/callout/types'
import { vars } from '@theme/styles/contract/contract.css.ts'
import type { IconButtonColor } from '@components/actions/icon-button/types/IconButton.types.ts'
import type { IconifyIcon } from '@components/foundation/icon'

export const VARIANT_TO_ICON: Record<CalloutVariant, IconifyIcon> = {
    info: InfoIcon,
    success: CircleCheckIcon,
    warning: TriangleAlertIcon,
    danger: CircleErrorIcon,
}

export const VARIANT_TO_COLOR: Record<CalloutVariant, string> = {
    info: vars.color.info.main,
    success: vars.color.success.main,
    warning: vars.color.warning.main,
    danger: vars.color.danger.main,
}

export const VARIANT_TO_ACTION_COLOR: Record<CalloutVariant, IconButtonColor> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
}
