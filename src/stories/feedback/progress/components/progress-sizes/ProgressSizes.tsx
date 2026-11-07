import type { ReactElement } from 'react'

import { CircularProgress, Progress } from '@components/feedback/progress'
import { SIZES } from '@stories/feedback/progress/constants'

/**
 * Compares linear and circular indicators at every public size.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Progress examples.
 * @example
 * <ProgressSizes />
 */
const ProgressSizes = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem', width: '20rem', maxWidth: '100%' }}>
        {SIZES.map((size) => (
            <div
                key={size}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
                <Progress
                    value={60}
                    size={size}
                    label={size.toUpperCase()}
                    quantityLabel
                />
                <CircularProgress
                    value={60}
                    size={size}
                    aria-label={size.toUpperCase()}
                    quantityLabel
                />
            </div>
        ))}
    </div>
)

export default ProgressSizes
