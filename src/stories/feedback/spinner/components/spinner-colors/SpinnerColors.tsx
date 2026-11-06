import type { ReactElement } from 'react'

import { SPINNER_COLORS_ARRAY, Spinner } from '@components/feedback/spinner'
import { Flex } from '@components/layout/flex'

/**
 * Displays the supported spinner color intents.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The color examples.
 * @example
 * <SpinnerColors />
 */
const SpinnerColors = (): ReactElement => (
    <Flex
        alignItems={'center'}
        gap={16}
    >
        {SPINNER_COLORS_ARRAY.map((color) => (
            <Spinner
                key={color}
                aria-label={'Loading'}
                color={color}
            />
        ))}
    </Flex>
)

export default SpinnerColors
