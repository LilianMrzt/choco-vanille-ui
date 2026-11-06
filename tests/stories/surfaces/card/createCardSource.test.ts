import { describe, expect, it } from 'vitest'

import { createCardSource } from '@stories/surfaces/card/utils/create-card-source/createCardSource.utils'

describe('createCardSource', () => {
    it('includes the active root and slot controls', () => {
        const source = createCardSource('', {
            args: {
                as: 'article',
                borderRadius: 10,
                title: 'Account "settings"',
                titleFontSize: 20,
                bodyPadding: 0,
                showFooter: true,
                footerAs: 'footer',
                footerActionLabel: '',
            },
        })

        expect(source).toContain('as={"article"}')
        expect(source).toContain('borderRadius={10}')
        expect(source).toContain('title={"Account \\"settings\\""}')
        expect(source).toContain('titleProps={{"fontSize":20}}')
        expect(source).toContain('padding={0}')
        expect(source).toContain('<Card.Footer as={"footer"}>')
        expect(source).toContain('label={""}')
        expect(source).not.toContain('{{rootProps}}')
    })

    it('omits a hidden footer', () => {
        const source = createCardSource('', { args: { showFooter: false } })
        expect(source).not.toContain('<Card.Footer')
    })
})
