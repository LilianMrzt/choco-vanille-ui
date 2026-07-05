import { type FC } from 'react'

import { Box } from '@components/layout/box'
import type { CardBodyProps } from '@components/layout/card/components/card-body/types/CardBody.props.ts'

/** Main content area of a `Card` with uniform padding. */
const CardBody: FC<CardBodyProps> = ({ as = 'div', padding = 'md', ...props }) => (
    <Box
        as={as}
        padding={padding}
        {...props}
    />
)

CardBody.displayName = 'CardBody'

export default CardBody
