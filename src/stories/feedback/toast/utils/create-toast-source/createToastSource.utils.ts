import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { ToastStoryArgs } from '@stories/feedback/toast/constants'
import sourceTemplate from '@stories/feedback/toast/utils/create-toast-source/sources/createToastSource.source.tsx.txt?raw'

/**
 * Generates compound toast JSX reflecting the current story controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createToastSource('', { args })
 */
export const createToastSource = (_source: string, { args }: Readonly<{ args: ToastStoryArgs }>): string => {
    const children = [
        args.showCustomIcon && '  <Toast.Icon icon={InfoIcon} />',
        args.showTitle && `  <Toast.Title>{${JSON.stringify(args.title)}}</Toast.Title>`,
        args.showDescription && `  <Toast.Description>{${JSON.stringify(args.description)}}</Toast.Description>`,
        args.showActions && `  <Toast.Actions><Button size="sm" label={${JSON.stringify(args.actionLabel)}} /></Toast.Actions>`,
        args.showClose && `  <Toast.Close aria-label={${JSON.stringify(args.closeLabel)}} />`,
    ].filter(Boolean).join('\n')

    return renderSource(sourceTemplate, {
        buttonImport: args.showActions ? ', Button' : '',
        iconNote: args.showCustomIcon ? '// Supply InfoIcon from your icon library.\n' : '',
        variant: JSON.stringify(args.variant),
        role: JSON.stringify(args.role),
        children,
    })
}
