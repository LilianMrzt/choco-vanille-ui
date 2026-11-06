import type { Space } from '@theme/tokens/spacing/types/index.ts'
import type { CSSProperties, ImgHTMLAttributes, RefAttributes } from 'react'
import type { BoxBorderRadius, BoxColor } from '@components/layout/box/types'

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

export type ImageProps = Readonly<ImgHTMLAttributes<HTMLImageElement> &
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
        /** CSS background color or custom-property reference. Consumer style wins. */
        backgroundColor?: BoxColor;
      }>;
