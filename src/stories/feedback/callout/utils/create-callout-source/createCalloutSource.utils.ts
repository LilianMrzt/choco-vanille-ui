import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/feedback/callout/utils/create-callout-source/sources/createCalloutSource.source.txt?raw'
import actionTemplate from '@stories/feedback/callout/utils/create-callout-source/sources/CalloutAction.source.txt?raw'
import titleTemplate from '@stories/feedback/callout/utils/create-callout-source/sources/CalloutTitle.source.txt?raw'
import iconTemplate from '@stories/feedback/callout/utils/create-callout-source/sources/CalloutIcon.source.txt?raw'
import descriptionTemplate from '@stories/feedback/callout/utils/create-callout-source/sources/CalloutDescription.source.txt?raw'
import type { CalloutStoryArgs } from '@stories/feedback/callout/types'
import iconImportTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/IconImport.source.txt?raw'

/**
 * Generates compound callout JSX reflecting the current story controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createCalloutSource('', { args })
 */
export const createCalloutSource = (_source: string, { args }: Readonly<{ args: CalloutStoryArgs }>): string => {
    const children = [
        args.showCustomIcon && iconTemplate.trimEnd(),
        args.showTitle && renderSource(titleTemplate, { title: JSON.stringify(args.title) }).trimEnd(),
        args.showDescription && renderSource(descriptionTemplate, { description: JSON.stringify(args.description) }).trimEnd(),
        args.showAction && renderSource(actionTemplate, { label: JSON.stringify(args.actionLabel) }).trimEnd(),
    ].filter(Boolean).join('\n')

    return renderSource(sourceTemplate, {
        variant: JSON.stringify(args.variant),
        role: args.role === undefined ? 'undefined' : JSON.stringify(args.role),
        children,
        iconImports: [
            args.showCustomIcon && renderSource(iconImportTemplate, { name: 'InfoIcon' }).trimEnd(),
            args.showAction && renderSource(iconImportTemplate, { name: 'CloseIcon' }).trimEnd(),
        ].filter(Boolean).join('\n'),
    })
}
