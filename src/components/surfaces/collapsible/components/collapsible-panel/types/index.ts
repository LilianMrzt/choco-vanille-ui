import type { Collapsible } from '@base-ui/react/collapsible'
import type { Space } from '@theme/tokens/spacing/types/index.ts'

import type { DataAttributes } from '@/types/DataAttributes.ts'

/** Props for the collapsible content panel. */
export type CollapsiblePanelProps = Readonly<Collapsible.Panel.Props & {
  padding?: keyof Space;
} & DataAttributes>
