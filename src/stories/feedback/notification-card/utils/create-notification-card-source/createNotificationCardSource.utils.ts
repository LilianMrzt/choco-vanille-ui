import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { NotificationCardStoryArgs } from '@stories/feedback/notification-card/types'
import sourceTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/createNotificationCardSource.source.txt?raw'
import actionsTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/NotificationCardActions.source.txt?raw'
import closeTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/NotificationCardClose.source.txt?raw'
import titleTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/NotificationCardTitle.source.txt?raw'
import headerTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/NotificationCardHeader.source.txt?raw'
import defaultIconTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/NotificationCardDefaultIcon.source.txt?raw'
import customIconTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/NotificationCardCustomIcon.source.txt?raw'
import descriptionTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/NotificationCardDescription.source.txt?raw'
import iconImportTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/IconImport.source.txt?raw'

/**
 * Generates compound notification-card JSX reflecting the current story controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createNotificationCardSource('', { args })
 */
export const createNotificationCardSource = (_source: string, { args }: Readonly<{ args: NotificationCardStoryArgs }>): string => {
    const icon = args.showCustomIcon
        ? customIconTemplate.trimEnd()
        : defaultIconTemplate.trimEnd()
    const header = [
        args.showIcon && icon,
        args.showTitle && renderSource(titleTemplate, { title: JSON.stringify(args.title) }),
        args.showClose && renderSource(closeTemplate, { label: JSON.stringify(args.closeLabel ?? 'Close notification') }),
    ].filter(Boolean).join('\n')
    const children = [
        renderSource(headerTemplate, { children: header }).trimEnd(),
        args.showDescription && renderSource(descriptionTemplate, { description: JSON.stringify(args.description) }).trimEnd(),
        args.showActions && renderSource(actionsTemplate, { label: JSON.stringify(args.actionLabel) }).trimEnd(),
    ].filter(Boolean).join('\n')

    return renderSource(sourceTemplate, {
        buttonImport: args.showActions ? ', Button' : '',
        iconNote: args.showIcon && args.showCustomIcon ? renderSource(iconImportTemplate, { name: 'InfoIcon', module: '@iconify-icons/lucide/info' }).trimEnd() : '',
        variant: JSON.stringify(args.variant),
        role: JSON.stringify(args.role),
        children,
    })
}
