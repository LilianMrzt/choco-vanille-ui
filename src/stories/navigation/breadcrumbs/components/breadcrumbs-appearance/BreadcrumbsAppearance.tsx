import type { ReactElement } from 'react'
import BreadcrumbsColors from '../breadcrumbs-colors/BreadcrumbsColors'
import BreadcrumbsSeparators from '../breadcrumbs-separators/BreadcrumbsSeparators'

/**
 * Compares colors and decorative separators as independent axes.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Named appearance sections.
 * @example <BreadcrumbsAppearance />
 */
const BreadcrumbsAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', maxWidth: '100%' }}>
        <section><h3>Colors</h3><BreadcrumbsColors /></section>
        <section><h3>Separators</h3><BreadcrumbsSeparators /></section>
    </div>
)

export default BreadcrumbsAppearance
