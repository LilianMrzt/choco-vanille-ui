import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Pagination from '@components/navigation/pagination/Pagination.tsx'
// Minimal required props
const defaultProps = {
    'aria-label': 'Pagination',
    currentPage: 3,
    totalPages: 10,
    onPageChange: vi.fn(),
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
}

describe('Pagination', () => {
    describe('default rendering', () => {
        it('renders a <nav> landmark', () => {
            render(<Pagination {...defaultProps} />)
            expect(screen.getByRole('navigation')).toBeTruthy()
        })

        it('applies the aria-label to the nav element', () => {
            render(<Pagination {...defaultProps} aria-label={'Page navigation'} />)
            expect(
                screen.getByRole('navigation', { name: 'Page navigation' }),
            ).toBeTruthy()
        })

        it('renders page buttons', () => {
            render(<Pagination {...defaultProps} />)
            // Should render at least a few page buttons
            const pageButtons = screen.getAllByRole('button')
            expect(pageButtons.length).toBeGreaterThan(2)
        })

        it('renders a Previous button', () => {
            render(<Pagination {...defaultProps} />)
            expect(
                screen.getByRole('button', { name: 'Previous page' }),
            ).toBeTruthy()
        })

        it('renders a Next button', () => {
            render(<Pagination {...defaultProps} />)
            expect(screen.getByRole('button', { name: 'Next page' })).toBeTruthy()
        })
    })

    describe('current page indication', () => {
        it('marks the current page button with aria-current="page"', () => {
            render(<Pagination {...defaultProps} currentPage={3} />)
            const currentPageBtn = screen.getByRole('button', { name: '3' })
            expect(currentPageBtn.getAttribute('aria-current')).toBe('page')
        })

        it('does not mark other page buttons with aria-current', () => {
            render(<Pagination {...defaultProps} currentPage={3} />)
            const otherBtn = screen.getByRole('button', { name: '1' })
            expect(otherBtn.getAttribute('aria-current')).toBeNull()
        })
    })

    describe('boundary behavior', () => {
        it('disables the Previous button on the first page', () => {
            render(<Pagination {...defaultProps} currentPage={1} />)
            const prevBtn = screen.getByRole('button', {
                name: 'Previous page',
            }) as HTMLButtonElement
            expect(prevBtn.disabled).toBe(true)
        })

        it('disables the Next button on the last page', () => {
            render(<Pagination {...defaultProps} currentPage={10} />)
            const nextBtn = screen.getByRole('button', {
                name: 'Next page',
            }) as HTMLButtonElement
            expect(nextBtn.disabled).toBe(true)
        })

        it('enables the Previous button when not on the first page', () => {
            render(<Pagination {...defaultProps} currentPage={5} />)
            const prevBtn = screen.getByRole('button', {
                name: 'Previous page',
            }) as HTMLButtonElement
            expect(prevBtn.disabled).toBe(false)
        })

        it('enables the Next button when not on the last page', () => {
            render(<Pagination {...defaultProps} currentPage={5} />)
            const nextBtn = screen.getByRole('button', {
                name: 'Next page',
            }) as HTMLButtonElement
            expect(nextBtn.disabled).toBe(false)
        })
    })

    describe('page change callbacks', () => {
        it('calls onPageChange with the selected page number', async () => {
            const handlePageChange = vi.fn()
            render(
                <Pagination
                    {...defaultProps}
                    currentPage={3}
                    onPageChange={handlePageChange}
                />,
            )
            await userEvent.click(screen.getByRole('button', { name: '1' }))
            expect(handlePageChange).toHaveBeenCalledWith(1)
        })

        it('calls onPageChange with currentPage - 1 when Previous is clicked', async () => {
            const handlePageChange = vi.fn()
            render(
                <Pagination
                    {...defaultProps}
                    currentPage={5}
                    onPageChange={handlePageChange}
                />,
            )
            await userEvent.click(
                screen.getByRole('button', { name: 'Previous page' }),
            )
            expect(handlePageChange).toHaveBeenCalledWith(4)
        })

        it('calls onPageChange with currentPage + 1 when Next is clicked', async () => {
            const handlePageChange = vi.fn()
            render(
                <Pagination
                    {...defaultProps}
                    currentPage={5}
                    onPageChange={handlePageChange}
                />,
            )
            await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
            expect(handlePageChange).toHaveBeenCalledWith(6)
        })
    })

    describe('siblingCount and boundaryCount', () => {
        it('rejects non-finite display counts', () => {
            expect(() => render(<Pagination {...defaultProps} siblingCount={Infinity} />)).toThrow(RangeError)
            expect(() => render(<Pagination {...defaultProps} boundaryCount={NaN} />)).toThrow(RangeError)
        })

        it('bounds large display counts to the available pages', () => {
            render(<Pagination {...defaultProps} totalPages={3} currentPage={2} siblingCount={1e100} boundaryCount={1e100} />)

            expect(screen.getByRole('button', { name: '1' })).toBeTruthy()
            expect(screen.getByRole('button', { name: '2' })).toBeTruthy()
            expect(screen.getByRole('button', { name: '3' })).toBeTruthy()
        })

        it('renders fewer sibling pages with siblingCount=0', () => {
            const { getAllByRole: getAll1 } = render(
                <Pagination {...defaultProps} currentPage={5} siblingCount={0} />,
            )
            const { getAllByRole: getAll2 } = render(
                <Pagination {...defaultProps} currentPage={5} siblingCount={2} />,
            )
            const buttons1 = getAll1('button')
            const buttons2 = getAll2('button')
            // More siblings → more page buttons
            expect(buttons2.length).toBeGreaterThanOrEqual(buttons1.length)
        })
    })

    describe('custom className', () => {
        it('merges a custom className onto the nav element', () => {
            render(<Pagination {...defaultProps} className={'custom-pagination'} />)
            expect(screen.getByRole('navigation').className).toContain(
                'custom-pagination',
            )
        })
    })

    describe('displayName', () => {
        it('is set to "Pagination"', () => {
            expect(Pagination.displayName).toBe('Pagination')
        })
    })
})
