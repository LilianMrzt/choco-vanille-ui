import type { Collapsible } from '@base-ui/react/collapsible'
import type { Space } from '@theme/tokens/spacing.ts'

import type { DataAttributes } from '@/types/DataAttributes.ts'

export type CollapsiblePanelProps = Collapsible.Panel.Props & {
  padding?: keyof Space;
} & DataAttributes
