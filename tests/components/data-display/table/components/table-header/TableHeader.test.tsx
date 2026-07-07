import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.Header', () => {
    it('renders a <thead> element', () => {
        render(
            <table>
                <Table.Header>
                    <tr>
                        <th>Col</th>
                    </tr>
                </Table.Header>
            </table>,
        )
        expect(document.querySelector('thead')).toBeTruthy()
        expect(screen.getByRole('columnheader')).toBeTruthy()
    })

    it('merges a custom className', () => {
        render(
            <table>
                <Table.Header className={'custom-header'}>
                    <tr>
                        <th>Col</th>
                    </tr>
                </Table.Header>
            </table>,
        )
        expect(document.querySelector('thead')!.className).toContain('custom-header')
    })

    it('forwards data-* attributes', () => {
        render(
            <table>
                <Table.Header data-testid={'table-header'}>
                    <tr>
                        <th>Col</th>
                    </tr>
                </Table.Header>
            </table>,
        )
        expect(screen.getByTestId('table-header').tagName.toLowerCase()).toBe('thead')
    })

    it('forwards the ref to the <thead> element', () => {
        const ref = createRef<HTMLTableSectionElement>()
        render(
            <table>
                <Table.Header ref={ref}>
                    <tr>
                        <th>Col</th>
                    </tr>
                </Table.Header>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('thead')
    })

    it('displayName is "TableHeader"', () => {
        expect(Table.Header.displayName).toBe('Table.Header')
    })
})
