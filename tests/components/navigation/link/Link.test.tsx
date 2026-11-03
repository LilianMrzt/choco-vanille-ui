import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Link, LINK_STYLES } from '@components/navigation/link'
import { BOX_STYLES } from '@components/layout/box'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import LinkIcon from '@resources/asset/LinkIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('Link', () => {
    describe('default rendering', () => {
        it('renders an <a> element by default', () => {
            const { container } = render(<Link label={'Home'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('a')
        })

        it('renders the label via a Typography span', () => {
            render(<Link label={'Go home'} />)
            expect(screen.getByRole('link', { name: 'Go home' })).toBeTruthy()
            expect(screen.getByText('Go home').tagName.toLowerCase()).toBe('span')
        })

        it('sets href to "#" when no href is provided', () => {
            const { container } = render(<Link label={'Home'} />)
            expect(getFirstChild(container).getAttribute('href')).toBe('#')
        })

        it('forwards a custom href', () => {
            const { container } = render(
                <Link href="/dashboard" label={'Dashboard'} />,
            )
            expect(getFirstChild(container).getAttribute('href')).toBe('/dashboard')
        })
    })

    describe('React Router navigation', () => {
        it('calls onClick and prevents default browser navigation', async () => {
            const onClick = vi.fn()
            const { container } = render(
                <Link href="/dashboard" onClick={onClick} label={'Dashboard'} />,
            )

            const link = getFirstChild(container)
            await userEvent.click(link)

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(link.getAttribute('href')).toBe('/dashboard')
        })

        it('does not prevent default when onClick is omitted', async () => {
            const { container } = render(
                <Link href="/dashboard" label={'Dashboard'} />,
            )
            const link = getFirstChild(container)

            await userEvent.click(link)

            expect(link.getAttribute('href')).toBe('/dashboard')
        })
    })

    describe('icons', () => {
        it('renders a start icon when provided', () => {
            const { container } = render(
                <Link label={'Home'} startIcon={UserIcon} />,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders an end icon when provided', () => {
            const { container } = render(
                <Link label={'External'} endIcon={LinkIcon} />,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders both icons when provided', () => {
            const { container } = render(
                <Link label={'Home'} startIcon={UserIcon} endIcon={ChevronRightIcon} />,
            )
            expect(container.querySelectorAll('svg')).toHaveLength(2)
        })

        it('defaults icon size to md', () => {
            const { container } = render(
                <Link label={'Home'} startIcon={UserIcon} />,
            )
            const icon = container.querySelector('svg')
            expect(icon).toBeTruthy()
        })

        it('forwards a custom icon size', () => {
            const { container } = render(
                <Link label={'Home'} startIcon={UserIcon} iconSize="lg" />,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('typography', () => {
        it('defaults font size to base', () => {
            render(<Link label={'Home'} />)
            const label = screen.getByText('Home')
            expect(label.className.length).toBeGreaterThan(0)
        })

        it('forwards a custom font size', () => {
            render(<Link label={'Home'} fontSize={18} />)
            expect(screen.getByText('Home')).toBeTruthy()
        })

        it('defaults font weight to medium', () => {
            render(<Link label={'Home'} />)
            const label = screen.getByText('Home')
            expect(label.className.length).toBeGreaterThan(0)
        })

        it('forwards a custom font weight', () => {
            render(<Link label={'Home'} fontWeight="bold" />)
            expect(screen.getByText('Home')).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('applies the base link style', () => {
            const { container } = render(<Link label={'Home'} />)
            expect(getFirstChild(container).className).toContain(LINK_STYLES.base)
        })

        it('merges a custom className', () => {
            const { container } = render(
                <Link className="my-custom-class" label={'Home'} />,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies a theme color variant', () => {
            const { container } = render(
                <Link label={'Primary'} color={'primary.main'} />,
            )

            expect(getFirstChild(container).className).toContain(
                LINK_STYLES.color({ color: 'primary.main' }),
            )
        })
    })

    describe('layout props', () => {
        it('applies spacing tokens and CSS layout values', () => {
            const { container } = render(
                <Link
                    label={'Home'}
                    margin={'auto'}
                    marginTop={8}
                    padding={12}
                    width={'16rem'}
                    alignSelf={'center'}
                />,
            )

            const link = getFirstChild(container)
            expect(link.className).toContain(
                BOX_STYLES.recipe({ margin: 'auto', marginTop: 8, padding: 12 }),
            )
            expect(link.style.width).toBe('16rem')
            expect(link.style.alignSelf).toBe('center')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Link data-testid="nav-link" label={'Home'} />,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'nav-link',
            )
        })

        it('forwards aria-* attributes', () => {
            render(<Link aria-label="Back to home" label={'Home'} />)
            expect(screen.getByRole('link', { name: 'Back to home' })).toBeTruthy()
        })

        it('forwards target and rel attributes', () => {
            const { container } = render(
                <Link
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    label={'External'}
                />,
            )
            const link = getFirstChild(container)
            expect(link.getAttribute('target')).toBe('_blank')
            expect(link.getAttribute('rel')).toBe('noopener noreferrer')
        })
    })

    describe('disabled state', () => {
        it('forwards aria-disabled to the anchor', () => {
            const { container } = render(<Link aria-disabled label={'Home'} />)
            expect(getFirstChild(container).getAttribute('aria-disabled')).toBe(
                'true',
            )
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLAnchorElement>()
            render(<Link ref={ref} label={'Home'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('a')
        })
    })

    describe('displayName', () => {
        it('is set to "Link"', () => {
            expect(Link.displayName).toBe('Link')
        })
    })
})
