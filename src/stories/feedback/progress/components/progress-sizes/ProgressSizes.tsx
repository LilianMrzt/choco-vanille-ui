import type { ReactElement } from 'react'

import { Progress } from '@components/feedback/progress'
import { SIZES } from '@stories/feedback/progress/constants'

/**
 * Demonstrates the available linear sizes.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Progress examples.
 * @example
 * <ProgressSizes />
 */
const ProgressSizes = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem', width: '20rem', maxWidth: '100%' }}>
        {SIZES.map((size) => (
            <Progress
                key={size}
                value={60}
                size={size}
                label={size.toUpperCase()}
                quantityLabel
            />
        ))}
    </div>
)

export default ProgressSizes
