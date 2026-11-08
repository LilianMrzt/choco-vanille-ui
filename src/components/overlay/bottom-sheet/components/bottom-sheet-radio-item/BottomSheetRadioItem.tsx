import { CHECK_ICON as CheckIcon } from '@constants/icon-registry'
import { Radio } from '@base-ui/react/radio'
import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { BOTTOM_SHEET_RADIO_ITEM_STYLES } from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-item/BottomSheetRadioItem.css.ts'
import type { BottomSheetRadioItemProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-item/types'
import { cn } from '@utils/cn.ts'

/**
 * A selectable option row inside a `BottomSheet.RadioGroup`.
 * Shows a check mark at the end of the row when selected.
 */
const BottomSheetRadioItem: FC<BottomSheetRadioItemProps> = memo(({
    className,
    label,
    startIcon,
    ...props
}) => (
    <Radio.Root
        className={cn(
            BOTTOM_SHEET_RADIO_ITEM_STYLES.item.root,
            BOTTOM_SHEET_RADIO_ITEM_STYLES.root,
            className,
        )}
        {...props}
    >
        {startIcon && (
            <span className={BOTTOM_SHEET_RADIO_ITEM_STYLES.item.icon}>
                <Icon
                    icon={startIcon}
                    size={14}
                />
            </span>
        )}
        <Typography
            as={'span'}
            variant={'span'}
            maxLines={1}
            className={BOTTOM_SHEET_RADIO_ITEM_STYLES.item.label}
        >
            {label}
        </Typography>
        <Radio.Indicator
            className={cn(
                BOTTOM_SHEET_RADIO_ITEM_STYLES.item.icon,
                BOTTOM_SHEET_RADIO_ITEM_STYLES.indicator,
            )}
        >
            <Icon
                icon={CheckIcon}
                size={14}
            />
        </Radio.Indicator>
    </Radio.Root>
))

BottomSheetRadioItem.displayName = 'BottomSheet.RadioItem'

export default BottomSheetRadioItem
