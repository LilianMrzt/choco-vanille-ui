import { createRef, type CSSProperties } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { Typography, TYPOGRAPHY_STYLES, TYPOGRAPHY_ELEMENT_MAP, type TypographyProps, type TypographyVariant } from '@components/foundation/typography'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { FORM_LABEL_STYLES } from '@components/forms/primitives/form-label/styles/FormLabel.css.ts'
import { truncateTextStyles } from '@components/foundation/typography/utils/truncateTextStyles.utils.ts'

// Helpers

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

/** Class names present in `a` but not in `b` — used to isolate a variant's class. */
const onlyIn = (a: string, b: string): string[] => {
    const bSet = new Set(b.split(' '))
    return a.split(' ').filter((cls) => cls && !bSet.has(cls))
}

const variantClass = (variant: TypographyVariant): string =>
    onlyIn(TYPOGRAPHY_STYLES.recipe({ variant }), TYPOGRAPHY_STYLES.recipe({ variant: 'span' }))[0]

const fontSizeClass = (fontSize: 20 | 14): string =>
    onlyIn(TYPOGRAPHY_STYLES.recipe({ fontSize }), TYPOGRAPHY_STYLES.recipe({}))[0]

const fontWeightClass = (fontWeight: 'bold'): string =>
    onlyIn(TYPOGRAPHY_STYLES.recipe({ fontWeight }), TYPOGRAPHY_STYLES.recipe({}))[0]

const ellipsisClass = (): string =>
    onlyIn(TYPOGRAPHY_STYLES.recipe({ ellipsis: true }), TYPOGRAPHY_STYLES.recipe({}))[0]

// Suites

describe('Typography', () => {
    it('supports the complete numeric spacing scale for margins', () => {
        expect(Object.keys(TYPOGRAPHY_STYLES.recipe.classNames.variants.margin).filter(key => key !== 'auto'))
            .toEqual(Object.keys(vars.space))
    })

    it('supports every numeric font size, including 72, without changing its element', () => {
        expectTypeOf<TypographyProps['fontSize']>().toEqualTypeOf<keyof typeof vars.fontSize | undefined>()
        expectTypeOf<'14' | 15>().not.toMatchTypeOf<NonNullable<TypographyProps['fontSize']>>()
        expect(Object.keys(TYPOGRAPHY_STYLES.recipe.classNames.variants.fontSize))
            .toEqual(Object.keys(vars.fontSize))
        render(<Typography fontSize={72} variant="h1" margin={128}>Large heading</Typography>)
        const heading = screen.getByRole('heading', { level: 1, name: 'Large heading' })
        const classes = TYPOGRAPHY_STYLES.recipe({ variant: 'h1', fontSize: 72, margin: 128 })
        for (const className of classes.split(' ')) {
            expect(heading.classList.contains(className)).toBe(true)
        }
        expect(heading.hasAttribute('fontSize')).toBe(false)
        expect(heading.hasAttribute('margin')).toBe(false)
    })

    it('accepts CSS tracking values and preserves consumer style precedence', () => {
        expectTypeOf<TypographyProps['letterSpacing']>().toEqualTypeOf<CSSProperties['letterSpacing']>()
        const { rerender } = render(<Typography letterSpacing="0.025em">Tracked text</Typography>)
        expect(screen.getByText('Tracked text').style.letterSpacing).toBe('0.025em')
        expect(screen.getByText('Tracked text').hasAttribute('letterSpacing')).toBe(false)

        rerender(<Typography letterSpacing="0.025em" style={{ letterSpacing: '0.1em' }}>Tracked text</Typography>)
        expect(screen.getByText('Tracked text').style.letterSpacing).toBe('0.1em')
    })

    describe('CSS color contract', () => {
        it('accepts native CSS colors rather than theme token unions', () => {
            expectTypeOf<TypographyProps['color']>().toEqualTypeOf<CSSProperties['color']>()
        })

        it.each(['var(--custom-color)', 'var(--custom-color, hotpink)', 'currentColor', 'transparent', 'inherit', 'rebeccapurple', '#123456', 'rgb(12, 34, 56)'])(
            'applies %s without forwarding a color attribute',
            (color) => {
                render(<Typography color={color}>text</Typography>)
                const text = screen.getByText('text')
                const expected = document.createElement('span')
                expected.style.color = color

                expect(text.style.color).toBe(expected.style.color)
                expect(text.hasAttribute('color')).toBe(false)
            },
        )

        it('applies nested theme variable references directly', () => {
            render(<Typography color={vars.color.primary.main}>text</Typography>)
            expect(screen.getByText('text').style.color).toBe(vars.color.primary.main)
        })

        it('lets consumer style override color props and preserves custom classes', () => {
            render(<Typography color="red" className="interaction-colors" style={{ color: 'var(--consumer-color)' }}>text</Typography>)
            const text = screen.getByText('text')

            expect(text.style.color).toBe('var(--consumer-color)')
            expect(text.className).toContain('interaction-colors')
        })

        it.each(['span', 'label', 'blockquote', 'cite', 'mark'] as const)(
            'leaves %s defaults in CSS without inline colors',
            (variant) => {
                render(<Typography variant={variant} className="interaction-colors">text</Typography>)
                const text = screen.getByText('text')

                expect(text.style.color).toBe('')
                expect(text.style.backgroundColor).toBe('')
                expect(text.className).toContain('interaction-colors')
            },
        )
    })

    describe('semantic element rendering', () => {
        const variants = Object.keys(TYPOGRAPHY_ELEMENT_MAP) as TypographyVariant[]

        it.each(variants)('renders <%s> for variant="%s"', (variant) => {
            const { container } = render(<Typography variant={variant}>text</Typography>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe(variant)
        })

        it('defaults to <span> when no variant is provided', () => {
            const { container } = render(<Typography>text</Typography>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('span')
        })
    })

    describe('`as` prop override', () => {
        it('renders the `as` element instead of the variant element', () => {
            const { container } = render(
                <Typography variant="h1" as="span">heading</Typography>,
            )
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('span')
        })

        it('infers the visual variant from a known `as` element', () => {
            const { container } = render(<Typography as="h1">heading</Typography>)
            expect(getFirstChild(container).className).toContain(variantClass('h1'))
        })

        it('still applies the variant CSS classes when `as` is set', () => {
            const { container } = render(
                <Typography variant="h1" as="span">heading</Typography>,
            )
            expect(getFirstChild(container).className).toContain(variantClass('h1'))
        })
    })

    describe('children', () => {
        it('renders its text content', () => {
            render(<Typography variant="p">Hello world</Typography>)
            expect(screen.getByText('Hello world')).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('applies the fontSize class', () => {
            const { container } = render(<Typography fontSize={20}>text</Typography>)
            expect(getFirstChild(container).className).toContain(fontSizeClass(20))
        })

        it('applies the fontWeight class', () => {
            const { container } = render(<Typography fontWeight="bold">text</Typography>)
            expect(getFirstChild(container).className).toContain(fontWeightClass('bold'))
        })

        it('applies the margin token class', () => {
            const { container } = render(<Typography margin={12}>text</Typography>)
            expect(getFirstChild(container).className).toContain(
                TYPOGRAPHY_STYLES.recipe({ margin: 12 }).split(' ').at(-1),
            )
        })

        it('uses the shared form label style when the label font size is 14', () => {
            const { container, rerender } = render(
                <Typography variant="label">Label</Typography>,
            )
            expect(getFirstChild(container).className).toBe(TYPOGRAPHY_STYLES.recipe({ variant: 'label' }))

            rerender(<Typography variant="label" fontSize={14}>Label</Typography>)
            expect(getFirstChild(container).className).toBe(FORM_LABEL_STYLES.root)
        })

        it('applies the ellipsis class when ellipsis=true', () => {
            const { container } = render(<Typography ellipsis>text</Typography>)
            expect(getFirstChild(container).className).toContain(ellipsisClass())
        })

        it('does not apply the ellipsis class when ellipsis is not set', () => {
            const { container } = render(<Typography variant="p">text</Typography>)
            expect(getFirstChild(container).className).not.toContain(ellipsisClass())
        })

        const maxLinesClass = (maxLines: 1 | 2 | 3 | 4 | 5 | 6): string =>
            onlyIn(TYPOGRAPHY_STYLES.recipe({ maxLines }), TYPOGRAPHY_STYLES.recipe({}))[0]

        it('applies the maxLines class when maxLines is set', () => {
            const { container } = render(<Typography maxLines={2}>text</Typography>)
            expect(getFirstChild(container).className).toContain(maxLinesClass(2))
        })

        it('does not apply the maxLines class when maxLines is not set', () => {
            const { container } = render(<Typography>text</Typography>)
            expect(getFirstChild(container).className).not.toContain(maxLinesClass(2))
        })

        it('merges a custom className', () => {
            const { container } = render(
                <Typography className="my-custom-class">text</Typography>,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies the fontSize override class on top of the variant', () => {
            // h1 has its own font-size; fontSize={14} adds the sm class so it can override via cascade.
            const { container } = render(
                <Typography variant="h1" fontSize={14}>heading</Typography>,
            )
            const className = getFirstChild(container).className
            expect(className).toContain(fontSizeClass(14))
            expect(className).toContain(variantClass('h1'))
        })

        it('keeps truncated text wrapping at word boundaries by default', () => {
            expect(truncateTextStyles(2)).toMatchObject({
                overflowWrap: 'break-word',
                wordBreak: 'normal',
            })
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards arbitrary HTML attributes to the DOM element', () => {
            render(
                <Typography variant="abbr" title="HyperText Markup Language">
          HTML
                </Typography>,
            )
            expect(screen.getByText('HTML').getAttribute('title')).toBe(
                'HyperText Markup Language',
            )
        })

        it('forwards data-* attributes', () => {
            const { container } = render(
                <Typography data-testid="typo">text</Typography>,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('typo')
        })

        it('forwards aria-* attributes', () => {
            render(
                <Typography variant="p" aria-label="description">text</Typography>,
            )
            expect(screen.getByLabelText('description')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<Typography ref={ref}>text</Typography>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<Typography variant="h1" as="section" ref={ref}>text</Typography>)
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "Typography"', () => {
            expect(Typography.displayName).toBe('Typography')
        })
    })
})
