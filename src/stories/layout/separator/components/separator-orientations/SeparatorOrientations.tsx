import { Flex } from '@components/layout/flex'
import { Separator } from '@components/layout/separator'
import type { ReactElement } from 'react'

/**
 * Renders the Separator Orientations story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <SeparatorOrientations />
 */
const SeparatorOrientations = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={16}
    >
        <Flex
            alignItems={'center'}
            gap={12}
            height={'120px'}
        >
            <span>Left</span>
            <Separator orientation={'vertical'} />
            <span>Right</span>
        </Flex>
        <Flex
            flexDirection={'column'}
            gap={12}
        >
            <span>Above</span>
            <Separator orientation={'horizontal'} />
            <span>Below</span>
        </Flex>
    </Flex>
)

export default SeparatorOrientations
