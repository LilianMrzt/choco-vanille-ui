import { CHEVRON_RIGHT_ICON as ChevronRightIcon, CLOSE_ICON as CloseIcon, INFO_ICON as InfoIcon, SEARCH_ICON as SearchIcon, USER_ICON as UserIcon } from '@constants/icon-registry'
import { useArgs } from 'storybook/preview-api'
import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { Badge } from '@components/data-display/badge'
import { Flex } from '@components/layout/flex'
import { Drawer } from '@components/overlay/drawer'
import type { DrawerPlaygroundArgs } from '@stories/overlay/drawer/types'

/**
 * Synchronizes the drawer example with Storybook Controls.
 * @internal Storybook-only renderer; not part of the public package API.
 * @returns The controlled drawer example.
 * @example
 * <DrawerExample />
 */
const DrawerExample = () => {
    const [args, updateArgs] = useArgs<DrawerPlaygroundArgs>()
    const {
        mode,
        position,
        size,
        withBackdrop,
        collapsedWidth,
        backgroundColor,
        showHeader,
        showFooter,
        showNavigation,
        showSettings,
        navigationTitle,
        settingsTitle,
        firstNavItemLabel,
        secondNavItemLabel,
        thirdNavItemLabel,
        fourthNavItemLabel,
        navItemActive,
        navItemDisabled,
        navItemHideTooltip,
        navItemVariant,
        navItemColor,
        sectionItemLabel,
        sectionItemDefaultExpanded,
        sectionItemDisabled,
        sectionItemHideTooltip,
        sectionItemColor,
        actionItemHideTooltip,
    } = args
    const open = args.open ?? false
    const setOpen = (nextOpen: boolean) => {
        args.onOpenChange?.(nextOpen)
        updateArgs({ open: nextOpen })
    }
    const isPortal = mode === 'portal'
    const isMini = mode === 'mini'

    return (
        <div style={{ display: 'flex', minHeight: '24rem', maxWidth: '100%', flexWrap: 'wrap' }}>
            <Drawer
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                position={position}
                size={size}
                withBackdrop={withBackdrop}
                collapsedWidth={collapsedWidth}
                backgroundColor={backgroundColor}
            >
                {showHeader && (
                    <Drawer.Header>
                        <IconButton
                            icon={open ? CloseIcon : ChevronRightIcon}
                            aria-label={isPortal ? 'Close drawer' : open ? 'Collapse drawer' : 'Expand drawer'}
                            size={'sm'}
                            onClick={() => setOpen(!open)}
                        />
                    </Drawer.Header>
                )}
                <Drawer.Body
                    as={'nav'}
                    aria-label={'Main navigation'}
                >
                    <Flex
                        flexDirection={'column'}
                        gap={16}
                    >
                        {showNavigation && (
                            <Drawer.Section title={navigationTitle}>
                                <Drawer.NavItem
                                    label={firstNavItemLabel ?? 'Dashboard'}
                                    href={'/dashboard'}
                                    startIcon={UserIcon}
                                    active={navItemActive}
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                                <Drawer.NavItem
                                    label={secondNavItemLabel ?? 'Team'}
                                    href={'/team'}
                                    startIcon={UserIcon}
                                    endIcon={ChevronRightIcon}
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                                <Drawer.NavItem
                                    label={'Messages'}
                                    href={'/messages'}
                                    startIcon={SearchIcon}
                                    trailing={
                                        <Badge
                                            label={'3'}
                                            size={'sm'}
                                            color={'orange'}
                                            borderRadius={6}
                                        />
                                    }
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                            </Drawer.Section>
                        )}
                        {showSettings && (
                            <Drawer.Section title={settingsTitle}>
                                <Drawer.SectionItem
                                    key={String(sectionItemDefaultExpanded)}
                                    label={sectionItemLabel ?? 'Section item'}
                                    startIcon={SearchIcon}
                                    endIcon={InfoIcon}
                                    trailing={
                                        <Badge
                                            label={'Pro'}
                                            size={'sm'}
                                            color={'secondary'}
                                        />
                                    }
                                    defaultExpanded={sectionItemDefaultExpanded}
                                    disabled={sectionItemDisabled}
                                    hideTooltip={sectionItemHideTooltip}
                                    color={sectionItemColor}
                                >
                                    <Drawer.NavItem
                                        label={'Notifications'}
                                        href={'/notifications'}
                                        startIcon={InfoIcon}
                                        trailing={
                                            <Badge
                                                label={'New'}
                                                size={'sm'}
                                                borderRadius={6}
                                                color={'danger'}
                                            />
                                        }
                                        disabled={navItemDisabled}
                                        hideTooltip={navItemHideTooltip}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                    <Drawer.NavItem
                                        label={thirdNavItemLabel ?? 'Profile'}
                                        href={'/profile'}
                                        startIcon={UserIcon}
                                        disabled={navItemDisabled}
                                        hideTooltip={navItemHideTooltip}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                    <Drawer.NavItem
                                        label={fourthNavItemLabel ?? 'Billing'}
                                        href={'/billing'}
                                        startIcon={UserIcon}
                                        disabled={navItemDisabled}
                                        hideTooltip={navItemHideTooltip}
                                        variant={navItemVariant}
                                        color={navItemColor}
                                    />
                                </Drawer.SectionItem>
                                <Drawer.NavItem
                                    label={thirdNavItemLabel ?? 'Profile'}
                                    href={'/profile'}
                                    startIcon={UserIcon}
                                    disabled={navItemDisabled}
                                    hideTooltip={navItemHideTooltip}
                                    variant={navItemVariant}
                                    color={navItemColor}
                                />
                            </Drawer.Section>
                        )}
                    </Flex>
                </Drawer.Body>
                {showFooter && (
                    <Drawer.Footer justifyContent={'start'}>
                        <Drawer.Section title={'Actions'}>
                            <Drawer.ActionItem
                                label={'Sign out'}
                                startIcon={CloseIcon}
                                color={'danger'}
                                hideTooltip={actionItemHideTooltip}
                            />
                        </Drawer.Section>
                    </Drawer.Footer>
                )}
            </Drawer>

            <div style={{ padding: '1rem' }}>
                <Button
                    label={
                        isPortal
                            ? open
                                ? 'Close drawer'
                                : 'Open drawer'
                            : isMini
                                ? open
                                    ? 'Collapse mini'
                                    : 'Expand mini'
                                : open
                                    ? 'Collapse drawer'
                                    : 'Expand drawer'
                    }
                    variant={'contained'}
                    color={'primary'}
                    onClick={() => setOpen(!open)}
                />
            </div>
        </div>
    )
}

export default DrawerExample
