import type { ComponentProps } from 'react'
import type { BottomSheet, BottomSheetHeaderProps, BottomSheetRadioGroupProps } from '@components/overlay/bottom-sheet'

export type BottomSheetPlaygroundArgs = ComponentProps<typeof BottomSheet> & {
  triggerLabel?: string;
  showHandle?: boolean;
  showHeader?: boolean;
  title?: string;
  titleAs?: BottomSheetHeaderProps['titleAs'];
  contentLabel?: string;
  description?: string;
  itemLabel?: string;
  itemDestructive?: boolean;
  itemDisabled?: boolean;
  itemCloseOnClick?: boolean;
  showRadioGroup?: boolean;
  radioItemLabel?: string;
  radioValue?: 'original' | 'compressed';
  radioDisabled?: boolean;
  onRadioValueChange?: BottomSheetRadioGroupProps['onValueChange'];
  showSeparator?: boolean;
  closeLabel?: string;
};
