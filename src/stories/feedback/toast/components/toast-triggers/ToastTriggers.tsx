import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { useNotification, useToast } from '@hooks'

/**
 * Demonstrates the transient and persistent notification channels.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Toast trigger buttons.
 * @example
 * <ToastTriggers />
 */
const ToastTriggers = (): ReactElement => {
    const { showSuccess } = useToast()
    const { show: showNotification } = useNotification()

    return (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
                label={'Show toast'}
                onClick={() => showSuccess({ title: 'Changes saved', description: 'Your profile has been updated.' })}
            />
            <Button
                label={'Show notification'}
                onClick={() => showNotification({ variant: 'info', title: 'New version available', description: 'Reload when you are ready.' })}
            />
        </div>
    )
}

export default ToastTriggers
