import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { NotificationCard } from '@components/feedback/notification-card'
import { Box } from '@components/layout/box'

/**
 * Demonstrates wrapping content and actions in a mobile-sized card.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A narrow notification example.
 * @example
 * <NotificationCardNarrow />
 */
const NotificationCardNarrow = (): ReactElement => (
    <Box
        maxWidth={'100%'}
        width={'18rem'}
    >
        <NotificationCard variant={'warning'}>
            <NotificationCard.Header>
                <NotificationCard.Icon />
                <NotificationCard.Title>Your session is about to expire</NotificationCard.Title>
                <NotificationCard.Close aria-label={'Dismiss session warning'} />
            </NotificationCard.Header>
            <NotificationCard.Body>
                <NotificationCard.Description>
                    Save your changes before reconnecting. Long names such as
                    workspace-with-a-very-long-unbroken-identifier remain readable.
                </NotificationCard.Description>
            </NotificationCard.Body>
            <NotificationCard.Footer>
                <NotificationCard.Actions>
                    <Button
                        label={'Save changes'}
                        size={'sm'}
                        variant={'outlined'}
                    />
                    <Button
                        label={'Reconnect'}
                        size={'sm'}
                        variant={'ghost'}
                    />
                </NotificationCard.Actions>
            </NotificationCard.Footer>
        </NotificationCard>
    </Box>
)

export default NotificationCardNarrow
