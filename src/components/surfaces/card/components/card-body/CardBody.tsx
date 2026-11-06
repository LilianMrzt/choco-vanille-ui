import { memo, type FC } from 'react'

import { Box } from '@components/layout/box'
import type { CardBodyProps } from '@components/surfaces/card/components/card-body/types'

/**
 * Main card content with uniform padding. Native attributes and the ref are
 * forwarded to the selected element.
 * @param props - Body options and forwarded Box attributes.
 * @param props.as - Body element; defaults to div.
 * @param props.padding - Padding token; defaults to 12.
 * @returns The card body.
 * @example
 * <Card.Body>Content</Card.Body>
 */
const CardBody: FC<CardBodyProps> = memo(({ as = 'div', padding = 12, ...props }) => (
    <Box
        as={as}
        padding={padding}
        {...props}
    />
))

CardBody.displayName = 'Card.Body'

export default CardBody
