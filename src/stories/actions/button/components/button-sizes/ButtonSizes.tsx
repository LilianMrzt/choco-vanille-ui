import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { SIZES } from '@stories/actions/button/constants'

/**
 * Shows the available button sizes.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Size examples.
 * @example
 * <ButtonSizes />
 */
const ButtonSizes = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={12}
    >
        {SIZES.map((size) => (
            <Button
                key={size}
                label={size.toUpperCase()}
                size={size}
            />
        ))}
    </Flex>
)

export default ButtonSizes
