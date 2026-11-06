import type { StyleRule } from '@vanilla-extract/css'

import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Resolves the shared Badge and Avatar color treatments for a semantic intent.
 * The outlined treatment's transparent surface is supplied by each component.
 * @param color - Semantic component color intent.
 * @returns Theme-backed surface, foreground and decorative border styles.
 * @example
 * getColorTreatmentStyles('primary').outlinedSubtle
 */
export const getColorTreatmentStyles = (
    color: keyof typeof COLOR_INTENT_TOKENS,
): Readonly<Record<'contained' | 'subtle' | 'outlined' | 'outlinedSubtle', StyleRule>> => {
    const family = vars.color[COLOR_INTENT_TOKENS[color]]

    return {
        contained: { backgroundColor: family.main, color: family.foreground },
        subtle: { backgroundColor: family.subtle, color: family.subtleForeground },
        outlined: { borderColor: family.subtleHover, color: family.subtleForeground },
        outlinedSubtle: {
            backgroundColor: family.subtle,
            borderColor: family.subtleHover,
            color: family.subtleForeground,
        },
    }
}
