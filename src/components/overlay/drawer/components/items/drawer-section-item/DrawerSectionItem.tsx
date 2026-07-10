import { type FC } from 'react'

import { Box } from '@components/layout/box'
import { DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'
import { DRAWER_SECTION_ITEM_STYLES } from '@components/overlay/drawer/components/items/drawer-section-item/styles/DrawerSectionItem.css.ts'
import { useDrawerSectionItem } from '@components/overlay/drawer/components/items/drawer-section-item/hooks/use-drawer-section-item/useDrawerSectionItem.hook.tsx'
import type { DrawerSectionItemProps } from '@components/overlay/drawer/components/items/drawer-section-item/types/DrawerSectionItem.props.ts'
import { Flex, Grid } from '@components'

/**
 * An expandable section row rendered inside a `Drawer`.
 *
 * Clicking the header toggles the children. The expanded state is
 * independent of the drawer open/close state to avoid unwanted transitions.
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
    const {
        itemAttributes,
        sectionId,
        expanded,
        chevron,
        handleToggle,
        handleKeyDown,
    } = useDrawerSectionItem({
        defaultExpanded,
        expanded: expandedProp,
        onExpandedChange,
        size,
        disabled,
    })

    return (
        <Box
            className={className}
            style={style}
        >
            <button
                type={'button'}
                disabled={disabled}
                aria-expanded={expanded}
                aria-controls={sectionId}
                aria-label={ariaLabel}
                className={DRAWER_SECTION_ITEM_STYLES.recipe({ size })}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                {...itemAttributes}
                {...props}
            >
                <DrawerItemContent
                    label={label}
                    startIcon={startIcon}
                    size={size}
                    trailing={chevron}
                />
            </button>
            <Grid
                id={sectionId}
                role={'region'}
                aria-label={sectionLabel ?? label}
                aria-hidden={!expanded}
                gridTemplateRows={expanded ? '1fr' : '0fr'}
                overflow={'hidden'}
                paddingTop={expanded ? 'xs' : 'none'}
                className={DRAWER_SECTION_ITEM_STYLES.sectionContent}
                data-state={expanded ? 'open' : 'closed'}
            >
                <Flex
                    flexDirection={'column'}
                    minHeight={0}
                    paddingLeft={'lg'}
                    paddingRight={'xs'}
                    paddingBottom={'xs'}
                    overflow={'hidden'}
                    gap={'none'}
                >
                    {children}
                </Flex>
            </Grid>
        </Box>
    )
}

DrawerSectionItem.displayName = 'Drawer.SectionItem'

export default DrawerSectionItem
