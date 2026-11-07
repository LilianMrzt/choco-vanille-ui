import type { ReactElement } from 'react'
import BottomNavigationBordered from '../bordered/BottomNavigationBordered'

/**
 * Shows the bordered navigation surface independently of dimensions.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Responsive, labeled comparison sections.
 * @example <BottomNavigationAppearance />
 */
const BottomNavigationAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem', width: '100%', minWidth: 0 }}>
        <section style={{ minWidth: 0, overflowX: 'auto' }}><h3>Border</h3><BottomNavigationBordered /></section>
    </div>
)

export default BottomNavigationAppearance
