import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'

/**
 * Shows disabled and active buttons.
 * @internal Storybook-only component; not part of the public package API.
 * @returns State examples.
 * @example
 * <ButtonStates />
 */
const ButtonStates = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={12}
    >
        <Button
            disabled
            label={'Disabled'}
        />
        <Button
            active
            label={'Active'}
        />
    </Flex>
)

export default ButtonStates
