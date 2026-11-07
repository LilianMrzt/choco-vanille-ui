import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { ToasterStoryArgs } from '@stories/feedback/toaster/types'
import template from '@stories/feedback/toaster/utils/create-toaster-source/sources/createToasterSource.source.tsx.txt?raw'

/**
 * Generates consumer code matching the notification triggers and viewports.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source.
 * @param context - Story context.
 * @param context.args - Current message and viewport controls.
 * @returns Consumer code with the current values.
 * @example
 * createToasterSource('', { args })
 */
export const createToasterSource = (_source: string, { args }: Readonly<{ args: ToasterStoryArgs }>): string => {
    const content = `title: ${JSON.stringify(args.title)}, description: ${JSON.stringify(args.description)}`
    const actions = args.showActions
        ? `, actions: <Button label={${JSON.stringify(args.actionLabel)}} size="sm" variant="ghost" onClick={() => show('info', { title: 'Action completed' })} />`
        : ''

    return renderSource(template, {
        variant: JSON.stringify(args.messageVariant),
        title: JSON.stringify(args.title),
        content,
        closeLabel: JSON.stringify(args.closeLabel),
        actions,
        duration: JSON.stringify(args.duration),
        notificationDuration: JSON.stringify(args.notificationDuration),
        toastPosition: JSON.stringify(args.toastPosition ?? 'bottom-right'),
        notificationPosition: JSON.stringify(args.notificationPosition ?? 'top-right'),
        toastLabel: JSON.stringify(args.toastLabel ?? 'Toasts'),
        notificationLabel: JSON.stringify(args.notificationLabel ?? 'Notifications'),
    })
}
