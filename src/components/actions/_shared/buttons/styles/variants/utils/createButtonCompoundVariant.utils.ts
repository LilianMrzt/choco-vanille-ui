import { type StyleRule } from '@vanilla-extract/css'

import { BUTTON_COLORS_ARRAY } from '@components/actions/_shared/buttons/constants'
import type {
    ButtonColorShared,
    ButtonVariantShared,
} from '@components/actions/_shared/buttons/types'
import type { ButtonCompoundVariant } from '@components/actions/_shared/buttons/styles/variants/types'

/**
 * Builds the compound-variant entries for a single visual variant across every button color.
 * The array is generated once at module evaluation time (build time for Vanilla Extract),
 * so there is no per-render runtime cost in the browser.
 */
export const createButtonCompoundVariantUtils = (
    variant: ButtonVariantShared,
    getStyle: (color: ButtonColorShared) => StyleRule,
): ButtonCompoundVariant[] =>
    BUTTON_COLORS_ARRAY.map((color) => ({
        variants: { variant, color },
        style: getStyle(color),
    }))
