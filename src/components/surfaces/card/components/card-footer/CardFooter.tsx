import { memo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { CardFooterProps } from '@components/surfaces/card/components/card-footer/types/CardFooter.props.ts'

/** Footer area of a `Card` — a flex row for action buttons. */
const CardFooter: FC<CardFooterProps> = memo(({ as = 'div', ...props }) => (
    <Flex
        as={as}
        alignItems={'center'}
        gap={8}
        padding={12}
        paddingTop={0}
        {...props}
    />
))

CardFooter.displayName = 'Card.Footer'

export default CardFooter
