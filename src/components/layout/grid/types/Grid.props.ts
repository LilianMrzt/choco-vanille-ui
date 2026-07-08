import type { GridRecipeVariants } from '@components/layout/grid/styles/Grid.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type { CSSProperties } from 'react'

export type GridProps = Omit<BoxProps, 'display'> &
  GridRecipeVariants & {
      /** Shorthand for `gridTemplateColumns`. */
      columns?: CSSProperties['gridTemplateColumns']
  }
