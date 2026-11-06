import { Flex } from '@components/layout/flex'
import { Separator } from '@components/layout/separator'
import type { ReactElement } from 'react'

/**
 * Renders the Separator WithLabel story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <SeparatorWithLabel />
 */
const SeparatorWithLabel = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={16}
    >
        <Separator label={'Or continue'} />
        <Flex
            alignItems={'center'}
            gap={12}
            height={'120px'}
        >
            <span>Left</span>
            <Separator
                orientation={'vertical'}
                label={'Or'}
            />
            <span>Right</span>
        </Flex>
    </Flex>
)

export default SeparatorWithLabel
