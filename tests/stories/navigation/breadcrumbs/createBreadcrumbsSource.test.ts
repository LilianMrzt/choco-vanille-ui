import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/navigation/breadcrumbs/constants'
import { createBreadcrumbsSource } from '@stories/navigation/breadcrumbs/utils/create-breadcrumbs-source/createBreadcrumbsSource.utils'

describe('createBreadcrumbsSource', () => {
    it('reflects and escapes the playground controls', () => {
        const source = createBreadcrumbsSource('', {
            args: { ...DEFAULT_ARGS, 'aria-label': 'Shop "path"', color: 'danger.main', separator: 'slash', currentLabel: 'A "product"' },
        })

        expect(source).toContain('aria-label={"Shop \\"path\\""}')
        expect(source).toContain('color={"danger.main"}')
        expect(source).toContain('separator={"slash"}')
        expect(source).toContain('label={"A \\"product\\""}')
        expect(source).toContain('<Breadcrumbs.Item label="Products"')
    })
})
