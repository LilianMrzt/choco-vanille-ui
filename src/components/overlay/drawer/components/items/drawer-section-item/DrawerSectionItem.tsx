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
import { useTransitionRender } from '@hooks/use-transition-render/useTransitionRender.hook.ts'
import { vars } from '@theme/contract.css.ts'

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
    color = 'primary',
    disabled,
    className,
    style,
    ...props
}) => {
    const {
        open,
        itemAttributes,
        sectionId,
        expanded,
        handleToggle,
    } = useDrawerSectionItem({
        defaultExpanded,
        expanded: expandedProp,
        onExpandedChange,
        disabled,
    })
    const { shouldRenderContent } = useTransitionRender(open, vars.duration.normal)

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
                aria-label={ariaLabel ?? (shouldRenderContent ? undefined : label)}
                className={DRAWER_SECTION_ITEM_STYLES.recipe({ color })}
                onClick={handleToggle}
                {...itemAttributes}
                {...props}
            >
                <DrawerItemContent
                    label={label}
                    startIcon={startIcon}
                    trailing={trailing}
                    endChevronIcon
                    expanded={expanded}
                    renderContent={shouldRenderContent}
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
                    paddingLeft={DRAWER_SECTION_ITEM_SEPARATOR_PADDING_LEFT}
                    overflow={expanded ? 'visible' : 'hidden'}
                    gap={'none'}
                >
                    <Separator
                        orientation={'vertical'}
                    />
                    <Flex
                        flexDirection={'column'}
                        minHeight={0}
                        paddingLeft={DRAWER_SECTION_ITEM_SEPARATOR_PADDING_RIGHT}
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
