import type { ReactElement } from 'react'

import { Breadcrumbs } from '@components/navigation/breadcrumbs'

/**
 * Demonstrates representative link colors.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Color examples.
 * @example
 * <BreadcrumbsColors />
 */
const BreadcrumbsColors = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem' }}>
        {(['primary.main', 'secondary.main', 'neutral.main', 'danger.main', 'success.main', 'warning.main', 'info.main'] as const).map((color) => (
            <Breadcrumbs
                key={color}
                aria-label={`${color} breadcrumb`}
                color={color}
            >
                <Breadcrumbs.Item
                    label={'Home'}
                    href={'/'}
                />
                <Breadcrumbs.Item label={'Current'} />
            </Breadcrumbs>
        ))}
    </div>
)

export default BreadcrumbsColors
