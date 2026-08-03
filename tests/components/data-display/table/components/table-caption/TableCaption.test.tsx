import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '@components/data-display/table'

describe('TableCaption', () => {
    describe('default rendering', () => {
        it('renders a <caption> element', () => {
            render(
                <table>
                    <Table.Caption>My table caption</Table.Caption>
                </table>,
            )
            expect(document.querySelector('caption')).toBeTruthy()
        })

        it('renders the caption text content', () => {
            render(
                <table>
                    <Table.Caption>Annual revenue</Table.Caption>
                </table>,
            )
            expect(screen.getByText('Annual revenue')).toBeTruthy()
            expect(screen.getByText('Annual revenue').tagName.toLowerCase()).toBe('caption')
        })

        it('applies a non-empty className by default', () => {
            render(
                <table>
                    <Table.Caption>Caption text</Table.Caption>
                </table>,
            )
            expect(document.querySelector('caption')!.className.length).toBeGreaterThan(0)
        })
    })

    describe('className prop', () => {
        it('merges a custom className with the base styles', () => {
            render(
                <table>
                    <Table.Caption className={'my-caption'}>Caption</Table.Caption>
                </table>,
            )
            expect(document.querySelector('caption')!.className).toContain('my-caption')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(
                <table>
                    <Table.Caption data-testid={'table-caption'}>Caption</Table.Caption>
                </table>,
            )
            expect(screen.getByTestId('table-caption').tagName.toLowerCase()).toBe('caption')
        })

        it('forwards id attribute', () => {
            render(
                <table>
                    <Table.Caption id={'caption-id'}>Caption</Table.Caption>
                </table>,
            )
            expect(document.querySelector('caption')!.getAttribute('id')).toBe('caption-id')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the <caption> element', () => {
            const ref = createRef<HTMLTableCaptionElement>()
            render(
                <table>
                    <Table.Caption ref={ref}>Caption</Table.Caption>
                </table>,
            )
            expect(ref.current).not.toBeNull()
            expect(ref.current!.tagName.toLowerCase()).toBe('caption')
        })
    })

    describe('children', () => {
        it('renders arbitrary children inside the caption', () => {
            render(
                <table>
                    <Table.Caption>
                        <span data-testid={'caption-inner'}>Q4 Results</span>
                    </Table.Caption>
                </table>,
            )
            expect(screen.getByTestId('caption-inner').textContent).toBe('Q4 Results')
        })
    })

    describe('displayName', () => {
        it('is set to "Table.Caption"', () => {
            expect(Table.Caption.displayName).toBe('Table.Caption')
        })
    })
})
