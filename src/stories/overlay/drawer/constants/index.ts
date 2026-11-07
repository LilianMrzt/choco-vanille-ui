import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import type { DrawerMode, DrawerPosition, DrawerSize } from '@components/overlay/drawer'
import { DRAWER_MODES_ARRAY, DRAWER_POSITIONS_ARRAY, DRAWER_SIZES_ARRAY } from '@components/overlay/drawer/constants'
import { DRAWER_ITEM_COLORS_ARRAY, DRAWER_ITEM_VARIANTS } from '@components/overlay/drawer/components/items/_shared/constants'
import { lightColors } from '@theme/tokens/colors/lightColors.const.ts'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'
import type { DrawerPlaygroundArgs } from '@stories/overlay/drawer/types'

export const APPEARANCE_VARIANTS = Object.values(DRAWER_ITEM_VARIANTS)
export const APPEARANCE_COLORS = DRAWER_ITEM_COLORS_ARRAY

export const ARG_TYPES = {
    open: {
        control: 'boolean',
        table: { category: 'Drawer' },
    },
    defaultOpen: {
        control: false,
        description: 'Initial uncontrolled state; these examples use controlled open.',
        table: { category: 'Drawer' },
    },
    onOpenChange: { control: false, description: 'Requested open state; a callback requires consumer code.' },
    mode: {
        control: 'select',
        options: DRAWER_MODES_ARRAY,
        table: { category: 'Drawer' },
    },
    position: {
        control: 'select',
        options: DRAWER_POSITIONS_ARRAY,
        table: { category: 'Drawer' },
    },
    size: {
        control: 'select',
        options: DRAWER_SIZES_ARRAY,
        table: { category: 'Drawer' },
    },
    withBackdrop: {
        control: 'boolean',
        table: { category: 'Drawer' },
    },
    collapsedWidth: {
        control: 'text',
        table: { category: 'Drawer' },
    },
    backgroundColor: {
        control: 'select',
        options: [undefined, ...getColorEntries(lightColors).map(([name]) => name)],
        table: { category: 'Drawer' },
    },
    showHeader: {
        control: 'boolean',
        table: { category: 'Drawer.Header' },
    },
    showFooter: {
        control: 'boolean',
        table: { category: 'Drawer.Footer' },
    },
    showNavigation: {
        control: 'boolean',
        table: { category: 'Drawer.Body' },
    },
    showSettings: {
        control: 'boolean',
        table: { category: 'Drawer.Body' },
    },
    navigationTitle: {
        control: 'text',
        table: { category: 'Drawer.Section' },
    },
    settingsTitle: {
        control: 'text',
        table: { category: 'Drawer.Section' },
    },
    firstNavItemLabel: {
        control: 'text',
        table: { category: 'Drawer.NavItem' },
    },
    secondNavItemLabel: {
        control: 'text',
        table: { category: 'Drawer.NavItem' },
    },
    thirdNavItemLabel: {
        control: 'text',
        table: { category: 'Drawer.NavItem' },
    },
    fourthNavItemLabel: {
        control: 'text',
        table: { category: 'Drawer.NavItem' },
    },
    navItemActive: {
        control: 'boolean',
        table: { category: 'Drawer.NavItem' },
    },
    navItemDisabled: {
        control: 'boolean',
        table: { category: 'Drawer.NavItem' },
    },
    navItemHideTooltip: {
        control: 'boolean',
        table: { category: 'Drawer.NavItem' },
    },
    navItemVariant: {
        control: 'select',
        options: ['default', 'outlined'],
        table: { category: 'Drawer.NavItem' },
    },
    navItemColor: {
        control: 'select',
        options: DRAWER_ITEM_COLORS_ARRAY,
        table: { category: 'Drawer.NavItem' },
    },
    sectionItemLabel: {
        control: 'text',
        table: { category: 'Drawer.SectionItem' },
    },
    sectionItemDefaultExpanded: {
        control: 'boolean',
        description: 'Initial group expansion; this item remounts when the value changes.',
        table: { category: 'Drawer.SectionItem' },
    },
    sectionItemDisabled: {
        control: 'boolean',
        table: { category: 'Drawer.SectionItem' },
    },
    sectionItemHideTooltip: {
        control: 'boolean',
        table: { category: 'Drawer.SectionItem' },
    },
    sectionItemColor: {
        control: 'select',
        options: DRAWER_ITEM_COLORS_ARRAY,
        table: { category: 'Drawer.SectionItem' },
    },
    actionItemHideTooltip: {
        control: 'boolean',
        table: { category: 'Drawer.ActionItem' },
    },
} satisfies NonNullable<Meta<DrawerPlaygroundArgs>['argTypes']>

export const DEFAULT_ARGS = {
    open: false,
    onOpenChange: fn(),
    mode: 'portal' as DrawerMode,
    position: 'left' as DrawerPosition,
    size: 'md' as DrawerSize,
    withBackdrop: true,
    collapsedWidth: '3.875rem',
    showHeader: true,
    showFooter: true,
    showNavigation: true,
    showSettings: true,
    navigationTitle: 'Navigation',
    settingsTitle: 'Settings',
    firstNavItemLabel: 'Dashboard',
    secondNavItemLabel: 'Team',
    thirdNavItemLabel: 'Profile',
    fourthNavItemLabel: 'Billing',
    navItemActive: true,
    navItemDisabled: false,
    navItemHideTooltip: false,
    navItemVariant: 'default',
    navItemColor: 'primary',
    sectionItemLabel: 'Section item ',
    sectionItemDefaultExpanded: true,
    sectionItemDisabled: false,
    sectionItemHideTooltip: false,
    sectionItemColor: 'primary',
    actionItemHideTooltip: false,
} satisfies NonNullable<Meta<DrawerPlaygroundArgs>['args']>
