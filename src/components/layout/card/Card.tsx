import { type FC } from 'react'

import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import {
    cardClass,
    cardHeaderClass,
    cardTitleClass,
    cardDescriptionClass,
    cardBodyClass,
    cardFooterClass,
} from '@components/layout/card/Card.css.ts'
import type {
    CardProps,
    CardHeaderProps,
    CardTitleProps,
    CardDescriptionProps,
    CardBodyProps,
    CardFooterProps,
} from '@components/layout/card/types/Card.props.ts'

/**
 * A surface container with a consistent background, border, shadow and
 * rounded corners. Compose with the named sub-components for a structured
 * layout.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Short description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>
 *     <Button label="Action" />
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card: FC<CardProps> = ({ as = 'div', className, ...props }) => (
    <Box
        as={as}
        className={cn(cardClass, className)}
        {...props}
    />
)
Card.displayName = 'Card'

const CardHeader: FC<CardHeaderProps> = ({ as = 'div', className, ...props }) => (
    <Box
        as={as}
        className={cn(cardHeaderClass, className)}
        {...props}
    />
)
CardHeader.displayName = 'CardHeader'

const CardTitle: FC<CardTitleProps> = ({ as: Element = 'h3', className, ref, ...props }) => (
    <Element
        ref={ref}
        className={cn(cardTitleClass, className)}
        {...props}
    />
)
CardTitle.displayName = 'CardTitle'

const CardDescription: FC<CardDescriptionProps> = ({ className, ref, ...props }) => (
    <p
        ref={ref}
        className={cn(cardDescriptionClass, className)}
        {...props}
    />
)
CardDescription.displayName = 'CardDescription'

const CardBody: FC<CardBodyProps> = ({ as = 'div', className, ...props }) => (
    <Box
        as={as}
        className={cn(cardBodyClass, className)}
        {...props}
    />
)
CardBody.displayName = 'CardBody'

const CardFooter: FC<CardFooterProps> = ({ as = 'div', className, ...props }) => (
    <Box
        as={as}
        className={cn(cardFooterClass, className)}
        {...props}
    />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter }
