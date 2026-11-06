import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/feedback/callout/constants'
import { createCalloutSource } from '@stories/feedback/callout/utils/create-callout-source/createCalloutSource.utils'

describe('createCalloutSource', () => {
    it('reflects compound controls and escapes their content', () => {
        const source = createCalloutSource('', {
            args: { ...DEFAULT_ARGS, variant: 'warning', role: undefined, title: 'A "warning"', showCustomIcon: true, showDescription: false },
        })

        expect(source).toContain('variant={"warning"} role={undefined}')
        expect(source).toContain('<Callout.Icon icon={InfoIcon} />')
        expect(source).toContain('{"A \\"warning\\""}')
        expect(source).not.toContain('<Callout.Description>')
        expect(source).toContain('aria-label={"Dismiss"}')
    })
})
