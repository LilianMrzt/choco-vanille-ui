import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { memo, useCallback, type FC } from 'react'

import { BOTTOM_SHEET_RADIO_GROUP_STYLES } from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-group/BottomSheetRadioGroup.css.ts'
import type { BottomSheetRadioGroupProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-group/types'
import { cn } from '@utils/cn.ts'

/**
 * Groups `BottomSheet.RadioItem` rows so only one can be selected at a time.
 * Name the group with `aria-label` or `aria-labelledby`.
 */
const BottomSheetRadioGroup: FC<BottomSheetRadioGroupProps> = memo(({
    className,
    onValueChange,
    ...props
}) => {
    const handleValueChange = useCallback(
        (...args: Parameters<NonNullable<BottomSheetRadioGroupProps['onValueChange']>>) => {
            onValueChange?.(...args)
        },
        [onValueChange],
    )

    return (
        <BaseRadioGroup
            className={cn(BOTTOM_SHEET_RADIO_GROUP_STYLES.root, className)}
            onValueChange={handleValueChange}
            {...props}
        />
    )
})

BottomSheetRadioGroup.displayName = 'BottomSheet.RadioGroup'

export default BottomSheetRadioGroup
