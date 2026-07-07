import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type { SeparatorRecipeVariants } from '@components/layout/separator/styles/Separator.css.ts'

export type SeparatorProps = Omit<BoxProps, 'children'> &
  SeparatorRecipeVariants;
