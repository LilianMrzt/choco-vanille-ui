import type { Collapsible } from '@base-ui/react/collapsible'
import type { Space } from '@theme/tokens/spacing.ts'

export type CollapsiblePanelProps = Collapsible.Panel.Props & {
  padding?: keyof Space;
}
