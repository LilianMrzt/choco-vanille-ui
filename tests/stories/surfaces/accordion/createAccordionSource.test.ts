import { describe, expect, it } from 'vitest'
import { createAccordionSource } from '@stories/surfaces/accordion/utils/create-accordion-source/createAccordionSource.utils'

describe('createAccordionSource', () => {
    it('documents every instance and current root and trigger controls', () => {
        const source = createAccordionSource('', {
            args: { value: ['item-2'], multiple: true, width: '100%', firstDisabled: true, firstLabel: 'My "details"', firstStartIcon: true },
        })

        expect(source).toContain('useState<string[]>(["item-2"])')
        expect(source).toContain('multiple={true}')
        expect(source).toContain('width={"100%"}')
        expect(source).toContain('label={"My \\"details\\""}')
        expect(source).toContain('startIcon={InfoIcon}')
        expect(source.match(/<Accordion.Item/g)).toHaveLength(3)
        expect(source).not.toMatch(/\{\{\w+\}\}/)
    })

    it('represents initial-only values without a controlled state wrapper', () => {
        const source = createAccordionSource('', { args: { defaultValue: ['item-3'], firstLabel: 'Details' } })

        expect(source).toContain('defaultValue={["item-3"]}')
        expect(source).not.toContain('useState')
        expect(source).not.toContain('onValueChange')
    })

    it('keeps controlled state typed when no items are expanded', () => {
        const source = createAccordionSource('', { args: { value: [] } })

        expect(source).toContain('useState<string[]>([])')
    })
})
