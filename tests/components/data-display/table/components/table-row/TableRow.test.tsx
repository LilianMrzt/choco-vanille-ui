import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.Row', () => {
    it('renders a <tr> element', () => {
        render(
            <table>
                <tbody>
                    <Table.Row>
                        <td>Cell</td>
                    </Table.Row>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row')).toBeTruthy()
    })

    describe('variant behavior', () => {
        it('applies className when hoverable', () => {
            render(
                <table>
                    <tbody>
                        <Table.Row hoverable>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            expect(screen.getByRole('row').className.length).toBeGreaterThan(0)
        })

        it('applies className when selectable', () => {
            render(
                <table>
                    <tbody>
                        <Table.Row selectable>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            const row = screen.getByRole('row')
            expect(row.className.length).toBeGreaterThan(0)
            expect(row.tabIndex).toBe(0)
            expect(row.getAttribute('aria-selected')).toBe('false')
        })

        it('sets aria-selected to true when selected', () => {
            render(
                <table>
                    <tbody>
                        <Table.Row selectable selected>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            expect(screen.getByRole('row').getAttribute('aria-selected')).toBe('true')
        })

        it('does not set aria-selected when not selectable', () => {
            render(
                <table>
                    <tbody>
                        <Table.Row selected>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            expect(screen.getByRole('row').getAttribute('aria-selected')).toBeNull()
        })

        it('applies className for each intent variant', () => {
            const intents = ['success', 'warning', 'destructive', 'info'] as const
            const { rerender } = render(
                <table>
                    <tbody>
                        <Table.Row intent={'success'}>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            for (const intent of intents) {
                rerender(
                    <table>
                        <tbody>
                            <Table.Row intent={intent}>
                                <td>Cell</td>
                            </Table.Row>
                        </tbody>
                    </table>,
                )
                expect(screen.getByRole('row').className.length).toBeGreaterThan(0)
                expect(screen.getByRole('row').getAttribute('data-intent')).toBe(intent)
            }
        })
    })

    describe('keyboard interaction', () => {
        it('triggers click on Enter when selectable', () => {
            const handleClick = vi.fn()
            render(
                <table>
                    <tbody>
                        <Table.Row selectable onClick={handleClick}>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            const row = screen.getByRole('row')
            fireEvent.keyDown(row, { key: 'Enter' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('triggers click on Space when selectable', () => {
            const handleClick = vi.fn()
            render(
                <table>
                    <tbody>
                        <Table.Row selectable onClick={handleClick}>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            const row = screen.getByRole('row')
            fireEvent.keyDown(row, { key: ' ' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not trigger click on Enter when not selectable', () => {
            const handleClick = vi.fn()
            render(
                <table>
                    <tbody>
                        <Table.Row onClick={handleClick}>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            const row = screen.getByRole('row')
            fireEvent.keyDown(row, { key: 'Enter' })
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('calls custom onKeyDown during selectable Enter handling', () => {
            const handleKeyDown = vi.fn()
            render(
                <table>
                    <tbody>
                        <Table.Row selectable onKeyDown={handleKeyDown}>
                            <td>Cell</td>
                        </Table.Row>
                    </tbody>
                </table>,
            )
            const row = screen.getByRole('row')
            fireEvent.keyDown(row, { key: 'Enter' })
            expect(handleKeyDown).toHaveBeenCalledTimes(1)
        })
    })

    it('merges a custom className', () => {
        render(
            <table>
                <tbody>
                    <Table.Row className={'custom-row'}>
                        <td>Cell</td>
                    </Table.Row>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row').className).toContain('custom-row')
    })

    it('forwards data-* attributes', () => {
        render(
            <table>
                <tbody>
                    <Table.Row data-testid={'table-row'}>
                        <td>Cell</td>
                    </Table.Row>
                </tbody>
            </table>,
        )
        expect(screen.getByTestId('table-row').tagName.toLowerCase()).toBe('tr')
    })

    it('forwards the ref to the <tr> element', () => {
        const ref = createRef<HTMLTableRowElement>()
        render(
            <table>
                <tbody>
                    <Table.Row ref={ref}>
                        <td>Cell</td>
                    </Table.Row>
                </tbody>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('tr')
    })

    it('displayName is "TableRow"', () => {
        expect(Table.Row.displayName).toBe('Table.Row')
    })
})
