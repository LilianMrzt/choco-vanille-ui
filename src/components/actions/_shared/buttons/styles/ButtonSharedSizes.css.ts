import { BUTTON_SIZE_TO_HEIGHT } from '@components/actions/_shared/buttons/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

/** Text-button heights, horizontal padding and icon gaps shared by Button and Toggle. */
export const BUTTON_SHARED_SIZE_STYLES = {
    sm: {
        height: BUTTON_SIZE_TO_HEIGHT.sm,
        paddingInline: vars.space[10],
        gap: vars.space[4],
    },
    md: {
        height: BUTTON_SIZE_TO_HEIGHT.md,
        paddingInline: vars.space[14],
        gap: vars.space[6],
    },
    lg: {
        height: BUTTON_SIZE_TO_HEIGHT.lg,
        paddingInline: vars.space[20],
        gap: vars.space[8],
    },
}
