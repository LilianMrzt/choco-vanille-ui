import { memo, type FC } from 'react'

import { Box } from '@components/layout/box'
import { DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'
import { DRAWER_COLLAPSIBLE_STYLES } from '@components/overlay/drawer/components/items/drawer-collapsible/DrawerCollapsible.css.ts'
import { useDrawerCollapsible } from '@components/overlay/drawer/components/items/drawer-collapsible/hooks/use-drawer-collapsible/useDrawerCollapsible.hook.tsx'
import type { DrawerCollapsibleProps } from '@components/overlay/drawer/components/items/drawer-collapsible/types'
import { Flex, Grid, Separator, Tooltip } from '@components'
import {
    DRAWER_COLLAPSIBLE_SEPARATOR_PADDING_LEFT,
    DRAWER_COLLAPSIBLE_SEPARATOR_PADDING_RIGHT,
} from '@components/overlay/drawer/components/items/drawer-collapsible/constants'
import { useTransitionRender } from '@hooks/use-transition-render/useTransitionRender.hook.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * An expandable group of drawer items, independent of `Drawer.Section`.
 *
 * Clicking the header toggles the children. The expanded state is
 * independent of the drawer open/close state to avoid unwanted transitions.
 * Native button attributes target the trigger; className and style target the group.
 * @param props - Collapsible content and trigger attributes.
 * @param props.label - Visible trigger label and collapsed accessible name.
 * @param props.startIcon - Decorative leading local Iconify data.
 * @param props.endIcon - Optional decorative trailing local Iconify data.
 * @param props.children - Content hidden and made inert while collapsed.
 * @param props.trailing - Optional trailing trigger content.
 * @param props.hideTooltip - Suppresses the mini-mode tooltip; defaults to false.
 * @param props.sectionLabel - Accessible content region name; defaults to label.
 * @param props["aria-label"] - Optional trigger accessible name.
 * @param props.defaultExpanded - Initial uncontrolled expansion; defaults to false.
 * @param props.expanded - Controlled expansion state.
 * @param props.onExpandedChange - Receives the requested expansion state.
 * @param props.color - Trigger palette; defaults to primary.
 * @param props.disabled - Prevents trigger activation.
 * @param props.className - Additional group class.
 * @param props.style - Group inline style overrides.
 * @returns The expandable item group.
 * @example
 * <Drawer.Collapsible label="Account" startIcon={UserIcon}>
 *     <Drawer.NavItem label="Profile" href="/profile" startIcon={UserIcon} />
 * </Drawer.Collapsible>
 */
const DrawerCollapsible: FC<DrawerCollapsibleProps> = memo(
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
      useDrawerCollapsible({
          defaultExpanded,
          expanded: expandedProp,
          onExpandedChange,
          disabled,
      })

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
                        className={DRAWER_COLLAPSIBLE_STYLES.recipe({ color })}
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
                    className={DRAWER_COLLAPSIBLE_STYLES.sectionContent}
                    data-state={showChildren ? 'open' : 'closed'}
                >
                    <Flex
                        flexDirection={'row'}
                        minHeight={0}
                        minWidth={0}
                        paddingBottom={showChildren ? 4 : 0}
                        overflow={showChildren ? 'visible' : 'hidden'}
                        gap={0}
                        className={DRAWER_COLLAPSIBLE_STYLES.sectionInner}
                    >
                        {shouldRenderSeparator && (
                            <Separator
                                orientation={'vertical'}
                                data-state={isSeparatorFadingIn ? 'open' : 'closed'}
                                marginRight={
                                    isSeparatorFadingIn
                                        ? DRAWER_COLLAPSIBLE_SEPARATOR_PADDING_RIGHT
                                        : 0
                                }
                                marginLeft={
                                    isSeparatorFadingIn
                                        ? DRAWER_COLLAPSIBLE_SEPARATOR_PADDING_LEFT
                                        : 0
                                }
                                className={DRAWER_COLLAPSIBLE_STYLES.sectionSeparator}
                            />
                        )}
                        <Flex
                            flexDirection={'column'}
                            minHeight={0}
                            gap={4}
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

DrawerCollapsible.displayName = 'Drawer.Collapsible'

export default DrawerCollapsible
