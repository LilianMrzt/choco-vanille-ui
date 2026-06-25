import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Typography, typographyRecipe, TYPOGRAPHY_ELEMENT_MAP, type TypographyVariant } from '@components/foundation/typography'

// Helpers

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

/** Class names present in `a` but not in `b` — used to isolate a variant's class. */
const onlyIn = (a: string, b: string): string[] => {
    const bSet = new Set(b.split(' '))
    return a.split(' ').filter((cls) => cls && !bSet.has(cls))
}

const variantClass = (variant: TypographyVariant): string =>
    onlyIn(typographyRecipe({ variant }), typographyRecipe({ variant: 'span' }))[0]

const fontSizeClass = (fontSize: 'xl' | 'sm'): string =>
    onlyIn(typographyRecipe({ fontSize }), typographyRecipe({}))[0]

const fontWeightClass = (fontWeight: 'bold'): string =>
    onlyIn(typographyRecipe({ fontWeight }), typographyRecipe({}))[0]

const ellipsisClass = (): string =>
    onlyIn(typographyRecipe({ ellipsis: true }), typographyRecipe({}))[0]

// Suites

describe('Typography', () => {
    describe('semantic element rendering', () => {
        const variants = Object.keys(TYPOGRAPHY_ELEMENT_MAP) as TypographyVariant[]

        it.each(variants)('renders <%s> for variant="%s"', (variant) => {
            const { container } = render(<Typography variant={variant}>text</Typography>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe(variant)
        })

        it('defaults to <p> when no variant is provided', () => {
            const { container } = render(<Typography>text</Typography>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('p')
        })
    })

    describe('`as` prop override', () => {
        it('renders the `as` element instead of the variant element', () => {
            const { container } = render(
                <Typography variant="h1" as="span">heading</Typography>,
            )
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('span')
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
            const { container } = render(<Typography fontSize="xl">text</Typography>)
            expect(getFirstChild(container).className).toContain(fontSizeClass('xl'))
        })

        it('applies the fontWeight class', () => {
            const { container } = render(<Typography fontWeight="bold">text</Typography>)
            expect(getFirstChild(container).className).toContain(fontWeightClass('bold'))
        })

        it('applies the ellipsis class when ellipsis=true', () => {
            const { container } = render(<Typography ellipsis>text</Typography>)
            expect(getFirstChild(container).className).toContain(ellipsisClass())
        })

        it('does not apply the ellipsis class when ellipsis is not set', () => {
            const { container } = render(<Typography variant="p">text</Typography>)
            expect(getFirstChild(container).className).not.toContain(ellipsisClass())
        })

        it('merges a custom className', () => {
            const { container } = render(
                <Typography className="my-custom-class">text</Typography>,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies the fontSize override class on top of the variant', () => {
            // h1 has its own font-size; fontSize="sm" adds the sm class so it can override via cascade.
            const { container } = render(
                <Typography variant="h1" fontSize="sm">heading</Typography>,
            )
            const className = getFirstChild(container).className
            expect(className).toContain(fontSizeClass('sm'))
            expect(className).toContain(variantClass('h1'))
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
            expect(ref.current!.tagName.toLowerCase()).toBe('p')
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
