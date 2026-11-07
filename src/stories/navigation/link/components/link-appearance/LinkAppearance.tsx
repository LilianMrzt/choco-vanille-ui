import type { ReactElement } from 'react'
import LinkColors from '../link-colors/LinkColors'
import LinkFontWeights from '../link-font-weights/LinkFontWeights'

/**
 * Compares link colors and font weights independently of font size.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Labeled responsive comparisons.
 * @example <LinkAppearance />
 */
const LinkAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', maxWidth: '100%' }}>
        <section><h3>Colors</h3><LinkColors /></section>
        <section><h3>Font weights</h3><LinkFontWeights /></section>
    </div>
)

export default LinkAppearance
