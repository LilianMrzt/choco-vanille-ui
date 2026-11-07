import { type AvatarGroupProps } from '@components/data-display/avatar-group'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { PEOPLE } from '@stories/data-display/avatar-group/constants'
import sourceTemplate from '@stories/data-display/avatar-group/utils/create-group-source/sources/createGroupSource.source.txt?raw'
import childTemplate from '@stories/data-display/avatar-group/utils/create-group-source/sources/AvatarGroupChild.source.txt?raw'

/**
 * Generates public JSX for a group and every displayed child.
 * @internal Not part of the public package API.
 * @param args - Current group props from Controls.
 * @returns A consumer import and matching group with five identifying avatars.
 * @example
 * createGroupSource({ max: 3, spacing: 'md' })
 */
export const createGroupSource = (args: AvatarGroupProps): string => {
    const attributes = Object.entries(args).flatMap(([name, value]) => {
        if (name === 'onClick' && typeof value === 'function') {
            return ['    onClick={(event) => { /* Handle click */ }}']
        }

        if (value === undefined || value === null || typeof value === 'function' || name === 'children' || name === 'ref') {
            return []
        }

        return [`    ${name}={${JSON.stringify(value)}}`]
    })
    const children = PEOPLE.map(({ initials, label }) => '    ' + renderSource(childTemplate, {
        label: JSON.stringify(label),
        initials: JSON.stringify(initials),
    })).join('\n')

    return renderSource(sourceTemplate, { attributes: attributes.join('\n'), children })
}
