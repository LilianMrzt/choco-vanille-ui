import type { ComponentType, SVGProps, CSSProperties, RefAttributes } from 'react'
import type { ThemeColorValue } from '@theme'
import type { ImageMargin, ImageObjectFit, ImageObjectPosition, ImageSpace } from '@components/data-display/image/types'
import type { BoxBorderRadius, BoxColor } from '@components/layout/box/types'

/** A locally bundled SVG component accepted by the SvgImage primitive. */
export type SvgImageComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Theme color tokens supported by the SvgImage component. */
export type SvgImageColor = ThemeColorValue

/** Object-fit values supported by the SvgImage component. */
export type SvgImageObjectFit = ImageObjectFit

/** Object-position values supported by the SvgImage component. */
export type SvgImageObjectPosition = ImageObjectPosition;

/** Spacing tokens supported by the SvgImage component's recipe. */
export type SvgImageSpace = ImageSpace;

/** Margin tokens supported by the SvgImage component's recipe. */
export type SvgImageMargin = ImageMargin;

export type SvgImageProps = Readonly<Omit<
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
        /** CSS background color or custom-property reference. Consumer style wins. */
        backgroundColor?: BoxColor;
      }>;
