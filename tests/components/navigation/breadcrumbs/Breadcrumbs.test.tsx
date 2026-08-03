import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { Breadcrumbs, BREADCRUMBS_STYLES } from '@components/navigation/breadcrumbs'

beforeAll(() => {
    addIcon('lucide:chevron-right', {
        body: '<path d="m9 18 6-6-6-6"/>',
        width: 24,
        height: 24,
    })
})

const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details' },
]

describe('Breadcrumbs', () => {
    it('renders a named navigation landmark and ordered list', () => {
        render(<Breadcrumbs aria-label="Breadcrumb" items={items} />)

        expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy()
        expect(screen.getByRole('list')).toBeTruthy()
        expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it('renders linked ancestors and marks the last item as current', () => {
        render(<Breadcrumbs aria-label="Breadcrumb" items={items} />)

        expect(screen.getByRole('link', { name: 'Home' }).getAttribute('href')).toBe('/')
        expect(screen.getByRole('link', { name: 'Products' }).getAttribute('href')).toBe(
            '/products',
        )
        expect(screen.getByText('Details').getAttribute('aria-current')).toBe('page')
    })

    it('supports an explicitly current item', () => {
        render(
            <Breadcrumbs
                aria-label="Breadcrumb"
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products', current: true },
                    { label: 'Details', href: '/products/details' },
                ]}
            />,
        )

        expect(screen.getByText('Products').getAttribute('aria-current')).toBe('page')
        expect(screen.queryByRole('link', { name: 'Products' })).toBeNull()
        expect(screen.getByRole('link', { name: 'Details' })).toBeTruthy()
    })

    it('forwards its color to links and allows item overrides', () => {
        const { container } = render(
            <Breadcrumbs
                aria-label="Breadcrumb"
                color="primary"
                items={[
                    { label: 'Home', href: '/', color: 'secondary' },
                    { label: 'Details' },
                ]}
            />,
        )

        const links = container.querySelectorAll('a')
        expect(links[0].className).toContain('color_secondary')
        expect(links[0].className).not.toContain('color_primary')
    })

    it('renders separators between items', () => {
        const { container } = render(<Breadcrumbs aria-label="Breadcrumb" items={items} />)

        expect(container.querySelectorAll('svg')).toHaveLength(2)
    })

    it('renders text separators as decorative text', () => {
        const { container, rerender } = render(
            <Breadcrumbs
                aria-label="Slash breadcrumb"
                separator="slash"
                items={items}
            />,
        )

        expect(container.querySelectorAll('svg')).toHaveLength(0)
        expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2)
        expect(container.textContent).toContain('/')

        rerender(
            <Breadcrumbs
                aria-label="Dot breadcrumb"
                separator="dot"
                items={items}
            />,
        )

        expect(container.textContent).toContain('·')

        rerender(
            <Breadcrumbs
                aria-label="Reverse slash breadcrumb"
                separator="reverseSlash"
                items={items}
            />,
        )
        expect(container.textContent).toContain('\\')

        rerender(
            <Breadcrumbs
                aria-label="Dash breadcrumb"
                separator="dash"
                items={items}
            />,
        )
        expect(container.textContent).toContain('-')
    })

    it('forwards className and ref to the navigation landmark', () => {
        const ref = createRef<HTMLElement>()

        render(
            <Breadcrumbs
                aria-label="Breadcrumb"
                items={items}
                className="custom-breadcrumbs"
                ref={ref}
            />,
        )

        expect(ref.current?.className).toContain('custom-breadcrumbs')
        expect(ref.current?.getAttribute('aria-label')).toBe('Breadcrumb')
    })

    it('exports its public styles', () => {
        expect(BREADCRUMBS_STYLES.list).toBeTruthy()
    })
})
