import { BADGE_COLORS_ARRAY, BADGE_VARIANTS } from '@components/data-display/badge/constants'
import type { BadgeCompoundVariant } from '@components/data-display/badge/utils/create-badge-compound-variants/types'
import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents'
import { vars } from '@theme/styles/contract/contract.css.ts'

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
        const family = vars.color[COLOR_INTENT_TOKENS[color]]

        return [
            {
                variants: { variant: BADGE_VARIANTS.contained, color },
                style: { backgroundColor: family.main, color: family.foreground },
            },
            {
                variants: { variant: BADGE_VARIANTS.subtle, color },
                style: { backgroundColor: family.subtle, color: family.subtleForeground },
            },
            {
                variants: { variant: BADGE_VARIANTS.outlined, color },
                style: { borderColor: family.subtleHover, color: family.subtleForeground },
            },
            {
                variants: { variant: BADGE_VARIANTS.outlinedSubtle, color },
                style: {
                    backgroundColor: family.subtle,
                    borderColor: family.subtleHover,
                    color: family.subtleForeground,
                },
            },
        ]
    })
