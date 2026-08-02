import type { BoxProps } from '@components/layout/box/types/Box.props.ts'

export type CardProps = Omit<BoxProps, 'as' | 'backgroundColor' | 'color' | 'borderRadius' | 'borderWidth' | 'borderColor' | 'boxShadow' | 'overflow' | 'borderStyle'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'section' | 'article' | 'aside'
  /** Background color token. @default 'card' */
  backgroundColor?: BoxProps['backgroundColor']
  /** Text color token. @default 'cardForeground' */
  color?: BoxProps['color']
  /** Border radius token. @default 'lg' */
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
