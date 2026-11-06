import { type AvatarProps } from '@components/data-display/avatar'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/data-display/avatar/utils/create-avatar-source/sources/createAvatarSource.source.tsx.txt?raw'

/**
 * Creates consumer JSX for all serializable avatar args.
 * @internal Not part of the public package API.
 * @param args - Current native and component values from Controls.
 * @returns A public import and matching convenience avatar.
 * @example
 * createAvatarSource({ initials: 'JD' })
 */
export const createAvatarSource = (args: AvatarProps): string => {
    const attributes = Object.entries(args).flatMap(([name, value]) => {
        if (name === 'onLoadingStatusChange' && typeof value === 'function') {
            return ['    onLoadingStatusChange={(status) => { /* Handle image status */ }}']
        }

        if (name === 'onClick' && typeof value === 'function') {
            return ['    onClick={(event) => { /* Handle click */ }}']
        }

        if (value === undefined || value === null || typeof value === 'function' || name === 'children' || name === 'ref' || name.startsWith('compound') || name.startsWith('group')) {
            return []
        }

        return [`    ${name}={${JSON.stringify(value)}}`]
    })

    return renderSource(sourceTemplate, { attributes: attributes.join('\n') })
}
