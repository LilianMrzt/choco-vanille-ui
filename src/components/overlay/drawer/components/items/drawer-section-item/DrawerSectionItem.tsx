import {
    useCallback,
    useId,
    useMemo,
    useState,
    type FC,
    type KeyboardEvent,
} from 'react'

import { Icon } from '@components/foundation/icon'
import {
    DRAWER_ITEM_SIZE_TO_ICON_SIZE,
    DRAWER_ITEM_STYLES,
    DrawerItemTooltip,
    useDrawerItemState,
} from '@components/overlay/drawer/components/items/drawer-item'
import type { DrawerSectionItemProps } from '@components/overlay/drawer/components/items/drawer-section-item/types/DrawerSectionItem.props.ts'
import { DRAWER_MODES } from '@components/overlay/drawer/constants'
import { IconRegistry } from '@constants/icons'

/**
 * An expandable section row rendered inside a `Drawer`.
 *
 * Clicking the header toggles the children. The section also collapses
 * gracefully while the drawer is closing.
 */
const DrawerSectionItem: FC<DrawerSectionItemProps> = ({
    label,
    startIcon,
    children,
    sectionLabel,
    'aria-label': ariaLabel,
    defaultExpanded = false,
    expanded: expandedProp,
    onExpandedChange,
    size = 'md',
    disabled,
    className,
    style,
    ...props
}) => {
    const { open, mode, position } = useDrawerItemState()
    const generatedId = useId()
    const sectionId = `${generatedId}-section`
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
    const isControlled = expandedProp !== undefined
    const expanded = isControlled ? expandedProp : internalExpanded
    const resolvedIconSize = DRAWER_ITEM_SIZE_TO_ICON_SIZE[size]
    const state = open ? 'open' : 'closed'
    const isMiniCollapsed = mode === DRAWER_MODES.mini && !open

    const handleToggle = useCallback(() => {
        const next = !expanded
        if (!isControlled) {
            setInternalExpanded(next)
        }
        onExpandedChange?.(next)
    }, [expanded, isControlled, onExpandedChange])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleToggle()
            }
        },
        [handleToggle],
    )

    const headerAttributes = useMemo(
        () => ({
            'data-state': state,
            'data-mode': mode,
            'data-position': position,
        }),
        [state, mode, position],
    )

    const header = (
        <button
            type={'button'}
            disabled={disabled}
            aria-expanded={expanded}
            aria-controls={sectionId}
            aria-label={isMiniCollapsed ? (ariaLabel ?? label) : ariaLabel}
            className={DRAWER_ITEM_STYLES.recipe({ size })}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            {...headerAttributes}
            {...props}
        >
            <Icon
                icon={startIcon}
                size={resolvedIconSize}
                className={DRAWER_ITEM_STYLES.icon}
            />
            {!isMiniCollapsed && (
                <span
                    className={DRAWER_ITEM_STYLES.label}
                    data-state={state}
                    data-mode={mode}
                >
                    {label}
                </span>
            )}
            {!isMiniCollapsed && (
                <Icon
                    icon={IconRegistry.chevronDown}
                    size={resolvedIconSize}
                    className={DRAWER_ITEM_STYLES.chevron}
                    data-expanded={expanded}
                    data-state={state}
                    data-mode={mode}
                    aria-hidden
                />
            )}
        </button>
    )

    return (
        <div
            className={className}
            style={style}
        >
            <DrawerItemTooltip content={label}>
                {header}
            </DrawerItemTooltip>
            <div
                id={sectionId}
                role={'region'}
                aria-label={sectionLabel ?? label}
                aria-hidden={!expanded}
                className={DRAWER_ITEM_STYLES.sectionContent}
                data-state={expanded ? 'open' : 'closed'}
                data-drawer-state={open ? undefined : 'closed'}
                data-mode={mode}
            >
                <div className={DRAWER_ITEM_STYLES.sectionChildren}>{children}</div>
            </div>
        </div>
    )
}

DrawerSectionItem.displayName = 'Drawer.SectionItem'

export default DrawerSectionItem
