import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import CollapsiblePanel from '@components/layout/collapsible/components/collapsible-panel/CollapsiblePanel.tsx'
import CollapsibleTrigger from '@components/layout/collapsible/components/collapsible-trigger/CollapsibleTrigger.tsx'
import { COLLAPSIBLE_STYLES } from '@components/layout/collapsible/Collapsible.css.ts'
import type { CollapsibleProps } from '@components/layout/collapsible/types/Collapsible.props.ts'
import type { CollapsibleCompound } from '@components/layout/collapsible/types'
import { Flex } from '@components/layout/flex'

const Collapsible = (({ className, width, ...props }: CollapsibleProps) => (
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
)) as CollapsibleCompound

Collapsible.displayName = 'Collapsible'
Collapsible.Trigger = CollapsibleTrigger
Collapsible.Panel = CollapsiblePanel

export default Collapsible
