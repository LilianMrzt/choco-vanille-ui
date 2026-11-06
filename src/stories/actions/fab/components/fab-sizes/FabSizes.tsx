import type { ReactElement } from 'react'

import { Fab } from '@components/actions/fab'
import { Flex } from '@components/layout/flex'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import FabFrame from '@stories/actions/fab/components/fab-frame/FabFrame'
import { SIZES } from '@stories/actions/fab/constants'

/**
 * Shows the available size presets.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Size examples.
 * @example
 * <FabSizes />
 */
const FabSizes = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
        padding={16}
    >
        {SIZES.map((size) => (
            <FabFrame key={size}>
                <Fab
                    aria-label={size}
                    icon={SearchIcon}
                    size={size}
                />
            </FabFrame>
        ))}
    </Flex>
)

export default FabSizes
