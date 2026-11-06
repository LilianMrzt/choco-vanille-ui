import { vars } from '@theme/styles/contract/contract.css.ts'

import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Separator } from '@components/layout/separator'
import type { ComponentProps, ReactElement } from 'react'

/**
 * Renders the Separator Playground story.
 * @internal Not part of the public package API.
 * @param args - Current component props.
 * @returns The example content.
 * @example
 * <SeparatorPlayground />
 */
const SeparatorPlayground = (args: ComponentProps<typeof Separator>): ReactElement => (
    <Box
        padding={16}
        backgroundColor={vars.color.surface.main}
        borderRadius={8}
        style={{
            height: args.orientation === 'vertical' ? '120px' : undefined,
            width: args.orientation === 'vertical' ? 'fit-content' : undefined,
        }}
    >
        {args.orientation === 'vertical' ? (
            <Flex
                alignItems={'center'}
                gap={12}
                style={{ height: '100%' }}
            >
                <span>Left</span>
                <Separator {...args} />
                <span>Right</span>
            </Flex>
        ) : (
            <Flex
                flexDirection={'column'}
                gap={12}
            >
                <span>Above</span>
                <Separator {...args} />
                <span>Below</span>
            </Flex>
        )}
    </Box>
)

export default SeparatorPlayground
