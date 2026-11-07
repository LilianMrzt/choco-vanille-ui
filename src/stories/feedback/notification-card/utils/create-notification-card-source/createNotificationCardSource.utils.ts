import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { NotificationCardStoryArgs } from '@stories/feedback/notification-card/types'
import sourceTemplate from '@stories/feedback/notification-card/utils/create-notification-card-source/sources/createNotificationCardSource.source.tsx.txt?raw'

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
        ? '      <NotificationCard.Icon icon={InfoIcon} />'
        : '      <NotificationCard.Icon />'
    const children = [
        '    <NotificationCard.Header>',
        args.showIcon && icon,
        args.showTitle && `      <NotificationCard.Title>{${JSON.stringify(args.title)}}</NotificationCard.Title>`,
        args.showClose && `      <NotificationCard.Close aria-label={${JSON.stringify(args.closeLabel ?? 'Close notification')}} onClick={() => { /* Handle dismissal */ }} />`,
        '    </NotificationCard.Header>',
        args.showDescription && `    <NotificationCard.Body>\n      <NotificationCard.Description>{${JSON.stringify(args.description)}}</NotificationCard.Description>\n    </NotificationCard.Body>`,
        args.showActions && `    <NotificationCard.Footer>\n      <NotificationCard.Actions><Button size="sm" variant="outlined" label={${JSON.stringify(args.actionLabel)}} /></NotificationCard.Actions>\n    </NotificationCard.Footer>`,
    ].filter(Boolean).join('\n')

    return renderSource(sourceTemplate, {
        buttonImport: args.showActions ? ', Button' : '',
        iconNote: args.showIcon && args.showCustomIcon ? '// Supply InfoIcon from your icon library.\n' : '',
        variant: JSON.stringify(args.variant),
        role: JSON.stringify(args.role),
        children,
    })
}
