import { Flex } from '@components/layout/flex'
import { Separator } from '@components/layout/separator'
import { COLORS } from '@stories/layout/separator/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Separator Colors story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <SeparatorColors />
 */
const SeparatorColors = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={12}
        width={'20rem'}
    >
        {COLORS.map((color) => (
            <Separator
                key={color}
                color={color}
            />
        ))}
    </Flex>
)

export default SeparatorColors
