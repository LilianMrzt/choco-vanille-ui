import { describe, expect, it } from 'vitest'

import { createSpinnerSource } from '@stories/feedback/spinner/utils/create-spinner-source/createSpinnerSource.utils'

describe('createSpinnerSource', () => {
    it('serializes the current controls including empty and escaped labels', () => {
        const source = createSpinnerSource('', {
            args: { size: 'lg', color: 'warning', role: 'alert', 'aria-label': 'Saving "draft"', className: 'custom' },
        })

        expect(source).toContain('size={"lg"}')
        expect(source).toContain('color={"warning"}')
        expect(source).toContain('role={"alert"}')
        expect(source).toContain('aria-label={"Saving \\"draft\\""}')
        expect(source).toContain('className={"custom"}')
        expect(createSpinnerSource('', { args: { 'aria-label': '' } })).toContain('aria-label={""}')
        expect(source).not.toContain('{{attributes}}')
    })

    it('omits absent controls', () => {
        expect(createSpinnerSource('', { args: {} })).toContain('<Spinner />')
    })
})
