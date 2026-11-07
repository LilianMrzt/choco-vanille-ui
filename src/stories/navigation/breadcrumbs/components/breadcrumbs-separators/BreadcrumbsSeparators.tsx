import type { ReactElement } from 'react'
import { Breadcrumbs, BREADCRUMBS_SEPARATORS } from '@components/navigation/breadcrumbs'

/**
 * Compares each public decorative separator.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Five breadcrumb hierarchies.
 * @example <BreadcrumbsSeparators />
 */
const BreadcrumbsSeparators = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem' }}>
        {Object.values(BREADCRUMBS_SEPARATORS).map((separator) => (
            <Breadcrumbs
                key={separator}
                aria-label={`${separator} breadcrumb`}
                separator={separator}
            >
                <Breadcrumbs.Item
                    href={'/'}
                    label={'Home'}
                />
                <Breadcrumbs.Item
                    href={'/products'}
                    label={'Products'}
                />
                <Breadcrumbs.Item label={'Current'} />
            </Breadcrumbs>
        ))}
    </div>
)

export default BreadcrumbsSeparators
