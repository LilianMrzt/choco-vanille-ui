import type { StyleRule } from '@vanilla-extract/css'

import type { BadgeColor, BadgeVariant } from '@components/data-display/badge/types'

/** One color and treatment combination consumed by the Badge recipe. */
export type BadgeCompoundVariant = Readonly<{
    variants: Readonly<{ variant: BadgeVariant; color: BadgeColor }>
    style: StyleRule
}>
