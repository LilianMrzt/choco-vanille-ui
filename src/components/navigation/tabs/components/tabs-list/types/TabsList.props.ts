import type * as React from 'react'
import type * as RadixTabs from '@radix-ui/react-tabs'

import type { TabsVariant } from '@components/navigation/tabs/context/TabsVariant.context.ts'

export type TabsListProps = React.ComponentPropsWithRef<typeof RadixTabs.List> & {
  /** Visual style shared with all `Tabs.Trigger` children. @default 'default' */
  variant?: TabsVariant;
  /** Shows a bottom divider under the list (only visible on the `default` variant). @default false */
  bordered?: boolean;
}
