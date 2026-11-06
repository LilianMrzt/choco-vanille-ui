import { Flex } from '@components/layout/flex'
import type { ComponentProps, ReactElement } from 'react'
import Item from '@stories/layout/flex/components/flex-item/FlexItem'

/**
 * Renders the Flex Playground story.
 * @internal Not part of the public package API.
 * @param args - Current component props.
 * @returns The example content.
 * @example
 * <FlexPlayground />
 */
const FlexPlayground = (args: ComponentProps<typeof Flex>): ReactElement => (
    <Flex {...args}>
        <Item label={'Item 1'} />
        <Item label={'Item 2'} />
        <Item label={'Item 3'} />
    </Flex>
)

export default FlexPlayground
