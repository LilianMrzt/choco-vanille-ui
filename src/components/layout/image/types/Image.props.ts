import type { CSSProperties, ImgHTMLAttributes, RefAttributes } from 'react'

import type {
    BoxBorderRadius,
    BoxColor,
} from '@components/layout/box/types/Box.types.ts'
import type {
    ImageMargin,
    ImageObjectFit,
    ImageObjectPosition,
    ImageSpace,
} from '@components/layout/image/types/Image.types.ts'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> &
  RefAttributes<HTMLImageElement> & {
    /** The CSS `width` of the image. */
    width?: CSSProperties['width'];
    /** The CSS `min-width` of the image. */
    minWidth?: CSSProperties['minWidth'];
    /** The CSS `max-width` of the image. */
    maxWidth?: CSSProperties['maxWidth'];
    /** The CSS `height` of the image. */
    height?: CSSProperties['height'];
    /** The CSS `min-height` of the image. */
    minHeight?: CSSProperties['minHeight'];
    /** The CSS `max-height` of the image. */
    maxHeight?: CSSProperties['maxHeight'];
    /** The CSS `aspect-ratio` of the image. */
    aspectRatio?: CSSProperties['aspectRatio'];
    /** The CSS `object-fit` value of the image. */
    objectFit?: ImageObjectFit;
    /** The CSS `object-position` value of the image. */
    objectPosition?: ImageObjectPosition;
    /** The border radius token applied to the image. */
    borderRadius?: BoxBorderRadius;
    /** The padding token applied to the image. */
    padding?: ImageSpace;
    /** The margin token applied to the image. Supports `auto`. */
    margin?: ImageMargin;
    /** The theme color token applied to the image's background color. */
    backgroundColor?: BoxColor;
  };
