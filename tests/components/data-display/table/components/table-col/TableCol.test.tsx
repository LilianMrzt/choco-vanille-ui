import { createRef } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.Col', () => {
    it('renders a <col> element', () => {
        const { container } = render(
            <table>
                <colgroup>
                    <Table.Col />
                </colgroup>
            </table>,
        )
        expect(container.querySelector('col')).toBeTruthy()
    })

    it('applies width, minWidth and maxWidth as inline styles', () => {
        const { container } = render(
            <table>
                <colgroup>
                    <Table.Col width={'200px'} minWidth={'100px'} maxWidth={'300px'} />
                </colgroup>
            </table>,
        )
        const col = container.querySelector('col') as HTMLTable.ColElement
        expect(col.style.width).toBe('200px')
        expect(col.style.minWidth).toBe('100px')
        expect(col.style.maxWidth).toBe('300px')
    })

    it('merges custom style with width props', () => {
        const { container } = render(
            <table>
                <colgroup>
                    <Table.Col width={'50%'} style={{ backgroundColor: 'red' }} />
                </colgroup>
            </table>,
        )
        const col = container.querySelector('col') as HTMLTable.ColElement
        expect(col.style.width).toBe('50%')
        expect(col.style.backgroundColor).toBe('red')
    })

    it('forwards data-* attributes', () => {
        const { container } = render(
            <table>
                <colgroup>
                    <Table.Col data-testid={'table-col'} />
                </colgroup>
            </table>,
        )
        expect(container.querySelector('[data-testid="table-col"]')).toBeTruthy()
    })

    it('forwards the ref to the <col> element', () => {
        const ref = createRef<HTMLTable.ColElement>()
        render(
            <table>
                <colgroup>
                    <Table.Col ref={ref} />
                </colgroup>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('col')
    })

    it('displayName is "TableCol"', () => {
        expect(Table.Col.displayName).toBe('TableCol')
    })
})
