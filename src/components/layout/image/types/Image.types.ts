import type { Space } from '@theme/tokens/spacing/types/index.ts'

/** Object-fit values supported by the Image component. */
export type ImageObjectFit =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'none'
  | 'scale-down';

/** Object-position values supported by the Image component. */
export type ImageObjectPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/** Spacing tokens supported by the Image component's recipe. */
export type ImageSpace = keyof Space

/** Margin tokens supported by the Image component's recipe. */
export type ImageMargin = 'auto' | ImageSpace;
