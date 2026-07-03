import type { FC } from 'react'

import type PopoverAnchor from '@components/overlay/popover/components/anchor/popover-anchor/PopoverAnchor.tsx'
import type PopoverContent from '@components/overlay/popover/components/content/popover-content/PopoverContent.tsx'
import type PopoverTrigger from '@components/overlay/popover/components/trigger/popover-trigger/PopoverTrigger.tsx'
import type { PopoverProps } from '@components/overlay/popover/types/Popover.props.ts'

export type PopoverCompound = FC<PopoverProps> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
  Anchor: typeof PopoverAnchor;
};
