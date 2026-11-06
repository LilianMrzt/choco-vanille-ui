import { describe, expect, it } from 'vitest'

import { createPaginationSource } from '@stories/navigation/pagination/utils/create-pagination-source/createPaginationSource.utils'

describe('createPaginationSource', () => {
    it('reflects current controls, including zero and escaped text', () => {
        const source = createPaginationSource('', {
            args: { 'aria-label': 'My "pages"', currentPage: 2, totalPages: 5, siblingCount: 0, previousLabel: '', nextLabel: 'Next', onPageChange: () => {} },
        })

        expect(source).toContain('useState(2)')
        expect(source).toContain('aria-label={"My \\"pages\\""}')
        expect(source).toContain('totalPages={5}')
        expect(source).toContain('siblingCount={0}')
        expect(source).toContain('previousLabel={""}')
        expect(source).not.toContain('{{')
    })
})
