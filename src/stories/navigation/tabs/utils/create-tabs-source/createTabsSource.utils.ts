import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { TabsStoryArgs } from '@stories/navigation/tabs/types'
import controlledTemplate from '@stories/navigation/tabs/utils/create-tabs-source/sources/controlled.source.txt?raw'
import uncontrolledTemplate from '@stories/navigation/tabs/utils/create-tabs-source/sources/uncontrolled.source.txt?raw'

/**
 * Generates JSX reflecting the current tab controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createTabsSource('', { args })
 */
export const createTabsSource = (_source: string, { args }: Readonly<{ args: TabsStoryArgs }>): string =>
    renderSource(args.value === undefined ? uncontrolledTemplate : controlledTemplate, {
        value: JSON.stringify(args.value === undefined ? args.defaultValue === undefined ? 0 : args.defaultValue : args.value),
        orientation: JSON.stringify(args.orientation ?? 'horizontal'),
        listVariant: JSON.stringify(args.listVariant),
        listBordered: JSON.stringify(args.listBordered),
        activationMode: JSON.stringify(args.activationMode),
        billingDisabled: JSON.stringify(args.billingDisabled),
        billingWidth: args.billingWidth ? ` width={${JSON.stringify(args.billingWidth)}}` : '',
    })
