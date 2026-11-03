import type * as React from 'react'
import type { CSSProperties, HTMLAttributes, RefAttributes } from 'react'

import type {
    BoxBorderRadius,
    BoxColor,
    BoxMargin,
    BoxShadow,
    BoxSpace,
    BoxVariant,
} from '@components/layout/box/types/Box.types.ts'

export type BoxProps = Omit<HTMLAttributes<HTMLElement>, 'color'> &
  RefAttributes<HTMLElement> & {
    /** The HTML element to render. Defaults to `div`. */
    as?: BoxVariant | React.ElementType;
    /** The CSS `display` value of the element. */
    display?: CSSProperties['display'];
    /** The CSS `width` of the element. */
    width?: CSSProperties['width'];
    /** The CSS `min-width` of the element. */
    minWidth?: CSSProperties['minWidth'];
    /** The CSS `max-width` of the element. */
    maxWidth?: CSSProperties['maxWidth'];
    /** The CSS `height` of the element. */
    height?: CSSProperties['height'];
    /** The CSS `min-height` of the element. */
    minHeight?: CSSProperties['minHeight'];
    /** The CSS `max-height` of the element. */
    maxHeight?: CSSProperties['maxHeight'];
    /** The CSS `overflow` value of the element. */
    overflow?: CSSProperties['overflow'];
    /** The CSS `overflow-x` value of the element. */
    overflowX?: CSSProperties['overflowX'];
    /** The CSS `overflow-y` value of the element. */
    overflowY?: CSSProperties['overflowY'];
    /** The CSS `position` value of the element. */
    position?: CSSProperties['position'];
    /** The CSS `flex` shorthand value of the element. */
    flex?: CSSProperties['flex'];
    /** The CSS `flex-direction` value of the element. */
    flexDirection?: CSSProperties['flexDirection'];
    /** The CSS `flex-wrap` value of the element. */
    flexWrap?: CSSProperties['flexWrap'];
    /** The CSS `align-self` value of the element. */
    alignSelf?: CSSProperties['alignSelf'];
    /** The CSS `align-items` value of the element. */
    alignItems?: CSSProperties['alignItems'];
    /** The CSS `align-content` value of the element. */
    alignContent?: CSSProperties['alignContent'];
    /** The CSS `justify-content` value of the element. */
    justifyContent?: CSSProperties['justifyContent'];
    /** The CSS `text-align` value of the element. */
    textAlign?: CSSProperties['textAlign'];
    /** The CSS `border-width` value of the element. */
    borderWidth?: CSSProperties['borderWidth'];
    /** The CSS `border-top-width` value of the element. */
    borderTopWidth?: CSSProperties['borderTopWidth'];
    /** The CSS `border-right-width` value of the element. */
    borderRightWidth?: CSSProperties['borderRightWidth'];
    /** The CSS `border-bottom-width` value of the element. */
    borderBottomWidth?: CSSProperties['borderBottomWidth'];
    /** The CSS `border-left-width` value of the element. */
    borderLeftWidth?: CSSProperties['borderLeftWidth'];
    /** The CSS `border-style` value of the element. */
    borderStyle?: CSSProperties['borderStyle'];
    /** The border radius token applied to the element. */
    borderRadius?: BoxBorderRadius;
    /** The padding token applied to all sides of the element. */
    padding?: BoxSpace;
    /** The padding token applied to the inline (horizontal) axis of the element. */
    paddingX?: BoxSpace;
    /** The padding token applied to the block (vertical) axis of the element. */
    paddingY?: BoxSpace;
    /** The padding token applied to the top of the element. */
    paddingTop?: BoxSpace;
    /** The padding token applied to the right of the element. */
    paddingRight?: BoxSpace;
    /** The padding token applied to the bottom of the element. */
    paddingBottom?: BoxSpace;
    /** The padding token applied to the left of the element. */
    paddingLeft?: BoxSpace;
    /** The margin token applied to all sides of the element. Supports `auto`. */
    margin?: BoxMargin;
    /** The margin token applied to the inline (horizontal) axis of the element. Supports `auto`. */
    marginX?: BoxMargin;
    /** The margin token applied to the block (vertical) axis of the element. Supports `auto`. */
    marginY?: BoxMargin;
    /** The margin token applied to the top of the element. Supports `auto`. */
    marginTop?: BoxMargin;
    /** The margin token applied to the right of the element. Supports `auto`. */
    marginRight?: BoxMargin;
    /** The margin token applied to the bottom of the element. Supports `auto`. */
    marginBottom?: BoxMargin;
    /** The margin token applied to the left of the element. Supports `auto`. */
    marginLeft?: BoxMargin;
    /** The gap token between flex or grid children. */
    gap?: BoxSpace;
    /** The column gap token between flex or grid children. */
    columnGap?: BoxSpace;
    /** The row gap token between flex or grid children. */
    rowGap?: BoxSpace;
    /** CSS text color, including `vars.color` references. Omitted colors inherit. */
    color?: BoxColor;
    /** CSS border color, including custom property references. */
    borderColor?: CSSProperties['borderColor'];
    /** CSS background color, including custom property references. */
    backgroundColor?: CSSProperties['backgroundColor'];
    /** The shadow token applied to the element. */
    boxShadow?: BoxShadow;
  };
