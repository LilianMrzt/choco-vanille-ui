import type { FC } from 'react'

import type PopoverContent from '@components/overlay/popover/components/content/PopoverContent.tsx'
import type PopoverItem from '@components/overlay/popover/components/item/PopoverItem.tsx'
import type PopoverTrigger from '@components/overlay/popover/components/trigger/PopoverTrigger.tsx'
import type { PopoverProps } from '@components/overlay/popover/types/Popover.props.ts'

export type PopoverCompound = FC<PopoverProps> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
  Item: typeof PopoverItem;
};
