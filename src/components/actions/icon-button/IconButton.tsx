import { ICON_BUTTON_STYLES } from '@components/actions/icon-button/styles/IconButton.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { getButtonLayoutClassName } from '@components/actions/_shared/buttons/utils/buttonLayout.utils.ts'
import { Icon } from '@components/foundation/icon'
import type { IconButtonProps } from '@components/actions/icon-button/types/IconButton.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { ICON_BUTTON_SIZE_TO_ICON_SIZE, ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants'

/**
 * Icon-only action button. Requires `aria-label` for accessibility.
 * Supports `variant` (contained|outlined|ghost), semantic `color`,
 * `size` (xs|sm|md|lg), and a local SVG `icon` component.
 * Square dimensions at a 16px root: xs 24px, sm 28px, md 36px (default), lg 44px.
 * Sizes do not change with viewport or pointer type. Prefer lg for touch-oriented actions.
 */
const IconButton: FC<IconButtonProps> = ({
    variant,
    color,
    size = ICON_BUTTON_SIZES.md,
    className,
    icon,
    children,
    active,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    width,
    alignSelf,
    style,
    ref,
    ...props
}) => {
    const iconSize = ICON_BUTTON_SIZE_TO_ICON_SIZE[size]

    return (
        <button
            ref={ref}
            className={cn(
                ICON_BUTTON_STYLES.recipe({ variant, color, size }),
                getButtonLayoutClassName({ margin, marginTop, marginRight, marginBottom, marginLeft, width, alignSelf }),
                className,
            )}
            style={{ width, alignSelf, ...style }}
            {...props}
            data-active={active ? 'true' : undefined}
        >
            {children ?? (icon ? (
                <Icon
                    icon={icon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            ) : null)}
        </button>
    )
}

IconButton.displayName = 'IconButton'

export default IconButton
