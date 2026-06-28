import { type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { CardFooterProps } from '@components/layout/card/components/card-footer/types/CardFooter.props.ts'

/** Footer area of a `Card` — a flex row for action buttons. */
const CardFooter: FC<CardFooterProps> = ({ as = 'div', ...props }) => (
    <Flex
        as={as}
        align={'center'}
        gap={'sm'}
        p={'md'}
        pt={'none'}
        {...props}
    />
)

CardFooter.displayName = 'CardFooter'

export default CardFooter
