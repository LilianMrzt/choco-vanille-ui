import type * as React from 'react'
import type * as RadixSwitch from '@radix-ui/react-switch'

import type { SwitchSize } from '@components/forms/switch/types/Switch.types.ts'

export type SwitchProps = React.ComponentPropsWithoutRef<
  typeof RadixSwitch.Root
> & {
  /** Optional text label rendered beside the switch. When provided, `id` is used to associate the label. */
  label?: string;
  /** Optional helper text rendered below the switch. Hidden when `error` is provided. */
  helperText?: string;
  /** Error message rendered below the switch. When set, the switch is styled in its error state. */
  error?: string;
  /** Visual size of the switch. Defaults to `md`. */
  size?: SwitchSize;
};
