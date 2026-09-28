import type { Drawer } from '@base-ui/react/drawer'

/**
 * Props for the root `BottomSheet` wrapper.
 *
 * Accepts the Base UI Drawer root contract (`open`, `defaultOpen`,
 * `onOpenChange`, `modal`, …). The sheet always attaches to the bottom edge and
 * is dismissed by swiping down, so `swipeDirection` is not configurable.
 */
export type BottomSheetProps = Omit<Drawer.Root.Props, 'swipeDirection'>
