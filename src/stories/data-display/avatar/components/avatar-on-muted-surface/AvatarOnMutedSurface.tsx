import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { PREVIEW_IMAGE } from '@stories/data-display/avatar/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'
import type { ReactElement } from 'react'

/**
 * Shows two treatments and a bordered image on a themed muted surface.
 * @internal Not part of the public package API.
 * @returns The surface comparison.
 * @example
 * <AvatarOnMutedSurface />
 */
const AvatarOnMutedSurface = (): ReactElement => (
    <Flex
        alignItems={'center'}
        backgroundColor={vars.color.surface.muted}
        gap={12}
        padding={16}
    >
        <Avatar
            aria-label={'Jane Doe, subtle'}
            initials={'JD'}
            variant={'subtle'}
        />
        <Avatar
            aria-label={'Jane Doe, outlined subtle'}
            initials={'JD'}
            variant={'outlinedSubtle'}
        />
        <Avatar
            alt={'shadcn'}
            aria-label={'shadcn'}
            initials={'CN'}
            src={PREVIEW_IMAGE}
            variant={'outlined'}
        />
    </Flex>
)

export default AvatarOnMutedSurface
