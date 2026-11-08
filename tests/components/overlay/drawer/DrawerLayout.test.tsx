import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, expectTypeOf, it } from 'vitest'

import { Drawer, type DrawerBodyProps, type DrawerHeaderProps, type DrawerFooterProps } from '@components/overlay/drawer'
import { BOX_STYLES } from '@components/layout/box/Box.css.ts'

describe('Drawer layout slots', () => {
    it('renders the body as a scrollable column so gap applies without a wrapper', () => {
        render(<Drawer.Body as="nav" aria-label="Navigation" data-testid="body">Content</Drawer.Body>)

        const body = screen.getByRole('navigation', { name: 'Navigation' })

        expect(body.style.flexDirection).toBe('column')
        expect(body.className).toContain(BOX_STYLES.recipe({ gap: 12 }))
        expect(body.style.overflowY).toBe('auto')
        expect(body.style.minHeight).toBe('0px')
    })

    it('forwards layout overrides, semantic elements, native attributes and refs', () => {
        const bodyRef = createRef<HTMLDivElement>()
        const headerRef = createRef<HTMLDivElement>()
        const footerRef = createRef<HTMLDivElement>()

        render(
            <>
                <Drawer.Header as="header" ref={headerRef} gap={16} padding={8} flexDirection="column" data-testid="header">Header</Drawer.Header>
                <Drawer.Body as="nav" ref={bodyRef} gap={20} padding={16} flexDirection="row" flexWrap="wrap" data-testid="body">Body</Drawer.Body>
                <Drawer.Footer as="footer" ref={footerRef} gap={12} flexDirection="column" justifyContent="start" data-testid="footer">Footer</Drawer.Footer>
            </>,
        )

        const header = screen.getByTestId('header')
        const body = screen.getByTestId('body')
        const footer = screen.getByTestId('footer')

        expect(header.tagName).toBe('HEADER')
        expect(header.className).toContain(BOX_STYLES.recipe({ gap: 16, padding: 8 }))
        expect(header.style.flexDirection).toBe('column')
        expect(headerRef.current).toBe(header)
        expect(body.tagName).toBe('NAV')
        expect(body.className).toContain(BOX_STYLES.recipe({ gap: 20, padding: 16 }))
        expect(body.style.flexDirection).toBe('row')
        expect(body.style.flexWrap).toBe('wrap')
        expect(bodyRef.current).toBe(body)
        expect(footer.tagName).toBe('FOOTER')
        expect(footer.className).toContain(BOX_STYLES.recipe({ gap: 12 }))
        expect(footer.style.flexDirection).toBe('column')
        expect(footer.style.justifyContent).toBe('start')
        expect(footerRef.current).toBe(footer)
        expect(body.hasAttribute('gap')).toBe(false)
    })

    it('uses the same finite gap token contract on every layout slot', () => {
        expectTypeOf<DrawerBodyProps['gap']>().toEqualTypeOf<DrawerHeaderProps['gap']>()
        expectTypeOf<DrawerBodyProps['gap']>().toEqualTypeOf<DrawerFooterProps['gap']>()
    })
})
