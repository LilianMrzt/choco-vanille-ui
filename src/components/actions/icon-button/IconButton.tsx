import { ICON_BUTTON_STYLES } from '@components/actions/icon-button/styles/IconButton.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { Icon } from '@components/foundation/icon'
import type { IconButtonProps } from '@components/actions/icon-button/types/IconButton.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { ICON_BUTTON_SIZE_TO_ICON_SIZE, ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants'

/**
 * Icon-only action button. Requires `aria-label` for accessibility.
 * Supports `variant` (contained|outlined|ghost), semantic `color`,
 * `size` (xs|sm|md|lg), and an Iconify `icon` identifier.
 */
const IconButton: FC<IconButtonProps> = ({
    variant,
    color,
    size = ICON_BUTTON_SIZES.md,
    className,
    icon,
    children,
    active,
    ref,
    ...props
}) => {
    const iconSize = ICON_BUTTON_SIZE_TO_ICON_SIZE[size]

    return (
        <button
            ref={ref}
            className={cn(ICON_BUTTON_STYLES.recipe({ variant, color, size }), className)}
            {...props}
            data-active={active ? 'true' : undefined}
        >
            {children ?? (
                <Icon
                    icon={icon as string}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            )}
        </button>
    )
}

IconButton.displayName = 'IconButton'

export default IconButton
