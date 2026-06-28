import { type FC } from 'react'

import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { cardClass } from '@components/layout/card/Card.css.ts'
import type { CardProps } from '@components/layout/card/types/Card.props.ts'

/**
 * A surface container with a consistent background, border, shadow and
 * rounded corners. Compose with the named sub-components for a structured
 * layout.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader
 *     title="Account settings"
 *     description="Manage your profile."
 *     actions={<IconButton icon="mdi:dots-vertical" aria-label="More" />}
 *   />
 *   <CardBody>Content goes here</CardBody>
 *   <CardFooter>
 *     <Button label="Save" variant="contained" color="primary" />
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

export { Card }
