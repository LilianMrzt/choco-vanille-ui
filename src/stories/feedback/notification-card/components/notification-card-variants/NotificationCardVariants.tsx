import type { ReactElement } from 'react'

import { NotificationCard } from '@components/feedback/notification-card'
import { Grid } from '@components/layout/grid'
import { VARIANTS } from '@stories/feedback/notification-card/constants'

/**
 * Demonstrates notification-card intent variants.
 * @internal Storybook-only component; not part of the public package API.
 * @returns NotificationCard examples.
 * @example
 * <NotificationCardVariants />
 */
const NotificationCardVariants = (): ReactElement => (
    <Grid
        gap={16}
        maxWidth={'24rem'}
        width={'100%'}
    >
        {VARIANTS.map((variant) => (
            <NotificationCard
                key={variant}
                variant={variant}
                title={variant}
                description={'A notification message.'}
            />
        ))}
    </Grid>
)

export default NotificationCardVariants
