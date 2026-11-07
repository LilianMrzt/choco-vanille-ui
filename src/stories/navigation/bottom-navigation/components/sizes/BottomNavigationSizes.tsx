import type { ReactElement } from 'react'
import BottomNavigationCustomHeights from '../custom-heights/BottomNavigationCustomHeights'
import BottomNavigationParentWidths from '../parent-widths/BottomNavigationParentWidths'

/**
 * Compares item heights and local parent widths separately.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Bounded, labelled size comparisons with local scrolling.
 * @example <BottomNavigationSizes />
 */
const BottomNavigationSizes = (): ReactElement => (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem', width: '100%', minWidth: 0 }}>
        <section style={{ minWidth: 0, overflowX: 'auto' }}><h3>Item heights</h3><BottomNavigationCustomHeights /></section>
        <section style={{ minWidth: 0, overflowX: 'auto' }}><h3>Parent widths</h3><BottomNavigationParentWidths /></section>
    </div>
)

export default BottomNavigationSizes
