import { createRef, Fragment, StrictMode, type ComponentPropsWithRef, type CSSProperties } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { render, screen } from '@testing-library/react'
import { describe, expect, expectTypeOf, it } from 'vitest'

import { Drawer, type DrawerSectionTitleProps } from '@components/overlay/drawer'
import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/Typography.css'
import { vars } from '@theme/styles/contract/contract.css'

describe('Drawer.SectionTitle', () => {
    it('renders neutral 12px medium typography with 1.5 line height and original casing', () => {
        render(<Drawer.SectionTitle>Navigation</Drawer.SectionTitle>)

        const title = screen.getByText('Navigation')

        expect(title.tagName).toBe('SMALL')
        expect(title.style.lineHeight).toBe('1.5')
        expect(title.style.color).toBe(vars.color.surface.mutedForeground)
        expect(title.style.textTransform).toBe('')
        expect(title.className).toContain(TYPOGRAPHY_STYLES.recipe({
            variant: 'small',
            fontSize: 12,
            fontWeight: 'medium',
            clamp: true,
        }))
    })

    it('forwards typography, native attributes, composed content and a semantic element ref', () => {
        const ref = createRef<HTMLHeadingElement>()

        render(
            <Drawer.SectionTitle
                as="h2"
                ref={ref}
                className="custom-title"
                data-testid="title"
                lineHeight={2}
                textTransform="uppercase"
                style={{ lineHeight: 2.5 }}
            >
                Navigation <span>settings</span>
            </Drawer.SectionTitle>,
        )

        const title = screen.getByTestId('title')

        expect(title.tagName).toBe('H2')
        expect(ref.current).toBe(title)
        expect(title.className).toContain('custom-title')
        expect(title.style.lineHeight).toBe('2.5')
        expect(title.style.textTransform).toBe('uppercase')
        expect(screen.getByText('settings').parentElement).toBe(title)
        expect(title.hasAttribute('lineHeight')).toBe(false)
    })

    it('automatically labels its section and stays outside the item content wrapper', () => {
        render(
            <Drawer.Section data-testid="section">
                <Drawer.SectionTitle>Navigation</Drawer.SectionTitle>
                <div>Items</div>
            </Drawer.Section>,
        )

        const title = screen.getByText('Navigation')
        const section = screen.getByTestId('section')

        expect(title.id).not.toBe('')
        expect(section.getAttribute('aria-labelledby')).toBe(title.id)
        expect(title.parentElement).toBe(section)
        expect(title.nextElementSibling?.textContent).toBe('Items')
    })

    it('finds titles inside nested fragments and preserves the other children', () => {
        render(
            <Drawer.Section data-testid="section">
                <Fragment>
                    <Fragment>
                        <Drawer.SectionTitle id="navigation-title">Navigation</Drawer.SectionTitle>
                    </Fragment>
                    <div>First item</div>
                </Fragment>
                <div>Second item</div>
            </Drawer.Section>,
        )

        expect(screen.getByTestId('section').getAttribute('aria-labelledby')).toBe('navigation-title')
        expect(screen.getByText('First item')).toBeTruthy()
        expect(screen.getByText('Second item')).toBeTruthy()
    })

    it('preserves explicit section naming overrides', () => {
        render(
            <Drawer.Section aria-labelledby="external-title" data-testid="section">
                <Drawer.SectionTitle id="navigation-title">Navigation</Drawer.SectionTitle>
            </Drawer.Section>,
        )

        expect(screen.getByText('Navigation').id).toBe('navigation-title')
        expect(screen.getByTestId('section').getAttribute('aria-labelledby')).toBe('external-title')
    })

    it('keeps section labels instance-safe and stable during title changes in StrictMode', () => {
        const { rerender } = render(
            <StrictMode>
                <Drawer.Section data-testid="first"><Drawer.SectionTitle>First</Drawer.SectionTitle></Drawer.Section>
                <Drawer.Section data-testid="second"><Drawer.SectionTitle>Second</Drawer.SectionTitle></Drawer.Section>
            </StrictMode>,
        )
        const firstId = screen.getByText('First').id

        expect(firstId).not.toBe(screen.getByText('Second').id)

        rerender(
            <StrictMode>
                <Drawer.Section data-testid="first"><Drawer.SectionTitle>Updated</Drawer.SectionTitle></Drawer.Section>
                <Drawer.Section data-testid="second">Unlabelled</Drawer.Section>
            </StrictMode>,
        )

        expect(screen.getByText('Updated').id).toBe(firstId)
        expect(screen.getByTestId('first').getAttribute('aria-labelledby')).toBe(firstId)
        expect(screen.getByTestId('second').hasAttribute('aria-labelledby')).toBe(false)
    })

    it('renders the title relationship on the server without effects', () => {
        const container = document.createElement('div')
        container.innerHTML = renderToStaticMarkup(
            <Drawer.Section>
                <Drawer.SectionTitle>Navigation</Drawer.SectionTitle>
            </Drawer.Section>,
        )

        const title = container.querySelector('small')

        expect(title?.id).toBeTruthy()
        expect(container.querySelector('section')?.getAttribute('aria-labelledby')).toBe(title?.id)
    })

    it('rejects ambiguous title sources', () => {
        expect(() => renderToStaticMarkup(
            <Drawer.Section title="Shortcut">
                <Drawer.SectionTitle>Compound</Drawer.SectionTitle>
            </Drawer.Section>,
        )).toThrow('use Drawer.SectionTitle or title/titleProps, not both')

        expect(() => renderToStaticMarkup(
            <Drawer.Section>
                <Drawer.SectionTitle>First</Drawer.SectionTitle>
                <Fragment><Drawer.SectionTitle>Second</Drawer.SectionTitle></Fragment>
            </Drawer.Section>,
        )).toThrow('accepts only one Drawer.SectionTitle')
    })

    it('keeps typography and element ref types public', () => {
        expectTypeOf<DrawerSectionTitleProps['lineHeight']>().toEqualTypeOf<CSSProperties['lineHeight']>()
        expectTypeOf<DrawerSectionTitleProps<'h2'>['ref']>().toEqualTypeOf<ComponentPropsWithRef<'h2'>['ref']>()
    })
})
