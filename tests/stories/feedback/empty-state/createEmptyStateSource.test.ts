import { describe, expect, it } from 'vitest'

import { createEmptyStateSource } from '@stories/feedback/empty-state/utils/create-empty-state-source/createEmptyStateSource.utils'

describe('createEmptyStateSource', () => {
    it('reflects the current content, class and example action', () => {
        const source = createEmptyStateSource('', {
            args: { title: 'No "results"', description: '', showAction: true, className: 'example' },
        })

        expect(source).toContain('title={"No \\"results\\""}')
        expect(source).toContain('description={""}')
        expect(source).toContain('className={"example"}')
        expect(source).toContain('action={<Button')
        expect(source).toContain('EmptyState, Button')
    })

    it('omits the action and button import when hidden', () => {
        const source = createEmptyStateSource('', {
            args: { title: 'No results', description: 'Try again.', showAction: false },
        })
        expect(source).not.toContain('Button')
        expect(source).not.toContain('action=')
    })
})
