import { memo, type FC } from 'react'

import { Box } from '@components/layout/box'
import {
    DrawerItemContent,
} from '@components/overlay/drawer/components/items/_shared'
import { DRAWER_SECTION_ITEM_STYLES } from '@components/overlay/drawer/components/items/drawer-section-item/styles/DrawerSectionItem.css.ts'
import { useDrawerSectionItem } from '@components/overlay/drawer/components/items/drawer-section-item/hooks/use-drawer-section-item/useDrawerSectionItem.hook.tsx'
import type { DrawerSectionItemProps } from '@components/overlay/drawer/components/items/drawer-section-item/types/DrawerSectionItem.props.ts'
import { Flex, Grid, Separator } from '@components'
import {
    DRAWER_SECTION_ITEM_SEPARATOR_PADDING_LEFT, DRAWER_SECTION_ITEM_SEPARATOR_PADDING_RIGHT
} from '@components/overlay/drawer/components/items/drawer-section-item/constants'

/**
 * An expandable section row rendered inside a `Drawer`.
 *
 * Clicking the header toggles the children. The expanded state is
 * independent of the drawer open/close state to avoid unwanted transitions.
 */
const DrawerSectionItem: FC<DrawerSectionItemProps> = memo(({
    label,
    startIcon,
    children,
    trailing,
    sectionLabel,
    'aria-label': ariaLabel,
    defaultExpanded = false,
    expanded: expandedProp,
    onExpandedChange,
    size = 'md',
    color = 'primary',
    disabled,
    className,
    style,
    ...props
}) => {
    const {
        itemAttributes,
        sectionId,
        expanded,
        handleToggle,
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
                className={DRAWER_SECTION_ITEM_STYLES.recipe({ size, color })}
                onClick={handleToggle}
                {...itemAttributes}
                {...props}
            >
                <DrawerItemContent
                    label={label}
                    startIcon={startIcon}
                    size={size}
                    trailing={trailing}
                    endChevronIcon
                    expanded={expanded}
                />
            </button>
            <Grid
                id={sectionId}
                role={'region'}
                aria-label={sectionLabel ?? label}
                aria-hidden={!expanded}
                inert={!expanded}
                gridTemplateRows={expanded ? '1fr' : '0fr'}
                className={DRAWER_SECTION_ITEM_STYLES.sectionContent}
                data-state={expanded ? 'open' : 'closed'}
            >
                <Flex
                    flexDirection={'row'}
                    minHeight={0}
                    paddingBottom={'xs'}
                    paddingLeft={DRAWER_SECTION_ITEM_SEPARATOR_PADDING_LEFT[size]}
                    overflow={expanded ? 'visible' : 'hidden'}
                    gap={'none'}
                >
                    <Separator
                        orientation={'vertical'}
                    />
                    <Flex
                        flexDirection={'column'}
                        minHeight={0}
                        paddingLeft={DRAWER_SECTION_ITEM_SEPARATOR_PADDING_RIGHT[size]}
                        gap={'none'}
                        flex={1}
                    >
                        {children}
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    )
})

DrawerSectionItem.displayName = 'Drawer.SectionItem'

export default DrawerSectionItem
