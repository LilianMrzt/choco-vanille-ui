import { memo, type FC } from 'react'

import { Box } from '@components/layout/box'
import CardBody from '@components/surfaces/card/components/card-body/CardBody.tsx'
import CardFooter from '@components/surfaces/card/components/card-footer/CardFooter.tsx'
import CardHeader from '@components/surfaces/card/components/card-header/CardHeader.tsx'
import { CARD_STYLES } from '@components/surfaces/card/Card.css.ts'
import type { CardProps } from '@components/surfaces/card/types'
import { cn } from '@utils/cn.ts'

/**
  * A surface container with a consistent background, decorative muted border,
  * shadow and rounded corners. Compose with the named sub-components for a
  * structured layout. Use a stronger border when it is needed to identify an
  * interactive card.
  *
  * Native attributes and refs are forwarded to the root element. Choose
  * an appropriate semantic element and heading level for the surrounding page.
  * @param props - Card options and forwarded Box attributes.
  * @param props.as - Root element; defaults to div.
  * @param props.backgroundColor - CSS background color.
  * @param props.color - CSS text color.
  * @param props.borderRadius - Radius token; defaults to 6.
  * @param props.borderWidth - Border width; defaults to 1px.
  * @param props.borderColor - CSS border color.
  * @param props.borderStyle - Border style; defaults to solid.
  * @param props.boxShadow - Shadow token; defaults to none.
  * @param props.overflow - Overflow behavior; defaults to hidden.
  * @param props.className - Additional root class.
  * @returns The card surface.
  * @example
  * ```tsx
  * <Card>
  *   <Card.Header
  *     title="Account settings"
  *     description="Manage your profile."
  *     actions={<IconButton icon={MoreIcon} aria-label="More" />}
  *   />
  *   <Card.Body>Content goes here</Card.Body>
  *   <Card.Footer>
  *     <Button label="Save" variant="contained" color="primary" />
  *   </Card.Footer>
  * </Card>
  * ```
  */
const CardRoot: FC<CardProps> = memo(({
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
))

CardRoot.displayName = 'Card'

/**
 * Card surface with Header, Body and Footer composition slots.
 * @example
 * <Card><Card.Body>Content</Card.Body></Card>
 */
const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
})

export default Card
