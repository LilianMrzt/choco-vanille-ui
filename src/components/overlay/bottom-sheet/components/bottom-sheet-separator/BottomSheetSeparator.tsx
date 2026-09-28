import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { memo, type FC } from 'react'

import { BOTTOM_SHEET_SEPARATOR_STYLES } from '@components/overlay/bottom-sheet/components/bottom-sheet-separator/styles/BottomSheetSeparator.css.ts'
import type { BottomSheetSeparatorProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-separator/types/BottomSheetSeparator.props.ts'
import { cn } from '@utils/cn.ts'

/** A thin horizontal rule dividing groups of rows in a bottom sheet. */
const BottomSheetSeparator: FC<BottomSheetSeparatorProps> = memo(({ className, ...props }) => (
    <BaseSeparator
        className={cn(BOTTOM_SHEET_SEPARATOR_STYLES.root, className)}
        {...props}
    />
))

BottomSheetSeparator.displayName = 'BottomSheet.Separator'

export default BottomSheetSeparator
