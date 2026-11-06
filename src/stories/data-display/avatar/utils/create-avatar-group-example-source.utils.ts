import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'
import { createGroupSource } from '@stories/data-display/avatar-group/utils/create-group-source/createGroupSource.utils'

/**
 * Generates public source for the group demonstration.
 * @internal Not part of the public package API.
 * @param _source - Storybook's generated source.
 * @param context - Current Storybook context.
 * @param context.args - Current demonstration controls.
 * @returns Consumer JSX matching the group.
 * @example
 * createAvatarGroupExampleSource('', { args: { groupMax: 3 } })
 */
export const createAvatarGroupExampleSource = (_source: string, { args }: Readonly<{ args: AvatarStoryArgs }>): string => {
    const source = createGroupSource({
        max: args.groupMax,
        spacing: args.groupSpacing,
        'aria-label': args.groupLabel,
        role: 'group',
    })

    return args.groupOverflowLabel
        ? source.replace('<AvatarGroup\n', '<AvatarGroup\n    overflowLabel={(count) => `${count} additional participants`}\n')
        : source
}
