import type { BoxProps } from '@components/layout/box/types/Box.props.ts'

export type CardProps = Omit<BoxProps, 'backgroundColor' | 'color' | 'borderRadius' | 'borderWidth' | 'borderColor' | 'boxShadow' | 'overflow' | 'borderStyle'> & {
  /** Background color token. @default 'surface' */
  backgroundColor?: BoxProps['backgroundColor']
  /** Text color token. @default 'surfaceForeground' */
  color?: BoxProps['color']
  /** Border radius token. @default 'md' */
  borderRadius?: BoxProps['borderRadius']
  /** Border width. @default '1px' */
  borderWidth?: BoxProps['borderWidth']
  /** Border color token. @default 'border' */
  borderColor?: BoxProps['borderColor']
  /** Border style. @default 'solid' */
  borderStyle?: BoxProps['borderStyle']
  /** Shadow token. @default 'none' */
  boxShadow?: BoxProps['boxShadow']
  /** Overflow behavior. @default 'hidden' */
  overflow?: BoxProps['overflow']
}
