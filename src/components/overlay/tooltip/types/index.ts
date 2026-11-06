import type { ReactElement, ReactNode } from 'react'

import type { OverlayAlign, OverlayPosition, OverlaySide } from '@components/overlay/_shared/types'

/** Side position relative to the trigger. */
export type TooltipSide = OverlaySide
/** Alignment relative to the trigger. */
export type TooltipAlign = OverlayAlign
/** Position combining side and alignment. */
export type TooltipPosition = OverlayPosition

/** Tooltip content, trigger and behavior options. */
export type TooltipProps = Readonly<{
    /** A single focusable trigger element capable of receiving a ref. */
    children: ReactElement
    /** Supplementary tooltip content. */
    content: ReactNode
    /** Combined side and alignment, overriding separate values. */
    position?: TooltipPosition
    /** Side relative to the trigger; defaults to `top`. */
    side?: TooltipSide
    /** Alignment; defaults to `center`. */
    align?: TooltipAlign
    /** Opening delay in milliseconds; defaults to `0`. */
    delayDuration?: number
    /** Suppresses the tooltip. */
    disabled?: boolean
    /** Opens on trigger focus; defaults to `true`. */
    openOnFocus?: boolean
    /** Displays an arrow; defaults to `false`. */
    arrow?: boolean
    /** Clicking the trigger closes the tooltip; defaults to `true`. */
    closeOnClick?: boolean
    /** Additional popup class. */
    className?: string
    /** Controlled open state. */
    open?: boolean
    /** Initial uncontrolled open state. */
    defaultOpen?: boolean
    /** Called with changes to the open state. */
    onOpenChange?: (open: boolean) => void
}>
