import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { BottomSheetPlaygroundArgs } from '@stories/overlay/bottom-sheet/types'
import headerTemplate from '@stories/overlay/bottom-sheet/utils/create-bottom-sheet-source/sources/header.source.txt?raw'
import template from '@stories/overlay/bottom-sheet/utils/create-bottom-sheet-source/sources/playground.source.txt?raw'
import radioGroupTemplate from '@stories/overlay/bottom-sheet/utils/create-bottom-sheet-source/sources/radio-group.source.txt?raw'
import separatorTemplate from '@stories/overlay/bottom-sheet/utils/create-bottom-sheet-source/sources/separator.source.txt?raw'

/**
 * Generates a consumer example from the playground controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createBottomSheetSource('', { args })
 */
export const createBottomSheetSource = (_source: string, { args }: Readonly<{ args: BottomSheetPlaygroundArgs }>): string => {
    const description = args.description === undefined ? '' : ` description={${JSON.stringify(args.description)}}`
    const header = args.showHeader
        ? `\n        ${renderSource(headerTemplate, {
            title: JSON.stringify(args.title ?? 'Photo'),
            titleAs: args.titleAs === undefined ? '' : ` titleAs={${JSON.stringify(args.titleAs)}}`,
            description,
        })}`
        : ''
    const separator = args.showSeparator ? `\n        ${separatorTemplate.trim()}` : ''
    const radio = args.showRadioGroup
        ? `${separator}\n        ${renderSource(radioGroupTemplate, {
            radioItemLabel: JSON.stringify(args.radioItemLabel ?? 'Original size'),
            radioDisabled: args.radioDisabled === undefined ? '' : ` disabled={${JSON.stringify(args.radioDisabled)}}`,
        })}`
        : ''

    return renderSource(template, {
        open: JSON.stringify(Boolean(args.open)),
        modal: JSON.stringify(args.modal ?? true),
        triggerLabel: JSON.stringify(args.triggerLabel ?? 'Open bottom sheet'),
        showHandle: JSON.stringify(args.showHandle ?? true),
        contentLabel: args.contentLabel === undefined ? '' : ` defaultAriaLabel={${JSON.stringify(args.contentLabel)}}`,
        radioValue: JSON.stringify(args.radioValue ?? 'original'),
        header,
        radio,
        separator,
        itemLabel: JSON.stringify(args.itemLabel ?? 'Delete'),
        itemDestructive: JSON.stringify(Boolean(args.itemDestructive)),
        itemDisabled: JSON.stringify(Boolean(args.itemDisabled)),
        itemCloseOnClick: args.itemCloseOnClick === undefined ? '' : ` closeOnClick={${JSON.stringify(args.itemCloseOnClick)}}`,
        closeLabel: JSON.stringify(args.closeLabel ?? 'Cancel'),
    })
}
