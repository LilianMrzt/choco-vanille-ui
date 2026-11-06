import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { BottomNavigationStoryArgs } from '@stories/navigation/bottom-navigation/types'
import template from '@stories/navigation/bottom-navigation/utils/create-bottom-navigation-source/sources/playground.source.tsx.txt?raw'

/**
 * Generates the controlled navigation example from Storybook args.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createBottomNavigationSource('', { args })
 */
export const createBottomNavigationSource = (_source: string, { args }: Readonly<{ args: BottomNavigationStoryArgs }>): string =>
    renderSource(template, {
        value: JSON.stringify(args.value ?? args.defaultValue ?? ''),
        ariaLabel: JSON.stringify(args['aria-label']),
        ariaLabelledBy: args['aria-labelledby'] ? ` aria-labelledby={${JSON.stringify(args['aria-labelledby'])}}` : '',
        className: args.className ? ` className={${JSON.stringify(args.className)}}` : '',
        bordered: JSON.stringify(Boolean(args.bordered)),
        listClassName: args.listClassName ? ` className={${JSON.stringify(args.listClassName)}}` : '',
        listGap: args.listGap === undefined ? '' : ` gap={${JSON.stringify(args.listGap)}}`,
        listWidth: args.listWidth ? ` width={${JSON.stringify(args.listWidth)}}` : '',
        listMaxWidth: args.listMaxWidth ? ` maxWidth={${JSON.stringify(args.listMaxWidth)}}` : '',
        itemName: args.itemShowLabel === false ? `aria-label={${JSON.stringify(args.itemAriaLabel ?? 'Home')}}` : `label={${JSON.stringify(args.itemLabel ?? 'Home')}}`,
        itemHref: JSON.stringify(args.itemHref || '/'),
        itemHeight: args.itemHeight ? ` height={${JSON.stringify(args.itemHeight)}}` : '',
        itemDisabled: JSON.stringify(Boolean(args.itemDisabled)),
    })
