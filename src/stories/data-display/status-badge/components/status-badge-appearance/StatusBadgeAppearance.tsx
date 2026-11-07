import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import StatusBadgeColors from '@stories/data-display/status-badge/components/status-badge-colors/StatusBadgeColors'
import StatusBadgePositions from '@stories/data-display/status-badge/components/status-badge-positions/StatusBadgePositions'

/**
 * Compares the public appearance axes without a Cartesian matrix.
 * @internal Not part of the public package API.
 * @returns Labelled comparison sections.
 * @example <StatusBadgeAppearance />
 */
const StatusBadgeAppearance = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={24}
        maxWidth={'100%'}
        width={'min(40rem, calc(100vw - 32px))'}
    >
        <section>
            <Typography as={'h3'}>Colors</Typography>
            <StatusBadgeColors />
        </section>
        <section>
            <Typography as={'h3'}>Positions</Typography>
            <StatusBadgePositions />
        </section>
    </Flex>
)

export default StatusBadgeAppearance
