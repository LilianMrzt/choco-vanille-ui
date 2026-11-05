import type { ComponentPropsWithRef, CSSProperties } from 'react'

/** Native col attributes with CSS widths; ref targets the column and style wins. */
export type TableColProps = Readonly<Omit<ComponentPropsWithRef<'col'>, 'width'> & {
        /**
         * Column width — any valid CSS value (`'200px'`, `'25%'`, `'12rem'`).
         * Omitted by default. Use fixed table layout for predictable sizing.
         */
        width?: CSSProperties['width']
        /**
         * Minimum column width — any valid CSS value.
         * Omitted by default; subject to browser column layout rules.
         */
        minWidth?: CSSProperties['minWidth']
        /**
         * Maximum column width.
         * Omitted by default; subject to browser column layout rules.
         */
        maxWidth?: CSSProperties['maxWidth']
}>
