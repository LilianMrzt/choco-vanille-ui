import type { ReactElement } from 'react'

import { Breadcrumbs } from '@components/navigation/breadcrumbs'

/**
 * Demonstrates an explicitly current item rather than relying on the last item.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Breadcrumb examples.
 * @example
 * <BreadcrumbsExamples />
 */
const BreadcrumbsExamples = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem' }}>
        <Breadcrumbs aria-label={'Explicit current page'}>
            <Breadcrumbs.Item
                label={'Home'}
                href={'/'}
            />
            <Breadcrumbs.Item
                label={'Products'}
                href={'/products'}
                current
            />
            <Breadcrumbs.Item
                label={'Details'}
                href={'/products/details'}
            />
        </Breadcrumbs>
    </div>
)

export default BreadcrumbsExamples
