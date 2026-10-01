import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { FAB_STYLES } from '@components/actions/fab/styles/Fab.css.ts'
import { FAB_POSITIONS } from '@components/actions/fab/constants'
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'
import type { FabProps } from '@components/actions/fab/types/Fab.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * Floating action button pinned to the viewport for the screen's primary action.
 * Renders a round icon-only button (requires `aria-label`) or, when a `label`
 * is provided, an extended button with the icon before the text. Supports
 * semantic `color`, `size` (sm|md|lg) and `position` (bottom-end|bottom-start|bottom-center).
 */
const Fab: FC<FabProps> = ({
    color,
    size = BUTTON_SIZES.md,
    position = FAB_POSITIONS.bottomEnd,
    icon,
    className,
    ...props
}) => {
    const extended = props.label !== undefined
    const fabClassName = cn(FAB_STYLES.recipe({ position, size, extended }), className)

    if (props.label !== undefined) {
        return (
            <Button
                {...props}
                label={props.label}
                variant={BUTTON_VARIANTS.contained}
                color={color}
                size={size}
                startIcon={icon}
                className={fabClassName}
            />
        )
    }

    return (
        <IconButton
            {...props}
            variant={BUTTON_VARIANTS.contained}
            color={color}
            size={size}
            icon={icon}
            className={fabClassName}
        />
    )
}

Fab.displayName = 'Fab'

export default Fab
