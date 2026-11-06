import type { ReactElement } from 'react'

import { Toast } from '@components/feedback/toast'
import { VARIANTS } from '@stories/feedback/toast/constants'

/**
 * Demonstrates toast intent variants.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Toast examples.
 * @example
 * <ToastVariants />
 */
const ToastVariants = (): ReactElement => (
    <div style={{ display: 'grid', gap: '0.75rem', width: '32rem', maxWidth: '100%' }}>
        {VARIANTS.map((variant) => (
            <Toast
                key={variant}
                variant={variant}
                title={variant}
                description={'A notification message.'}
            />
        ))}
    </div>
)

export default ToastVariants
