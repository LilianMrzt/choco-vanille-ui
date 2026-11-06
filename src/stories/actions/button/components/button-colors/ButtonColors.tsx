import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { COLORS } from '@stories/actions/button/constants'

/**
 * Shows the semantic button colors.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Color examples.
 * @example
 * <ButtonColors />
 */
const ButtonColors = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
        maxWidth={'40rem'}
    >
        {COLORS.map((color) => (
            <Button
                key={color}
                color={color}
                label={color}
            />
        ))}
    </Flex>
)

export default ButtonColors
