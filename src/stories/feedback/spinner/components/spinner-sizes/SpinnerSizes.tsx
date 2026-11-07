import type { ReactElement } from 'react'

import { Spinner } from '@components/feedback/spinner'
import { Flex } from '@components/layout/flex'
import { SIZES } from '@stories/feedback/spinner/constants'

/**
 * Displays the supported spinner sizes.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The size examples.
 * @example
 * <SpinnerSizes />
 */
const SpinnerSizes = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={16}
    >
        {SIZES.map((size) => (
            <Spinner
                key={size}
                aria-label={'Loading'}
                size={size}
            />
        ))}
    </Flex>
)

export default SpinnerSizes
