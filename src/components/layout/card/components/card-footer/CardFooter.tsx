import { type FC } from 'react'

import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { cardFooterClass } from '@components/layout/card/components/card-footer/CardFooter.css.ts'
import type { CardFooterProps } from '@components/layout/card/components/card-footer/types/CardFooter.props.ts'

/** Footer area of a `Card` — a flex row for action buttons. */
const CardFooter: FC<CardFooterProps> = ({ as = 'div', className, ...props }) => (
    <Box
        as={as}
        className={cn(cardFooterClass, className)}
        {...props}
    />
)

CardFooter.displayName = 'CardFooter'

export default CardFooter
