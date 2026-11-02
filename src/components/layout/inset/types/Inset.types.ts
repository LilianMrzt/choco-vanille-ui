import type { Space } from '@theme/tokens/spacing/types/index.ts'

import type {
    INSET_CLIPS,
    INSET_SIDES,
} from '@components/layout/inset/constants/insetSides.const.ts'

/** Semantic spacing tokens supported by the Inset component. */
export type InsetSpace = keyof Space

/** Logical sides that can bleed outside the surrounding container. */
export type InsetSide = (typeof INSET_SIDES)[keyof typeof INSET_SIDES]

/** The boundary to which overflowing content is clipped. */
export type InsetClip = (typeof INSET_CLIPS)[keyof typeof INSET_CLIPS]

/** Padding tokens for preserving space beside bleeding content. */
export type InsetPadding = 'current' | InsetSpace
