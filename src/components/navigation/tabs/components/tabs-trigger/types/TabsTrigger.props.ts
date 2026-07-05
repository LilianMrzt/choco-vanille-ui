import type * as React from 'react'
import type * as RadixTabs from '@radix-ui/react-tabs'

export type TabsTriggerProps = React.ComponentPropsWithRef<typeof RadixTabs.Trigger> & {
  /** Overrides the default content-based (`fit-content`) width of the trigger. */
  width?: React.CSSProperties['width'];
}
