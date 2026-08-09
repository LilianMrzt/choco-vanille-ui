import type { ThemeColorValue } from '@theme'
import type { ComponentType, SVGProps } from 'react'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/** Theme color tokens supported by the Icon recipe. */
export type IconColor = ThemeColorValue

/** A locally bundled SVG component accepted by the Icon primitive. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>
