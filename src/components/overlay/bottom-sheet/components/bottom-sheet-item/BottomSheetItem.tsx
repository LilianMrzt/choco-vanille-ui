import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { BOTTOM_SHEET_ITEM_STYLES } from '@components/overlay/bottom-sheet/components/bottom-sheet-item/BottomSheetItem.css.ts'
import type { BottomSheetItemProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-item/types'
import { cn } from '@utils/cn.ts'

/**
 * A full-width, touch-friendly action row inside a bottom sheet.
 * Closes the sheet when activated unless `closeOnClick` is `false`.
 *
 * @example
 * ```tsx
 * <BottomSheet.Item label={'Share'} startIcon={ShareIcon} onClick={share} />
 * ```
 */
const BottomSheetItem: FC<BottomSheetItemProps> = memo(({
    className,
    label,
    startIcon,
    endIcon,
    destructive = false,
    closeOnClick = true,
    type = 'button',
    ...props
}) => {
    const button = (
        <button
            className={cn(
                BOTTOM_SHEET_ITEM_STYLES.root,
                destructive && BOTTOM_SHEET_ITEM_STYLES.destructive,
                className,
            )}
            type={type}
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
            {endIcon && (
                <span className={BOTTOM_SHEET_ITEM_STYLES.icon}>
                    <Icon
                        icon={endIcon}
                        size={'sm'}
                    />
                </span>
            )}
        </button>
    )

    return closeOnClick
        ? <BaseDrawer.Close render={button} />
        : button
})

BottomSheetItem.displayName = 'BottomSheet.Item'

export default BottomSheetItem
