import { memo, type FC } from 'react'

import { Box } from '@components/layout/box'
import { DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'
import { DRAWER_SECTION_ITEM_STYLES } from '@components/overlay/drawer/components/items/drawer-section-item/DrawerSectionItem.css.ts'
import { useDrawerSectionItem } from '@components/overlay/drawer/components/items/drawer-section-item/hooks/use-drawer-section-item/useDrawerSectionItem.hook.tsx'
import type { DrawerSectionItemProps } from '@components/overlay/drawer/components/items/drawer-section-item/types'
import { Flex, Grid, Separator, Tooltip } from '@components'
import {
    DRAWER_SECTION_ITEM_SEPARATOR_PADDING_LEFT,
    DRAWER_SECTION_ITEM_SEPARATOR_PADDING_RIGHT,
} from '@components/overlay/drawer/components/items/drawer-section-item/constants'
import { useTransitionRender } from '@hooks/use-transition-render/useTransitionRender.hook.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * An expandable section row rendered inside a `Drawer`.
 *
 * Clicking the header toggles the children. The expanded state is
 * independent of the drawer open/close state to avoid unwanted transitions.
 */
const DrawerSectionItem: FC<DrawerSectionItemProps> = memo(
    ({
        label,
        startIcon,
        endIcon,
        children,
        trailing,
        hideTooltip = false,
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
        const { open, itemAttributes, sectionId, expanded, handleToggle } =
      useDrawerSectionItem({
          defaultExpanded,
          expanded: expandedProp,
          onExpandedChange,
          disabled,
      })

        // Children are only shown when the section is expanded.
        const showChildren = expanded

        // useTransitionRender drives the separator mount/unmount so its margin
        // transition plays fully before it is removed from the DOM (and mounts
        // at margin 0 before animating to its full values).
        const {
            shouldRenderContent: shouldRenderSeparator,
            isFadingIn: isSeparatorFadingIn,
        } = useTransitionRender(open, vars.duration.normal)

        return (
            <Box
                className={className}
                style={style}
            >
                <Tooltip
                    position={'right'}
                    content={label}
                    disabled={open || hideTooltip}
                >
                    <button
                        type={'button'}
                        disabled={disabled}
                        aria-expanded={showChildren}
                        aria-controls={sectionId}
                        aria-label={ariaLabel ?? (open ? undefined : label)}
                        className={DRAWER_SECTION_ITEM_STYLES.recipe({ color })}
                        onClick={handleToggle}
                        {...itemAttributes}
                        {...props}
                    >
                        <DrawerItemContent
                            label={label}
                            startIcon={startIcon}
                            endIcon={endIcon}
                            trailing={trailing}
                            endChevronIcon
                            expanded={expanded}
                        />
                    </button>
                </Tooltip>

                <Grid
                    id={sectionId}
                    role={'region'}
                    aria-label={sectionLabel ?? label}
                    aria-hidden={!showChildren}
                    inert={!showChildren}
                    gridTemplateRows={showChildren ? '1fr' : '0fr'}
                    className={DRAWER_SECTION_ITEM_STYLES.sectionContent}
                    data-state={showChildren ? 'open' : 'closed'}
                >
                    <Flex
                        flexDirection={'row'}
                        minHeight={0}
                        minWidth={0}
                        paddingBottom={showChildren ? 4 : 0}
                        overflow={showChildren ? 'visible' : 'hidden'}
                        gap={0}
                        className={DRAWER_SECTION_ITEM_STYLES.sectionInner}
                    >
                        {shouldRenderSeparator && (
                            <Separator
                                orientation={'vertical'}
                                data-state={isSeparatorFadingIn ? 'open' : 'closed'}
                                marginRight={
                                    isSeparatorFadingIn
                                        ? DRAWER_SECTION_ITEM_SEPARATOR_PADDING_RIGHT
                                        : 0
                                }
                                marginLeft={
                                    isSeparatorFadingIn
                                        ? DRAWER_SECTION_ITEM_SEPARATOR_PADDING_LEFT
                                        : 0
                                }
                                className={DRAWER_SECTION_ITEM_STYLES.sectionSeparator}
                            />
                        )}
                        <Flex
                            flexDirection={'column'}
                            minHeight={0}
                            gap={0}
                            width={'100%'}
                        >
                            {children}
                        </Flex>
                    </Flex>
                </Grid>
            </Box>
        )
    },
)

DrawerSectionItem.displayName = 'Drawer.SectionItem'

export default DrawerSectionItem
