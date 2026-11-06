import type { ReactElement } from 'react'

import { CircularProgress, Progress, PROGRESS_COLORS_ARRAY } from '@components/feedback/progress'

/**
 * Demonstrates semantic colors in both progress variants.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Progress examples.
 * @example
 * <ProgressColors />
 */
const ProgressColors = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem', width: '20rem', maxWidth: '100%' }}>
        {PROGRESS_COLORS_ARRAY.map((color) => (
            <div
                key={color}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
                <Progress
                    value={60}
                    color={color}
                    label={color}
                    quantityLabel
                />
                <CircularProgress
                    value={60}
                    color={color}
                    size={'sm'}
                    quantityLabel
                    aria-label={color}
                />
            </div>
        ))}
    </div>
)

export default ProgressColors
