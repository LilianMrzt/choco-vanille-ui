import type { FlexRecipeVariants } from '@components/layout/flex/Flex.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'

export type FlexProps = Omit<BoxProps, 'display'> & FlexRecipeVariants
