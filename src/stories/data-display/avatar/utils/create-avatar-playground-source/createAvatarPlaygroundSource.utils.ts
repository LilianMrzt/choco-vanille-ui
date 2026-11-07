import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'
import { createAvatarSource } from '@stories/data-display/avatar/utils/create-avatar-source/createAvatarSource.utils'
import { createAvatarCompoundSource } from '@stories/data-display/avatar/utils/create-avatar-compound-source/createAvatarCompoundSource.utils'
import { createAvatarGroupExampleSource } from '@stories/data-display/avatar/utils/create-avatar-group-example-source.utils'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import template from '@stories/data-display/avatar/utils/create-avatar-playground-source/sources/AvatarPlayground.source.txt?raw'

/**
 * Includes every API instance displayed in the primary playground.
 * @internal Not part of the public package API.
 * @param _source - Generated source replaced by the consumer examples.
 * @param context - Current story context.
 * @param context.args - Convenience, compound and group controls.
 * @returns Three consumer examples with shared package imports.
 * @example createAvatarPlaygroundSource('', { args: { initials: 'JD' } })
 */
export const createAvatarPlaygroundSource = (_source: string, context: Readonly<{ args: AvatarStoryArgs }>): string =>
    renderSource(template, {
        convenience: createAvatarSource(context.args).replace(/^import .*\r?\n/gm, '').trim(),
        compound: createAvatarCompoundSource(_source, context).replace(/^import .*\r?\n/gm, '').trim(),
        group: createAvatarGroupExampleSource(_source, context).replace(/^import .*\r?\n/gm, '').trim(),
    })
