import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { Icon } from '@components/foundation/icon'
import { Flex } from '@components/layout/flex'
import { SIZES } from '@stories/foundation/icon/constants'
import type { ReactElement } from 'react'

/**
 * Displays the available icon size presets.
 * @internal Not part of the public package API.
 * @returns One labelled icon per size.
 * @example
 * <IconSizes />
 */
const IconSizes = (): ReactElement => (
    <Flex
        alignItems={'center'}
        gap={12}
    >
        {SIZES.map(size => (
            <Icon
                key={size}
                aria-label={size}
                icon={SearchIcon}
                size={size}
            />
        ))}
    </Flex>
)

export default IconSizes
