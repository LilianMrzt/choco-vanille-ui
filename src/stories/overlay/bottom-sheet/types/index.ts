import type { ComponentProps } from 'react'
import type { BottomSheet } from '@components/overlay/bottom-sheet'

export type BottomSheetPlaygroundArgs = ComponentProps<typeof BottomSheet> & {
  triggerLabel?: string;
  showHandle?: boolean;
  showHeader?: boolean;
  title?: string;
  description?: string;
  itemLabel?: string;
  itemDestructive?: boolean;
  itemDisabled?: boolean;
  showRadioGroup?: boolean;
  radioItemLabel?: string;
  showSeparator?: boolean;
  closeLabel?: string;
};
