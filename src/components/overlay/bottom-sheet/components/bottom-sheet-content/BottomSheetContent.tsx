import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { memo, type FC } from 'react'

import { BOTTOM_SHEET_STYLES } from '@components/overlay/bottom-sheet/BottomSheet.css.ts'
import type { BottomSheetContentProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-content/types'
import { cn } from '@utils/cn.ts'

/**
 * The sheet panel rendered inside a portal, anchored to the bottom of the
 * viewport. Includes the backdrop, the drag handle and a scrollable content
 * area. The sheet can be dismissed by swiping down, pressing `Escape` or
 * tapping the backdrop.
 *
 * Width and height props apply to the panel. The default maximum width is
 * 40rem and maximum height is `calc(100dvh - 3rem)`; override them explicitly
 * when needed. The `style` prop takes precedence over dimension props.
 */
const BottomSheetContent: FC<BottomSheetContentProps> = memo(({
    className,
    showHandle = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    defaultAriaLabel = 'Bottom sheet',
    children,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    style,
    ...props
}) => {
    // A role="dialog" element must have an accessible name. Base UI wires
    // `aria-labelledby` to the `BottomSheet.Header` title, which takes
    // precedence over the `aria-label` fallback. The key is only forwarded when
    // set so it never clears Base UI's own value.
    const accessibleName = ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)
    const labelledByProps = ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : {}
    const dimensions = {
        ...(width === undefined ? {} : { width }),
        ...(minWidth === undefined ? {} : { minWidth }),
        ...(maxWidth === undefined ? {} : { maxWidth }),
        ...(height === undefined ? {} : { height }),
        ...(minHeight === undefined ? {} : { minHeight }),
        ...(maxHeight === undefined ? {} : { maxHeight }),
    }
    const panelStyle: BottomSheetContentProps['style'] = typeof style === 'function'
        ? (state) => ({ ...dimensions, ...style(state) })
        : { ...dimensions, ...style }

    return (
        <BaseDrawer.Portal>
            <BaseDrawer.Backdrop className={BOTTOM_SHEET_STYLES.backdrop} />
            <BaseDrawer.Viewport className={BOTTOM_SHEET_STYLES.viewport}>
                <BaseDrawer.Popup
                    className={cn(BOTTOM_SHEET_STYLES.popup, className)}
                    aria-label={accessibleName}
                    style={panelStyle}
                    {...labelledByProps}
                    {...props}
                >
                    {showHandle && (
                        <div
                            aria-hidden
                            className={BOTTOM_SHEET_STYLES.handle}
                        />
                    )}
                    <BaseDrawer.Content className={BOTTOM_SHEET_STYLES.content}>
                        {children}
                    </BaseDrawer.Content>
                </BaseDrawer.Popup>
            </BaseDrawer.Viewport>
        </BaseDrawer.Portal>
    )
})

BottomSheetContent.displayName = 'BottomSheet.Content'

export default BottomSheetContent
