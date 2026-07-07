import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.Footer', () => {
    it('renders a <tfoot> element', () => {
        render(
            <table>
                <Table.Footer>
                    <tr>
                        <td>Total</td>
                    </tr>
                </Table.Footer>
            </table>,
        )
        expect(document.querySelector('tfoot')).toBeTruthy()
        expect(screen.getByRole('row')).toBeTruthy()
    })

    it('merges a custom className', () => {
        render(
            <table>
                <Table.Footer className={'custom-footer'}>
                    <tr>
                        <td>Total</td>
                    </tr>
                </Table.Footer>
            </table>,
        )
        expect(document.querySelector('tfoot')!.className).toContain('custom-footer')
    })

    it('forwards data-* attributes', () => {
        render(
            <table>
                <Table.Footer data-testid={'table-footer'}>
                    <tr>
                        <td>Total</td>
                    </tr>
                </Table.Footer>
            </table>,
        )
        expect(screen.getByTestId('table-footer').tagName.toLowerCase()).toBe('tfoot')
    })

    it('forwards the ref to the <tfoot> element', () => {
        const ref = createRef<HTMLTableSectionElement>()
        render(
            <table>
                <Table.Footer ref={ref}>
                    <tr>
                        <td>Total</td>
                    </tr>
                </Table.Footer>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('tfoot')
    })

    it('displayName is "TableFooter"', () => {
        expect(Table.Footer.displayName).toBe('Table.Footer')
    })
})
