import type { CSSProperties, ImgHTMLAttributes, RefAttributes } from 'react'

import type { ImageRecipeVariants } from '@components/layout/image/styles/Image.css.ts'

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
    objectFit?: ImageRecipeVariants['objectFit'];
    /** The CSS `object-position` value of the image. */
    objectPosition?: ImageRecipeVariants['objectPosition'];
    /** The border radius token applied to the image. */
    borderRadius?: ImageRecipeVariants['borderRadius'];
    /** The padding token applied to the image. */
    padding?: ImageRecipeVariants['padding'];
    /** The margin token applied to the image. Supports `auto`. */
    margin?: ImageRecipeVariants['margin'];
    /** The theme color token applied to the image's background color. */
    backgroundColor?: ImageRecipeVariants['backgroundColor'];
  };
