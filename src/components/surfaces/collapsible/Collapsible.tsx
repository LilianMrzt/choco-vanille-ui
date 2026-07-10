import { memo } from 'react'

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import CollapsiblePanel from '@components/surfaces/collapsible/components/collapsible-panel/CollapsiblePanel.tsx'
import CollapsibleTrigger from '@components/surfaces/collapsible/components/collapsible-trigger/CollapsibleTrigger.tsx'
import { COLLAPSIBLE_STYLES } from '@components/surfaces/collapsible/styles/Collapsible.css.ts'
import type { CollapsibleProps } from '@components/surfaces/collapsible/types/Collapsible.props.ts'
import type { CollapsibleCompound } from '@components/surfaces/collapsible/types'
import { Flex } from '@components/layout/flex'

const Collapsible = memo<CollapsibleProps>(({ className, width, ...props }) => (
    <Flex
        flexDirection={'column'}
        alignItems={'stretch'}
        width={width ?? '100%'}
        gap={'none'}
        className={typeof className === 'function' ? undefined : className}
    >
        <BaseCollapsible.Root
            className={COLLAPSIBLE_STYLES.root}
            {...props}
        />
    </Flex>
)) as unknown as CollapsibleCompound

Collapsible.displayName = 'Collapsible'
Collapsible.Trigger = CollapsibleTrigger
Collapsible.Panel = CollapsiblePanel

export default Collapsible
