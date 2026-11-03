import type { ComponentType, CSSProperties, SVGProps } from 'react'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/** CSS icon colors, including theme and external custom property references. */
export type IconColor = CSSProperties['color']

/** A locally bundled SVG component accepted by the Icon primitive. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>
