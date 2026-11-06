import type { Popover as BasePopover } from '@base-ui/react/popover'

import type Popover from '@components/overlay/popover/Popover.tsx'
import type { OverlayAlign, OverlayPosition, OverlaySide } from '@components/overlay/_shared/types'

/** Props for the Base UI popover root. */
export type PopoverProps = BasePopover.Root.Props
/** Side position relative to the trigger. */
export type PopoverSide = OverlaySide
/** Alignment relative to the trigger. */
export type PopoverAlign = OverlayAlign
/** Position combining side and alignment. */
export type PopoverPosition = OverlayPosition
/** Popover root and compound slots. */
export type PopoverCompound = typeof Popover
