import { type FC } from 'react'

import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { cardClass } from '@components/layout/card/components/card-root/Card.css.ts'
import type { CardProps } from '@components/layout/card/components/card-root/types/Card.props.ts'

/**
 * Surface container with consistent background, border, shadow and rounded corners.
 * Compose with `CardHeader`, `CardBody` and `CardFooter` for structured layouts.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader title="Settings" description="Manage your account." />
 *   <CardBody>…</CardBody>
 *   <CardFooter><Button label="Save" /></CardFooter>
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

export default Card
