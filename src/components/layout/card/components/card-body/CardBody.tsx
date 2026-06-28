import { type FC } from 'react'

import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { cardBodyClass } from '@components/layout/card/components/card-body/CardBody.css.ts'
import type { CardBodyProps } from '@components/layout/card/components/card-body/types/CardBody.props.ts'

/** Main content area of a `Card` with uniform padding. */
const CardBody: FC<CardBodyProps> = ({ as = 'div', className, ...props }) => (
    <Box
        as={as}
        className={cn(cardBodyClass, className)}
        {...props}
    />
)

CardBody.displayName = 'CardBody'

export default CardBody
