import type { ComponentType, SVGProps } from 'react'

import type { ThemeColorValue } from '@theme'
import type {
    ImageMargin,
    ImageObjectFit,
    ImageObjectPosition,
    ImageSpace,
} from '@components/layout/image/types/Image.types.ts'

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
