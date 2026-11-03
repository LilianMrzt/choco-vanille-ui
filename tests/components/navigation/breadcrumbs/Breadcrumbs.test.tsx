import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import {
    Breadcrumbs,
    BREADCRUMBS_STYLES,
} from '@components/navigation/breadcrumbs'

const breadcrumbItems = [
    <Breadcrumbs.Item key={'home'} label={'Home'} href={'/'} />,
    <Breadcrumbs.Item key={'products'} label={'Products'} href={'/products'} />,
    <Breadcrumbs.Item key={'details'} label={'Details'} />,
]

describe('Breadcrumbs', () => {
    it('renders compound items in a named navigation landmark and ordered list', () => {
        render(
            <Breadcrumbs aria-label="Breadcrumb">{breadcrumbItems}</Breadcrumbs>,
        )

        expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy()
        expect(screen.getByRole('list')).toBeTruthy()
        expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it('renders linked ancestors and marks the last item as current', () => {
        render(
            <Breadcrumbs aria-label="Breadcrumb">{breadcrumbItems}</Breadcrumbs>,
        )

        expect(
            screen.getByRole('link', { name: 'Home' }).getAttribute('href'),
        ).toBe('/')
        expect(
            screen.getByRole('link', { name: 'Products' }).getAttribute('href'),
        ).toBe('/products')
        expect(screen.getByText('Details').getAttribute('aria-current')).toBe(
            'page',
        )
    })

    it('supports an explicitly current item', () => {
        render(
            <Breadcrumbs aria-label="Breadcrumb">
                <Breadcrumbs.Item label={'Home'} href={'/'} />
                <Breadcrumbs.Item label={'Products'} href={'/products'} current />
                <Breadcrumbs.Item label={'Details'} href={'/products/details'} />
            </Breadcrumbs>,
        )

        expect(screen.getByText('Products').getAttribute('aria-current')).toBe(
            'page',
        )
        expect(screen.queryByRole('link', { name: 'Products' })).toBeNull()
        expect(screen.getByRole('link', { name: 'Details' })).toBeTruthy()
    })

    it('forwards its color to links and allows item overrides', () => {
        const { container } = render(
            <Breadcrumbs aria-label="Breadcrumb" color="primary.main">
                <Breadcrumbs.Item label={'Home'} href={'/'} color={'secondary.main'} />
                <Breadcrumbs.Item label={'Details'} />
            </Breadcrumbs>,
        )

        const links = container.querySelectorAll('a')
        expect(links[0].className).toContain('color_secondary')
        expect(links[0].className).not.toContain('color_primary')
    })

    it('forwards link events and attributes from an item', async () => {
        const onClick = vi.fn()
        const user = userEvent.setup()

        render(
            <Breadcrumbs aria-label="Breadcrumb">
                <Breadcrumbs.Item
                    label={'Home'}
                    href={'/'}
                    onClick={onClick}
                    data-testid="home-breadcrumb"
                />
                <Breadcrumbs.Item label={'Details'} />
            </Breadcrumbs>,
        )

        const home = screen.getByTestId('home-breadcrumb')
        await user.click(home)

        expect(home.getAttribute('href')).toBe('/')
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('renders separators between items', () => {
        const { container } = render(
            <Breadcrumbs aria-label="Breadcrumb">{breadcrumbItems}</Breadcrumbs>,
        )

        expect(container.querySelectorAll('svg')).toHaveLength(2)
    })

    it('renders text separators as decorative text', () => {
        const { container, rerender } = render(
            <Breadcrumbs aria-label="Slash breadcrumb" separator="slash">
                {breadcrumbItems}
            </Breadcrumbs>,
        )

        expect(container.querySelectorAll('svg')).toHaveLength(0)
        expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2)
        expect(container.textContent).toContain('/')

        rerender(
            <Breadcrumbs aria-label="Dot breadcrumb" separator="dot">
                {breadcrumbItems}
            </Breadcrumbs>,
        )
        expect(container.textContent).toContain('·')

        rerender(
            <Breadcrumbs
                aria-label="Reverse slash breadcrumb"
                separator="reverseSlash"
            >
                {breadcrumbItems}
            </Breadcrumbs>,
        )
        expect(container.textContent).toContain('\\')

        rerender(
            <Breadcrumbs aria-label="Dash breadcrumb" separator="dash">
                {breadcrumbItems}
            </Breadcrumbs>,
        )
        expect(container.textContent).toContain('-')
    })

    it('forwards className and ref to the navigation landmark', () => {
        const ref = createRef<HTMLElement>()

        render(
            <Breadcrumbs
                aria-label="Breadcrumb"
                className="custom-breadcrumbs"
                ref={ref}
            >
                {breadcrumbItems}
            </Breadcrumbs>,
        )

        expect(ref.current?.className).toContain('custom-breadcrumbs')
        expect(ref.current?.getAttribute('aria-label')).toBe('Breadcrumb')
    })

    it('exports its public styles', () => {
        expect(BREADCRUMBS_STYLES.list).toBeTruthy()
    })
})
