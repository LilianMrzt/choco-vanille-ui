import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import type { ReactElement } from 'react'

import { Fab } from '@components/actions/fab'
import { Flex } from '@components/layout/flex'
import FabFrame from '@stories/actions/fab/components/fab-frame/FabFrame'
import { COLORS } from '@stories/actions/fab/constants'

/**
 * Shows the available color intents.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Color examples.
 * @example
 * <FabColors />
 */
const FabColors = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
        padding={16}
    >
        {COLORS.map((color) => (
            <FabFrame key={color}>
                <Fab
                    aria-label={color}
                    color={color}
                    icon={SearchIcon}
                />
            </FabFrame>
        ))}
    </Flex>
)

export default FabColors
