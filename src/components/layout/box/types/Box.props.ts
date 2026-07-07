import type * as React from 'react'
import type { CSSProperties, HTMLAttributes, RefAttributes } from 'react'

import type { BoxRecipeVariants } from '@components/layout/box/styles/Box.css.ts'
import type { BoxVariant } from '@components/layout/box/types/Box.types.ts'

export type BoxProps = HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement> &
  BoxRecipeVariants & {
    /** The HTML element to render. Defaults to `div`. */
    as?: BoxVariant | React.ElementType
    width?: CSSProperties['width']
    minWidth?: CSSProperties['minWidth']
    maxWidth?: CSSProperties['maxWidth']
    height?: CSSProperties['height']
    minHeight?: CSSProperties['minHeight']
    maxHeight?: CSSProperties['maxHeight']
  }
