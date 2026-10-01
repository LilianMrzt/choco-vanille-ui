import { Radio } from '@base-ui/react/radio'
import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { BOTTOM_SHEET_ITEM_STYLES } from '@components/overlay/bottom-sheet/components/_shared/styles/BottomSheetItem.css.ts'
import { BOTTOM_SHEET_RADIO_ITEM_STYLES } from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-item/styles/BottomSheetRadioItem.css.ts'
import type { BottomSheetRadioItemProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-item/types/BottomSheetRadioItem.props.ts'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
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
            BOTTOM_SHEET_ITEM_STYLES.root,
            BOTTOM_SHEET_RADIO_ITEM_STYLES.root,
            className,
        )}
        {...props}
    >
        {startIcon && (
            <span className={BOTTOM_SHEET_ITEM_STYLES.icon}>
                <Icon
                    icon={startIcon}
                    size={'sm'}
                />
            </span>
        )}
        <Typography
            as={'span'}
            variant={'span'}
            maxLines={1}
            className={BOTTOM_SHEET_ITEM_STYLES.label}
        >
            {label}
        </Typography>
        <Radio.Indicator
            className={cn(
                BOTTOM_SHEET_ITEM_STYLES.icon,
                BOTTOM_SHEET_RADIO_ITEM_STYLES.indicator,
            )}
        >
            <Icon
                icon={CheckIcon}
                size={'sm'}
            />
        </Radio.Indicator>
    </Radio.Root>
))

BottomSheetRadioItem.displayName = 'BottomSheet.RadioItem'

export default BottomSheetRadioItem
