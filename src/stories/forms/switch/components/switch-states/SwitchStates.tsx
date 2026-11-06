import type { ReactElement } from 'react'

import { Switch } from '@components/forms/switch'
import { Flex } from '@components/layout/flex'

/**
 * Shows disabled and invalid switches.
 * @internal Storybook-only component; not part of the public package API.
 * @returns State examples.
 * @example
 * <SwitchStates />
 */
const SwitchStates = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={16}
    >
        <Switch
            disabled
            label={'Disabled'}
        />
        <Switch
            error={'Selection required'}
            label={'Required'}
        />
    </Flex>
)

export default SwitchStates
