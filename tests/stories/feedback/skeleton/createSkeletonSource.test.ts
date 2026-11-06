import { describe, expect, it } from 'vitest'

import { createSkeletonSource } from '@stories/feedback/skeleton/utils/create-skeleton-source/createSkeletonSource.utils'

describe('createSkeletonSource', () => {
    it('serializes current controls, including zero and escaped strings', () => {
        const source = createSkeletonSource('', {
            args: { variant: 'circular', width: 0, height: '2rem', className: 'a"b' },
        })

        expect(source).toContain('variant={"circular"}')
        expect(source).toContain('width={0}')
        expect(source).toContain('height={"2rem"}')
        expect(source).toContain('className={"a\\"b"}')
        expect(source).not.toContain('{{attributes}}')
    })

    it('omits absent controls', () => {
        expect(createSkeletonSource('', { args: {} })).toContain('<Skeleton />')
    })
})
