import type { ReactElement } from 'react'

import { Fab } from '@components/actions/fab'
import { Flex } from '@components/layout/flex'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import FabFrame from '@stories/actions/fab/components/fab-frame/FabFrame'
import { POSITIONS } from '@stories/actions/fab/constants'

/**
 * Shows extended buttons in each supported position.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Position examples.
 * @example
 * <FabExtended />
 */
const FabExtended = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
        padding={16}
    >
        {POSITIONS.map((position) => (
            <FabFrame key={position}>
                <Fab
                    icon={SearchIcon}
                    label={'Search'}
                    position={position}
                />
            </FabFrame>
        ))}
    </Flex>
)

export default FabExtended
