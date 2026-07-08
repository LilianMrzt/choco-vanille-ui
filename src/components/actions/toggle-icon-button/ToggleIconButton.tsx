import { Toggle as BaseToggle } from '@base-ui/react/toggle'

import { TOGGLE_ICON_BUTTON_STYLES } from '@components/actions/toggle-icon-button/styles/ToggleIconButton.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { Icon } from '@components/foundation/icon'
import type { ToggleIconButtonProps } from '@components/actions/toggle-icon-button/types/ToggleIconButton.props.ts'
import { TOGGLE_ICON_BUTTON_SIZE_TO_ICON_SIZE } from '@components/actions/toggle-icon-button/constants'
import { ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const ToggleIconButton: FC<ToggleIconButtonProps> = ({
    variant,
    color,
    size = ICON_BUTTON_SIZES.md,
    radius,
    className,
    icon,
    ref,
    ...props
}) => {
    const iconSize = TOGGLE_ICON_BUTTON_SIZE_TO_ICON_SIZE[size]

    return (
        <BaseToggle
            ref={ref}
            className={cn(
                TOGGLE_ICON_BUTTON_STYLES.recipe({ variant, color, size, radius }),
                className,
            )}
            {...props}
        >
            <Icon
                icon={icon}
                size={iconSize}
                className={BUTTON_SHARED_STYLES.icon}
            />
        </BaseToggle>
    )
}

ToggleIconButton.displayName = 'ToggleIconButton'

export default ToggleIconButton
