import type { PreviewCard } from '@base-ui/react/preview-card'

import type HoverCard from '@components/overlay/hover-card/HoverCard.tsx'
import type { OverlayAlign, OverlayPosition, OverlaySide } from '@components/overlay/_shared/types'

/** Props for the Base UI preview card root. */
export type HoverCardProps = PreviewCard.Root.Props
/** Side position relative to the trigger. */
export type HoverCardSide = OverlaySide
/** Alignment relative to the trigger. */
export type HoverCardAlign = OverlayAlign
/** Position combining side and alignment. */
export type HoverCardPosition = OverlayPosition
/** Hover card root and slots. */
export type HoverCardCompound = typeof HoverCard
