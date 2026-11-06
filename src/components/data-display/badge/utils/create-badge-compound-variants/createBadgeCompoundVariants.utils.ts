import { BADGE_COLORS_ARRAY, BADGE_VARIANTS_ARRAY } from '@components/data-display/badge/constants'
import type { BadgeCompoundVariant } from '@components/data-display/badge/utils/create-badge-compound-variants/types'
import { getColorTreatmentStyles } from '@components/data-display/_shared/color-treatments/getColorTreatmentStyles.utils.ts'

/**
 * Resolves every Badge treatment to its semantic surface, foreground and border.
 * Outlined badges use the subtle hover shade as a decorative border.
 * Called when defining styles, not during component rendering.
 *
 * @returns Color and treatment combinations for the Badge stylesheet.
 * @example
 * const compoundVariants = createBadgeCompoundVariants()
 */
export const createBadgeCompoundVariants = (): BadgeCompoundVariant[] =>
    BADGE_COLORS_ARRAY.flatMap((color) => {
        const styles = getColorTreatmentStyles(color)

        return BADGE_VARIANTS_ARRAY.map((variant) => ({
            variants: { variant, color },
            style: styles[variant],
        }))
    })
