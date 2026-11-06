import { memo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { CardFooterProps } from '@components/surfaces/card/components/card-footer/types'

/**
 * Card footer arranged as a row. Native attributes and the ref are forwarded
 * to the selected element.
 * @param props - Footer options and forwarded Flex attributes.
 * @param props.as - Footer element; defaults to div.
 * @returns The card footer.
 * @example
 * <Card.Footer><Button label="Save" /></Card.Footer>
 */
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
