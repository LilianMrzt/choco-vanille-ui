import type { FC } from 'react'

import type CollapsiblePanel from '@components/surfaces/collapsible/components/collapsible-panel/CollapsiblePanel.tsx'
import type CollapsibleTrigger from '@components/surfaces/collapsible/components/collapsible-trigger/CollapsibleTrigger.tsx'
import type { CollapsibleProps } from '@components/surfaces/collapsible/types/Collapsible.props.ts'

export type CollapsibleCompound = FC<CollapsibleProps> & {
    Trigger: typeof CollapsibleTrigger
    Panel: typeof CollapsiblePanel
}

export type { CollapsibleProps } from '@components/surfaces/collapsible/types/Collapsible.props.ts'
