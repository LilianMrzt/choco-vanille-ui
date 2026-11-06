import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { DrawerPlaygroundArgs } from '@stories/overlay/drawer/types'
import template from '@stories/overlay/drawer/utils/create-drawer-source/sources/playground.source.tsx.txt?raw'
import navigation from '@stories/overlay/drawer/utils/create-drawer-source/sources/navigation.source.tsx.txt?raw'
import settings from '@stories/overlay/drawer/utils/create-drawer-source/sources/settings.source.tsx.txt?raw'
import header from '@stories/overlay/drawer/utils/create-drawer-source/sources/header.source.tsx.txt?raw'
import footer from '@stories/overlay/drawer/utils/create-drawer-source/sources/footer.source.tsx.txt?raw'

/**
 * Generates a consumer example from the controlled drawer options.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createDrawerSource('', { args })
 */
export const createDrawerSource = (_source: string, { args }: Readonly<{ args: DrawerPlaygroundArgs }>): string => {
    const values = {
        navigationTitle: JSON.stringify(args.navigationTitle) ?? 'undefined',
        settingsTitle: JSON.stringify(args.settingsTitle) ?? 'undefined',
        first: JSON.stringify(args.firstNavItemLabel ?? 'Dashboard'),
        second: JSON.stringify(args.secondNavItemLabel ?? 'Team'),
        third: JSON.stringify(args.thirdNavItemLabel ?? 'Profile'),
        fourth: JSON.stringify(args.fourthNavItemLabel ?? 'Billing'),
        active: JSON.stringify(args.navItemActive) ?? 'undefined',
        disabled: JSON.stringify(args.navItemDisabled) ?? 'undefined',
        hideTooltip: JSON.stringify(args.navItemHideTooltip) ?? 'undefined',
        variant: JSON.stringify(args.navItemVariant) ?? 'undefined',
        color: JSON.stringify(args.navItemColor) ?? 'undefined',
        sectionLabel: JSON.stringify(args.sectionItemLabel ?? 'Section item'),
        sectionExpanded: JSON.stringify(args.sectionItemDefaultExpanded) ?? 'undefined',
        sectionDisabled: JSON.stringify(args.sectionItemDisabled) ?? 'undefined',
        sectionHideTooltip: JSON.stringify(args.sectionItemHideTooltip) ?? 'undefined',
        sectionColor: JSON.stringify(args.sectionItemColor) ?? 'undefined',
        actionHideTooltip: JSON.stringify(args.actionItemHideTooltip) ?? 'undefined',
    }

    return renderSource(template, {
        open: JSON.stringify(args.open ?? false),
        mode: JSON.stringify(args.mode ?? 'portal'),
        position: JSON.stringify(args.position ?? 'left'),
        size: JSON.stringify(args.size ?? 'md'),
        backdrop: JSON.stringify(args.withBackdrop ?? true),
        collapsedWidth: JSON.stringify(args.collapsedWidth ?? '4rem'),
        backgroundColor: JSON.stringify(args.backgroundColor ?? undefined) ?? 'undefined',
        header: args.showHeader ? header : '',
        navigation: args.showNavigation ? renderSource(navigation, values) : '',
        settings: args.showSettings ? renderSource(settings, values) : '',
        footer: args.showFooter ? renderSource(footer, values) : '',
        openLabel: JSON.stringify(args.mode === 'mini' ? 'Expand mini' : args.mode === 'inline' ? 'Expand drawer' : 'Open drawer'),
        closeLabel: JSON.stringify(args.mode === 'mini' ? 'Collapse mini' : args.mode === 'inline' ? 'Collapse drawer' : 'Close drawer'),
    })
}
