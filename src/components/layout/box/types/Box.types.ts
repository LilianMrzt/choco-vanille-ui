import type { Radius } from '@theme/tokens/radius/types/index.ts'
import type { Shadows } from '@theme/tokens/elevation/types/index.ts'
import type { Space } from '@theme/tokens/spacing/types/index.ts'
import type { ThemeColorValue } from '@theme/tokens/colors/types/index.ts'

/** HTML container elements supported by the Box component. */
export type BoxVariant =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'main'
  | 'header'
  | 'footer'
  | 'nav'
  | 'ul'
  | 'ol'
  | 'li'
  | 'form'
  | 'fieldset'
  | 'figure'
  | 'figcaption'
  | 'details'
  | 'summary'
  | 'dialog'
  | 'address'
  | 'span'

/** Border-radius tokens supported by the Box component. */
export type BoxBorderRadius = keyof Radius

/** Spacing tokens supported by padding and gap props. */
export type BoxSpace = keyof Space

/** Spacing tokens supported by margin props. */
export type BoxMargin = 'auto' | BoxSpace

/** Theme color tokens supported by color props. */
export type BoxColor = ThemeColorValue

/** Shadow tokens supported by the Box component. */
export type BoxShadow = keyof Shadows
