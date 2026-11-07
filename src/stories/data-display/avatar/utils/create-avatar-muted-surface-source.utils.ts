import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { PREVIEW_IMAGE } from '@stories/data-display/avatar/constants'
import sourceTemplate from '@stories/data-display/avatar/sources/AvatarOnMutedSurface.source.txt?raw'

/**
 * Generates consumer JSX for the muted-surface comparison.
 * @internal Not part of the public package API.
 * @returns A consumer example matching the three avatars.
 * @example
 * createAvatarMutedSurfaceSource()
 */
export const createAvatarMutedSurfaceSource = (): string =>
    renderSource(sourceTemplate, { image: JSON.stringify(PREVIEW_IMAGE) })
