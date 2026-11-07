import { describe, expect, it } from 'vitest'

import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import { createButtonSource } from '@stories/actions/button/utils/create-button-source/createButtonSource.utils'

describe('createButtonSource', () => {
    it('reflects button controls and serializes label safely', () => {
        const source = createButtonSource('', {
            args: {
                label: 'Delete "item"',
                color: 'danger',
                size: 'sm',
                startIcon: TrashIcon,
                margin: 0,
                active: true,
                disabled: true,
                onClick: () => undefined,
            },
        })

        expect(source).toContain('label={"Delete \\"item\\""}')
        expect(source).toContain('color={"danger"}')
        expect(source).toContain('size={"sm"}')
        expect(source).toContain('margin={0}')
        expect(source).toContain('startIcon={TrashIcon}')
        expect(source).toContain(' active')
        expect(source).toContain(' disabled')
        expect(source).toContain('onClick={handleClick}')
    })

    it('represents a link without button-only props', () => {
        const source = createButtonSource('', { args: { label: 'Dashboard', href: '/dashboard' } })
        expect(source).toContain('href={"/dashboard"}')
        expect(source).not.toContain(' disabled')
    })
})
