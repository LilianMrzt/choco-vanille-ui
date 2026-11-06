import type { ReactElement } from 'react'

import { Switch } from '@components/forms/switch'
import { Flex } from '@components/layout/flex'

/**
 * Shows the available switch sizes.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Size examples.
 * @example
 * <SwitchSizes />
 */
const SwitchSizes = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={16}
    >
        <Switch
            label={'Small'}
            size={'sm'}
        />
        <Switch
            label={'Medium'}
            size={'md'}
        />
        <Switch
            label={'Large'}
            size={'lg'}
        />
    </Flex>
)

export default SwitchSizes
