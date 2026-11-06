import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { CalloutStoryArgs } from '@stories/feedback/callout/constants'
import sourceTemplate from '@stories/feedback/callout/utils/create-callout-source/sources/createCalloutSource.source.tsx.txt?raw'

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
        args.showCustomIcon && '  <Callout.Icon icon={InfoIcon} />',
        args.showTitle && `  <Callout.Title>{${JSON.stringify(args.title)}}</Callout.Title>`,
        args.showDescription && `  <Callout.Description>{${JSON.stringify(args.description)}}</Callout.Description>`,
        args.showAction && `  <Callout.Action icon={CloseIcon} aria-label={${JSON.stringify(args.actionLabel)}} onClick={() => {}} />`,
    ].filter(Boolean).join('\n')

    return renderSource(sourceTemplate, {
        variant: JSON.stringify(args.variant),
        role: args.role === undefined ? 'undefined' : JSON.stringify(args.role),
        children,
    })
}
