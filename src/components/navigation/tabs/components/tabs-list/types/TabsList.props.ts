import type { Tabs } from '@base-ui/react/tabs'

import type { TabsVariant } from '@components/navigation/tabs/context/TabsVariant.context.ts'

export type TabsListProps = Tabs.List.Props & {
  /** Visual style shared with all `Tabs.Trigger` children. @default 'default' */
  variant?: TabsVariant;
  /** Shows a bottom divider under the list (only visible on the `default` variant). @default false */
  bordered?: boolean;
  /** Whether tabs are activated automatically on focus or manually via Enter/Space. @default 'automatic' */
  activationMode?: 'automatic' | 'manual';
}
