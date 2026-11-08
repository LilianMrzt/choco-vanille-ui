import {
    createRef,
    type ComponentPropsWithRef,
    type CSSProperties,
} from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import {
    Typography,
    TYPOGRAPHY_STYLES,
    TYPOGRAPHY_ELEMENT_MAP,
    type TypographyProps,
    type TypographyVariant,
} from '@components/foundation/typography'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { BOX_STYLES } from '@components/layout/box'
import { FORM_LABEL_STYLES } from '@components/forms/primitives/form-label/styles/FormLabel.css.ts'
import { truncateTextStyles } from '@components/foundation/typography/utils/truncateTextStyles.utils.ts'
import { resolveTypographyProps } from '@components/foundation/typography/utils/resolveTypographyProps.utils'

// Helpers

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

/** Class names present in `a` but not in `b` — used to isolate a variant's class. */
const onlyIn = (a: string, b: string): string[] => {
    const bSet = new Set(b.split(' '))
    return a.split(' ').filter((cls) => cls && !bSet.has(cls))
}

const variantClass = (variant: TypographyVariant): string =>
    onlyIn(
        TYPOGRAPHY_STYLES.recipe({ variant }),
        TYPOGRAPHY_STYLES.recipe({ variant: 'span' }),
    )[0]

const fontSizeClass = (fontSize: 20 | 14): string =>
    onlyIn(
        TYPOGRAPHY_STYLES.recipe({ fontSize }),
        TYPOGRAPHY_STYLES.recipe({}),
    )[0]

const fontWeightClass = (fontWeight: 'bold'): string =>
    onlyIn(
        TYPOGRAPHY_STYLES.recipe({ fontWeight }),
        TYPOGRAPHY_STYLES.recipe({}),
    )[0]

const ellipsisClass = (): string =>
    onlyIn(
        TYPOGRAPHY_STYLES.recipe({ ellipsis: true }),
        TYPOGRAPHY_STYLES.recipe({}),
    )[0]

const CustomLink = ({
    destination,
    ...props
}: ComponentPropsWithRef<'a'> & { destination: string }) => (
    <a href={destination} {...props} />
)

// Suites

describe('Typography', () => {
    it('supports shared layout and explicit text overrides without leaking styling props', () => {
        render(
            <Typography
                variant="em"
                padding={8}
                marginX="auto"
                width="12rem"
                fontFamily="serif"
                fontStyle="normal"
                verticalAlign="middle"
                lineHeight={1.6}
                whiteSpace="pre-wrap"
                overflowWrap="anywhere"
                wordBreak="keep-all"
                textWrap="balance"
                textDecoration="underline"
                data-testid="text-layout"
            >
                Readable text
            </Typography>,
        )
        const text = screen.getByTestId('text-layout')
        expect(text.tagName).toBe('EM')
        expect(text.style.width).toBe('12rem')
        expect(text.style.fontFamily).toBe(vars.fontFamily.serif)
        expect(text.style.fontStyle).toBe('normal')
        expect(text.style.verticalAlign).toBe('middle')
        expect(text.style.lineHeight).toBe('1.6')
        expect(text.style.whiteSpace).toBe('pre-wrap')
        expect(text.style.overflowWrap).toBe('anywhere')
        expect(text.style.wordBreak).toBe('keep-all')
        expect(text.style.getPropertyValue('text-wrap')).toBe('balance')
        expect(text.style.textDecoration).toBe('underline')
        for (const key of [
            'variant',
            'padding',
            'marginX',
            'fontFamily',
            'fontStyle',
            'verticalAlign',
            'lineHeight',
            'whiteSpace',
            'overflowWrap',
            'wordBreak',
            'textWrap',
            'textDecoration',
        ]) {
            expect(text.hasAttribute(key)).toBe(false)
        }
    })

    it('supports arbitrary positive integer line limits and resets their inline value', () => {
        const { rerender } = render(
            <Typography ellipsis maxLines={12}>
                Long text
            </Typography>,
        )
        const text = screen.getByText('Long text')
        expect(text.style.getPropertyValue('-webkit-line-clamp')).toBe('12')
        expect(text.className).toContain(
            TYPOGRAPHY_STYLES.recipe.classNames.variants.clamp.true,
        )
        expect(text.className).not.toContain(ellipsisClass())
        rerender(
            <Typography maxLines={8} style={{ WebkitLineClamp: 3 }}>
                Long text
            </Typography>,
        )
        expect(text.style.getPropertyValue('-webkit-line-clamp')).toBe('3')
        rerender(<Typography>Long text</Typography>)
        expect(text.style.getPropertyValue('-webkit-line-clamp')).toBe('')
        expect(text.style.cssText).toBe('')
        expect(text.className).not.toContain(
            TYPOGRAPHY_STYLES.recipe.classNames.variants.clamp.true,
        )
    })

    it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
        'rejects invalid line limit %s',
        (maxLines) => {
            expect(() => resolveTypographyProps({ maxLines })).toThrow(
                'positive integer',
            )
        },
    )

    it.each([
        { variant: 'invalid' },
        { fontSize: '14' },
        { fontSize: 15 },
        { fontWeight: 'invalid' },
        { fontFamily: 'invalid' },
        { lineHeight: Number.NaN },
        { ellipsis: 'yes' },
    ])('rejects invalid text styling: %j', (props) => {
        expect(() => resolveTypographyProps(props)).toThrow(TypeError)
    })

    it('infers props and refs from as or the semantic variant', () => {
        expectTypeOf<TypographyProps<'label'>['htmlFor']>().toEqualTypeOf<
            string | undefined
        >()
        expectTypeOf<TypographyProps<'label'>['ref']>().toEqualTypeOf<
            React.Ref<HTMLLabelElement> | undefined
        >()
        expectTypeOf<
            TypographyProps<typeof CustomLink>['destination']
        >().toEqualTypeOf<string>()

        const label = (
            <Typography
                variant="label"
                htmlFor="field"
                ref={createRef<HTMLLabelElement>()}
            >
                Label
            </Typography>
        )
        const anchor = (
            <Typography
                as="a"
                variant="h1"
                href="/example"
                ref={createRef<HTMLAnchorElement>()}
            >
                Link
            </Typography>
        )
        const custom = (
            <Typography
                as={CustomLink}
                destination="/custom"
                ref={createRef<HTMLAnchorElement>()}
            >
                Custom
            </Typography>
        )
        // @ts-expect-error The default span has no htmlFor.
        const invalidDefault = <Typography htmlFor="field" />
        const invalidVariantRef = (
            // @ts-expect-error The variant determines the ref when as is omitted.
            <Typography variant="label" ref={createRef<HTMLAnchorElement>()} />
        )
        const invalidAsRef = (
            <Typography
                // @ts-expect-error The as element takes precedence over variant for the ref.
                as="a"
                variant="label"
                ref={createRef<HTMLLabelElement>()}
            />
        )
        // @ts-expect-error Custom component requirements are preserved.
        const missingDestination = <Typography as={CustomLink} />
        // @ts-expect-error An explicit non-default element needs as or its matching variant.
        const missingElement = <Typography<'label'> htmlFor="field" />

        expect([
            label,
            anchor,
            custom,
            invalidDefault,
            invalidVariantRef,
            invalidAsRef,
            missingDestination,
            missingElement,
        ]).toHaveLength(8)
    })

    it('forwards variant-specific attributes, events and refs', async () => {
        const ref = createRef<HTMLLabelElement>()
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(
            <Typography
                variant="label"
                htmlFor="field"
                ref={ref}
                onClick={handleClick}
            >
                Name
            </Typography>,
        )
        const label = screen.getByText('Name')
        await user.click(label)

        expect(ref.current).toBe(label)
        expect(label.getAttribute('for')).toBe('field')
        expect(handleClick).toHaveBeenCalledOnce()
    })

    it('forwards custom component attributes, classes, styles and refs', () => {
        const ref = createRef<HTMLAnchorElement>()
        render(
            <Typography
                as={CustomLink}
                variant="h1"
                destination="/custom"
                ref={ref}
                color="red"
                className="consumer"
            >
                Custom
            </Typography>,
        )
        const link = screen.getByRole('link', { name: 'Custom' })

        expect(ref.current).toBe(link)
        expect(link.getAttribute('href')).toBe('/custom')
        expect(link.className).toContain('consumer')
        expect(link.className).toContain(variantClass('h1'))
        expect(link.style.color).toBe('red')
        expect(link.hasAttribute('destination')).toBe(false)
    })

    it('renders the selected semantic element and attributes on the server', () => {
        const markup = renderToStaticMarkup(
            <Typography variant="label" htmlFor="name" color="rebeccapurple">
                Name
            </Typography>,
        )

        expect(markup).toContain('<label')
        expect(markup).toContain('for="name"')
        expect(markup).toContain('color:rebeccapurple')
        expect(markup).not.toContain('variant=')
    })

    it('updates truncation classes and respects an explicit inline display', () => {
        const { rerender } = render(
            <Typography ellipsis maxWidth="8rem" display="block">
                Text
            </Typography>,
        )
        const text = screen.getByText('Text')

        expect(text.className).toContain(ellipsisClass())
        expect(text.style.display).toBe('block')
        rerender(
            <Typography ellipsis maxLines={2} style={{ display: 'flex' }}>
                Text
            </Typography>,
        )
        expect(text.className).toContain(
            TYPOGRAPHY_STYLES.recipe.classNames.variants.clamp.true,
        )
        expect(text.className).not.toContain(ellipsisClass())
        expect(text.style.getPropertyValue('-webkit-line-clamp')).toBe('2')
        expect(text.style.display).toBe('flex')
        rerender(<Typography ellipsis>Text</Typography>)
        expect(text.className).toContain(ellipsisClass())
        expect(text.style.getPropertyValue('-webkit-line-clamp')).toBe('')
        expect(text.style.display).toBe('')
    })

    it('supports the complete numeric spacing scale for margins', () => {
        expect(
            Object.keys(BOX_STYLES.recipe.classNames.variants.margin).filter(
                (key) => key !== 'auto',
            ),
        ).toEqual(Object.keys(vars.space))
    })

    it('supports every numeric font size, including 72, without changing its element', () => {
        expectTypeOf<TypographyProps['fontSize']>().toEqualTypeOf<
            keyof typeof vars.fontSize | undefined
        >()
        expectTypeOf<'14' | 15>().not.toMatchTypeOf<
            NonNullable<TypographyProps['fontSize']>
        >()
        expect(
            Object.keys(TYPOGRAPHY_STYLES.recipe.classNames.variants.fontSize),
        ).toEqual(Object.keys(vars.fontSize))
        render(
            <Typography fontSize={72} variant="h1" margin={128}>
                Large heading
            </Typography>,
        )
        const heading = screen.getByRole('heading', {
            level: 1,
            name: 'Large heading',
        })
        const classes =
            TYPOGRAPHY_STYLES.recipe({ variant: 'h1', fontSize: 72 }) +
            ' ' +
            BOX_STYLES.recipe({ margin: 128 })
        for (const className of classes.split(' ')) {
            expect(heading.classList.contains(className)).toBe(true)
        }
        expect(heading.hasAttribute('fontSize')).toBe(false)
        expect(heading.hasAttribute('margin')).toBe(false)
    })

    it('accepts CSS tracking values and preserves consumer style precedence', () => {
        expectTypeOf<TypographyProps['letterSpacing']>().toEqualTypeOf<
            CSSProperties['letterSpacing']
        >()
        const { rerender } = render(
            <Typography letterSpacing="0.025em">Tracked text</Typography>,
        )
        expect(screen.getByText('Tracked text').style.letterSpacing).toBe(
            '0.025em',
        )
        expect(
            screen.getByText('Tracked text').hasAttribute('letterSpacing'),
        ).toBe(false)

        rerender(
            <Typography
                letterSpacing="0.025em"
                style={{ letterSpacing: '0.1em' }}
            >
                Tracked text
            </Typography>,
        )
        expect(screen.getByText('Tracked text').style.letterSpacing).toBe(
            '0.1em',
        )
    })

    describe('CSS color contract', () => {
        it('accepts native CSS colors rather than theme token unions', () => {
            expectTypeOf<TypographyProps['color']>().toEqualTypeOf<
                CSSProperties['color']
            >()
        })

        it.each([
            'var(--custom-color)',
            'var(--custom-color, hotpink)',
            'currentColor',
            'transparent',
            'inherit',
            'rebeccapurple',
            '#123456',
            'rgb(12, 34, 56)',
        ])('applies %s without forwarding a color attribute', (color) => {
            render(<Typography color={color}>text</Typography>)
            const text = screen.getByText('text')
            const expected = document.createElement('span')
            expected.style.color = color

            expect(text.style.color).toBe(expected.style.color)
            expect(text.hasAttribute('color')).toBe(false)
        })

        it('applies nested theme variable references directly', () => {
            render(
                <Typography color={vars.color.primary.main}>text</Typography>,
            )
            expect(screen.getByText('text').style.color).toBe(
                vars.color.primary.main,
            )
        })

        it('lets consumer style override color props and preserves custom classes', () => {
            render(
                <Typography
                    color="red"
                    className="interaction-colors"
                    style={{ color: 'var(--consumer-color)' }}
                >
                    text
                </Typography>,
            )
            const text = screen.getByText('text')

            expect(text.style.color).toBe('var(--consumer-color)')
            expect(text.className).toContain('interaction-colors')
        })

        it.each(['span', 'label', 'blockquote', 'cite', 'mark'] as const)(
            'leaves %s defaults in CSS without inline colors',
            (variant) => {
                render(
                    <Typography
                        variant={variant}
                        className="interaction-colors"
                    >
                        text
                    </Typography>,
                )
                const text = screen.getByText('text')

                expect(text.style.color).toBe('')
                expect(text.style.backgroundColor).toBe('')
                expect(text.className).toContain('interaction-colors')
            },
        )
    })

    describe('semantic element rendering', () => {
        const variants = Object.keys(
            TYPOGRAPHY_ELEMENT_MAP,
        ) as TypographyVariant[]

        it.each(variants)('renders <%s> for variant="%s"', (variant) => {
            const { container } = render(
                <Typography variant={variant}>text</Typography>,
            )
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
                <Typography variant="h1" as="span">
                    heading
                </Typography>,
            )
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('span')
        })

        it('infers the visual variant from a known `as` element', () => {
            const { container } = render(
                <Typography as="h1">heading</Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                variantClass('h1'),
            )
        })

        it('still applies the variant CSS classes when `as` is set', () => {
            const { container } = render(
                <Typography variant="h1" as="span">
                    heading
                </Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                variantClass('h1'),
            )
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
            const { container } = render(
                <Typography fontSize={20}>text</Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                fontSizeClass(20),
            )
        })

        it('applies the fontWeight class', () => {
            const { container } = render(
                <Typography fontWeight="bold">text</Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                fontWeightClass('bold'),
            )
        })

        it('applies the margin token class', () => {
            const { container } = render(
                <Typography margin={12}>text</Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                BOX_STYLES.recipe({ margin: 12 }).split(' ').at(-1),
            )
        })

        it('uses the shared form label style when the label font size is 14', () => {
            const { container, rerender } = render(
                <Typography variant="label">Label</Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                TYPOGRAPHY_STYLES.recipe({ variant: 'label' }),
            )

            rerender(
                <Typography variant="label" fontSize={14}>
                    Label
                </Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                FORM_LABEL_STYLES.root,
            )
        })

        it('applies the ellipsis class when ellipsis=true', () => {
            const { container } = render(<Typography ellipsis>text</Typography>)
            expect(getFirstChild(container).className).toContain(
                ellipsisClass(),
            )
        })

        it('does not apply the ellipsis class when ellipsis is not set', () => {
            const { container } = render(
                <Typography variant="p">text</Typography>,
            )
            expect(getFirstChild(container).className).not.toContain(
                ellipsisClass(),
            )
        })

        const maxLinesClass = (): string =>
            TYPOGRAPHY_STYLES.recipe.classNames.variants.clamp.true

        it('applies the maxLines class when maxLines is set', () => {
            const { container } = render(
                <Typography maxLines={2}>text</Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                maxLinesClass(),
            )
            expect(getFirstChild(container).style.getPropertyValue('-webkit-line-clamp')).toBe('2')
        })

        it('does not apply the maxLines class when maxLines is not set', () => {
            const { container } = render(<Typography>text</Typography>)
            expect(getFirstChild(container).className).not.toContain(
                maxLinesClass(),
            )
        })

        it('merges a custom className', () => {
            const { container } = render(
                <Typography className="my-custom-class">text</Typography>,
            )
            expect(getFirstChild(container).className).toContain(
                'my-custom-class',
            )
        })

        it('applies the fontSize override class on top of the variant', () => {
            // h1 has its own font-size; fontSize={14} adds the sm class so it can override via cascade.
            const { container } = render(
                <Typography variant="h1" fontSize={14}>
                    heading
                </Typography>,
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
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'typo',
            )
        })

        it('forwards aria-* attributes', () => {
            render(
                <Typography variant="p" aria-label="description">
                    text
                </Typography>,
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
            render(
                <Typography variant="h1" as="section" ref={ref}>
                    text
                </Typography>,
            )
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "Typography"', () => {
            expect(typeof Typography).toBe('function')
        })
    })
})
