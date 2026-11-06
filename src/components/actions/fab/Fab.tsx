import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { FAB_STYLES } from '@components/actions/fab/Fab.css.ts'
import { FAB_POSITIONS } from '@components/actions/fab/constants'
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'
import type { FabProps } from '@components/actions/fab/types'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * A viewport-pinned action button. An icon-only Fab requires an accessible
 * name; providing a label renders an extended button. Native button attributes
 * and the ref are forwarded to the button.
 * @param props - Fab options and native button attributes.
 * @param props.color - Semantic color intent; defaults to primary.
 * @param props.size - Size preset; defaults to md.
 * @param props.position - Viewport position; defaults to bottom-end.
 * @param props.icon - Decorative SVG component.
 * @param props.className - Additional class for the button.
 * @returns The floating action button.
 * @example
 * ```tsx
 * <Fab icon={SearchIcon} aria-label="Search" />
 * ```
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
