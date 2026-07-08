import type * as React from 'react'
import type { CSSProperties, HTMLAttributes, RefAttributes } from 'react'

import type { BoxRecipeVariants } from '@components/layout/box/styles/Box.css.ts'
import type { BoxVariant } from '@components/layout/box/types/Box.types.ts'

export type BoxProps = HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement> &
  BoxRecipeVariants & {
    /** The HTML element to render. Defaults to `div`. */
    as?: BoxVariant | React.ElementType
    display?: CSSProperties['display']
    width?: CSSProperties['width']
    minWidth?: CSSProperties['minWidth']
    maxWidth?: CSSProperties['maxWidth']
    height?: CSSProperties['height']
    minHeight?: CSSProperties['minHeight']
    maxHeight?: CSSProperties['maxHeight']
    overflow?: CSSProperties['overflow']
    overflowX?: CSSProperties['overflowX']
    overflowY?: CSSProperties['overflowY']
    position?: CSSProperties['position']
    flex?: CSSProperties['flex']
    flexDirection?: CSSProperties['flexDirection']
    flexWrap?: CSSProperties['flexWrap']
    alignSelf?: CSSProperties['alignSelf']
    alignItems?: CSSProperties['alignItems']
    alignContent?: CSSProperties['alignContent']
    justifyContent?: CSSProperties['justifyContent']
    justifyItems?: CSSProperties['justifyItems']
    gridTemplateColumns?: CSSProperties['gridTemplateColumns']
    gridAutoRows?: CSSProperties['gridAutoRows']
    gridAutoFlow?: CSSProperties['gridAutoFlow']
    borderWidth?: CSSProperties['borderWidth']
    borderTopWidth?: CSSProperties['borderTopWidth']
    borderRightWidth?: CSSProperties['borderRightWidth']
    borderBottomWidth?: CSSProperties['borderBottomWidth']
    borderLeftWidth?: CSSProperties['borderLeftWidth']
    borderStyle?: CSSProperties['borderStyle']
  }
