import type { ReactElement } from 'react'

import { Breadcrumbs, BREADCRUMBS_SEPARATORS } from '@components/navigation/breadcrumbs'

/**
 * Demonstrates separators and an explicitly current item.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Breadcrumb examples.
 * @example
 * <BreadcrumbsExamples />
 */
const BreadcrumbsExamples = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem' }}>
        {Object.values(BREADCRUMBS_SEPARATORS).map((separator) => (
            <Breadcrumbs
                key={separator}
                aria-label={`${separator} breadcrumb`}
                separator={separator}
            >
                <Breadcrumbs.Item
                    label={'Home'}
                    href={'/'}
                />
                <Breadcrumbs.Item
                    label={'Products'}
                    href={'/products'}
                />
                <Breadcrumbs.Item label={'Current'} />
            </Breadcrumbs>
        ))}
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
