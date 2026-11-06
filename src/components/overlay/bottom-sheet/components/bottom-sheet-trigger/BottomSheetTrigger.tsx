import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { memo, type FC } from 'react'

import type { BottomSheetTriggerProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-trigger/types'

/**
 * The element that opens the bottom sheet.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const BottomSheetTrigger: FC<BottomSheetTriggerProps> = memo(({ children, ...props }) => (
    <BaseDrawer.Trigger
        {...props}
        render={children}
    />
))

BottomSheetTrigger.displayName = 'BottomSheet.Trigger'

export default BottomSheetTrigger
