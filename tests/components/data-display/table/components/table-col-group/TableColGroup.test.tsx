import { createRef } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.ColGroup', () => {
    it('renders a <colgroup> element', () => {
        const { container } = render(
            <table>
                <Table.ColGroup>
                    <col />
                </Table.ColGroup>
            </table>,
        )
        expect(container.querySelector('colgroup')).toBeTruthy()
    })

    it('merges a custom className', () => {
        const { container } = render(
            <table>
                <Table.ColGroup className={'custom-col-group'}>
                    <col />
                </Table.ColGroup>
            </table>,
        )
        expect(container.querySelector('colgroup')!.className).toContain('custom-col-group')
    })

    it('forwards data-* attributes', () => {
        const { container } = render(
            <table>
                <Table.ColGroup data-testid={'table-col-group'}>
                    <col />
                </Table.ColGroup>
            </table>,
        )
        expect(container.querySelector('[data-testid="table-col-group"]')).toBeTruthy()
    })

    it('forwards the ref to the <colgroup> element', () => {
        const ref = createRef<HTMLTableColElement>()
        render(
            <table>
                <Table.ColGroup ref={ref}>
                    <col />
                </Table.ColGroup>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('colgroup')
    })

    it('displayName is "TableColGroup"', () => {
        expect(Table.ColGroup.displayName).toBe('Table.ColGroup')
    })
})
