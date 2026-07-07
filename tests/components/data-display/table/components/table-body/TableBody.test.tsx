import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.Body', () => {
    it('renders a <tbody> element', () => {
        render(
            <table>
                <Table.Body>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </Table.Body>
            </table>,
        )
        expect(document.querySelector('tbody')).toBeTruthy()
        expect(screen.getByRole('row')).toBeTruthy()
    })

    it('merges a custom className', () => {
        render(
            <table>
                <Table.Body className={'custom-body'}>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </Table.Body>
            </table>,
        )
        expect(document.querySelector('tbody')!.className).toContain('custom-body')
    })

    it('forwards data-* attributes', () => {
        render(
            <table>
                <Table.Body data-testid={'table-body'}>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </Table.Body>
            </table>,
        )
        expect(screen.getByTestId('table-body').tagName.toLowerCase()).toBe('tbody')
    })

    it('forwards the ref to the <tbody> element', () => {
        const ref = createRef<HTMLTableSectionElement>()
        render(
            <table>
                <Table.Body ref={ref}>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </Table.Body>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('tbody')
    })

    it('displayName is "TableBody"', () => {
        expect(Table.Body.displayName).toBe('Table.Body')
    })
})
