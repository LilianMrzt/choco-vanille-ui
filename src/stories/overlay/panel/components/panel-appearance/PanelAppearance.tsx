import type { ReactElement } from 'react'
import PanelPositions from '../panel-positions/PanelPositions'

/**
 * Compares panel placement at a consistent width.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The panel comparisons.
 * @example <PanelAppearance />
 */
const PanelAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', maxWidth: '100%' }}>
        <section><h3>Positions</h3><PanelPositions /></section>
    </div>
)

export default PanelAppearance
