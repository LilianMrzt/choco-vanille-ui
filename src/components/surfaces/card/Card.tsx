import { memo } from 'react'

import { Box } from '@components/layout/box'
import CardBody from '@components/surfaces/card/components/card-body/CardBody.tsx'
import CardFooter from '@components/surfaces/card/components/card-footer/CardFooter.tsx'
import CardHeader from '@components/surfaces/card/components/card-header/CardHeader.tsx'
import { CARD_STYLES } from '@components/surfaces/card/styles/Card.css.ts'
import type { CardCompound } from '@components/surfaces/card/types'
import type { CardProps } from '@components/surfaces/card/types/Card.props.ts'
import { cn } from '@utils/cn.ts'

/**
  * A surface container with a consistent background, border, shadow and
  * rounded corners. Compose with the named sub-components for a structured
  * layout.
  *
  * @example
  * ```tsx
  * <Card>
  *   <Card.Header
  *     title="Account settings"
  *     description="Manage your profile."
  *     actions={<IconButton icon="lucide:ellipsis-vertical" aria-label="More" />}
  *   />
  *   <Card.Body>Content goes here</Card.Body>
  *   <Card.Footer>
  *     <Button label="Save" variant="contained" color="primary" />
  *   </Card.Footer>
  * </Card>
  * ```
  */
const Card = memo<CardProps>(({
    as = 'div',
    backgroundColor,
    color,
    borderRadius = 6,
    borderWidth = '1px',
    borderColor,
    borderStyle = 'solid',
    boxShadow = 'none',
    overflow = 'hidden',
    className,
    ...props
}) => (
    <Box
        as={as}
        backgroundColor={backgroundColor}
        color={color}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderStyle={borderStyle}
        boxShadow={boxShadow}
        overflow={overflow}
        className={cn(CARD_STYLES.root, className)}
        {...props}
    />
)) as unknown as CardCompound

Card.displayName = 'Card'
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
