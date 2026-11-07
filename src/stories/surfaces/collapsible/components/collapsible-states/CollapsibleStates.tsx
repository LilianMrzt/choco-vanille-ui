import type { ReactElement } from 'react'

import { Flex } from '@components/layout/flex'
import { Collapsible } from '@components/surfaces/collapsible'

/**
 * Shows open, closed and disabled states.
 * @internal Storybook-only component; not part of the public package API.
 * @returns State examples.
 * @example
 * <CollapsibleStates />
 */
const CollapsibleStates = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={12}
        maxWidth={'100%'}
        minWidth={0}
        style={{ overflowX: 'auto' }}
        width={'min(25rem, 100%)'}
    >
        <Collapsible defaultOpen>
            <Collapsible.Trigger label={'Open'} />
            <Collapsible.Panel>Visible content.</Collapsible.Panel>
        </Collapsible>
        <Collapsible>
            <Collapsible.Trigger label={'Closed'} />
            <Collapsible.Panel>Hidden content.</Collapsible.Panel>
        </Collapsible>
        <Collapsible disabled>
            <Collapsible.Trigger label={'Disabled'} />
            <Collapsible.Panel>Unavailable content.</Collapsible.Panel>
        </Collapsible>
    </Flex>
)

export default CollapsibleStates
