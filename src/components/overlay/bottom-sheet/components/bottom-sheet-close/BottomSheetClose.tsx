import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { memo, type FC } from 'react'

import { BOTTOM_SHEET_CLOSE_STYLES } from '@components/overlay/bottom-sheet/components/bottom-sheet-close/BottomSheetClose.css.ts'
import type { BottomSheetCloseProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-close/types'
import { cn } from '@utils/cn.ts'

/**
 * Closes the bottom sheet when clicked.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the close button.
 */
const BottomSheetClose: FC<BottomSheetCloseProps> = memo(({ children, className, ...props }) => (
    <BaseDrawer.Close
        {...props}
        className={typeof className === 'function'
            ? state => cn(BOTTOM_SHEET_CLOSE_STYLES.root, className(state))
            : cn(BOTTOM_SHEET_CLOSE_STYLES.root, className)}
        render={children}
    />
))

BottomSheetClose.displayName = 'BottomSheet.Close'

export default BottomSheetClose
