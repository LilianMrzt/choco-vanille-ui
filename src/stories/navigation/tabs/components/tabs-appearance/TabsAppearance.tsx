import type { ReactElement } from 'react'
import TabsVariants from '../tabs-variants/TabsVariants'
import TabsOrientations from '../tabs-orientations/TabsOrientations'

/**
 * Compares list variants and keyboard orientations independently.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Responsive named comparison sections.
 * @example <TabsAppearance />
 */
const TabsAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', maxWidth: '100%' }}>
        <section><h3>Variants</h3><TabsVariants /></section>
        <section><h3>Orientations</h3><TabsOrientations /></section>
    </div>
)

export default TabsAppearance
