import type { CSSProperties, RefAttributes, SVGProps } from 'react'

import type {
    BoxBorderRadius,
    BoxColor,
} from '@components/layout/box/types/Box.types.ts'
import type {
    SvgImageMargin,
    SvgImageColor,
    SvgImageObjectFit,
    SvgImageObjectPosition,
    SvgImageSpace,
    SvgImageComponent,
} from '@components/layout/svg-image/types/SvgImage.types.ts'

export type SvgImageProps = Omit<
  SVGProps<SVGSVGElement>,
  'aria-hidden' | 'role' | 'width' | 'height' | 'color'
> &
  RefAttributes<SVGSVGElement> & {
    /** Locally bundled SVG component to render. */
    image: SvgImageComponent;
    /** Accessible text description. An empty string keeps the image decorative. */
    alt?: string;
    /** Theme color token applied to the SVG image's `color` CSS property. */
    color?: SvgImageColor
    /** The CSS `width` of the SVG image. */
    width?: CSSProperties['width'];
    /** The CSS `min-width` of the SVG image. */
    minWidth?: CSSProperties['minWidth'];
    /** The CSS `max-width` of the SVG image. */
    maxWidth?: CSSProperties['maxWidth'];
    /** The CSS `height` of the SVG image. */
    height?: CSSProperties['height'];
    /** The CSS `min-height` of the SVG image. */
    minHeight?: CSSProperties['minHeight'];
    /** The CSS `max-height` of the SVG image. */
    maxHeight?: CSSProperties['maxHeight'];
    /** The CSS `aspect-ratio` of the SVG image. */
    aspectRatio?: CSSProperties['aspectRatio'];
    /** The CSS `object-fit` value of the SVG image. */
    objectFit?: SvgImageObjectFit;
    /** The CSS `object-position` value of the SVG image. */
    objectPosition?: SvgImageObjectPosition;
    /** The border radius token applied to the SVG image. */
    borderRadius?: BoxBorderRadius;
    /** The padding token applied to the SVG image. */
    padding?: SvgImageSpace;
    /** The margin token applied to the SVG image. Supports `auto`. */
    margin?: SvgImageMargin;
    /** The theme color token applied to the SVG image's background. */
    backgroundColor?: BoxColor;
  };
