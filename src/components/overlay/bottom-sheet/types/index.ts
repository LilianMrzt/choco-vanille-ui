import type { Drawer } from '@base-ui/react/drawer'

import type BottomSheet from '@components/overlay/bottom-sheet/BottomSheet.tsx'

/** The sheet always opens from the bottom and dismisses by swiping down. */
export type BottomSheetProps = Omit<Drawer.Root.Props, 'swipeDirection'>

export type BottomSheetCompound = typeof BottomSheet
