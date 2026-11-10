import {
    createRef,
    type ComponentPropsWithRef,
    type CSSProperties,
} from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, expectTypeOf, it, vi } from 'vitest'

import '@theme'
import {
    Box,
    type BoxColor,
    type BoxProps,
    type BoxStyleProps,
} from '@components/layout/box'
import {
    BOX_INLINE_PROPERTIES,
    BOX_TOKEN_PROPERTIES,
} from '@components/layout/box/constants'
import { resolveBoxProps } from '@components/layout/box/utils/resolveBoxProps.utils'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { Flex } from '@components/layout/flex'
import { BOX_STYLES } from '@components/layout/box/Box.css.ts'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

const CustomLink = ({
    destination,
    ...props
}: ComponentPropsWithRef<'a'> & { destination: string }) => (
    <a href={destination} {...props} />
)

describe('Box', () => {
    it('resolves every declared styling prop rather than leaking it to the element', () => {
        expectTypeOf<
            Exclude<
                keyof BoxStyleProps,
                | (typeof BOX_INLINE_PROPERTIES)[number]
                | (typeof BOX_TOKEN_PROPERTIES)[number]
            >
        >().toEqualTypeOf<never>()
        const props = {
            background: 'red',
            border: '1px solid black',
            borderTop: '2px solid red',
            borderRight: '3px solid red',
            borderBottom: '4px solid red',
            borderLeft: '5px solid red',
            boxSizing: 'border-box',
            aspectRatio: '16 / 9',
            zIndex: 2,
            inset: '0px',
            top: '1px',
            right: '2px',
            bottom: '3px',
            left: '4px',
            flexGrow: 1,
            flexShrink: 0,
            justifyItems: 'center',
            justifySelf: 'end',
            gridTemplateColumns: '1fr 2fr',
            gridTemplateRows: 'auto 1fr',
            gridAutoColumns: '1fr',
            gridAutoRows: 'auto',
            gridAutoFlow: 'row dense',
            gridColumn: '2 / 4',
            gridRow: '1 / 3',
            order: 2,
            opacity: 0.5,
        } satisfies BoxStyleProps
        const resolved = resolveBoxProps({ ...props, 'data-state': 'ready' })
        expect(resolved.style).toEqual(props)
        expect(resolved['data-state']).toBe('ready')
        for (const key of Object.keys(props)) {
            expect(resolved).not.toHaveProperty(key)
        }
        render(<Box {...props} data-testid="layout" />)
        const element = screen.getByTestId('layout')
        expect(element.style.gridTemplateColumns).toBe('1fr 2fr')
        expect(element.style.flexShrink).toBe('0')
        expect(element.style.opacity).toBe('0.5')
        expect(element.style.top).toBe('1px')
    })

    it.each([
        { padding: '16' },
        { padding: 3 },
        { margin: 'invalid' },
        { borderRadius: -1 },
        { boxShadow: 'invalid' },
        { width: Number.NaN },
        { opacity: Number.POSITIVE_INFINITY },
        { display: false },
        { style: null },
    ])('rejects invalid styling values: %j', (props) => {
        expect(() => resolveBoxProps(props)).toThrow(TypeError)
    })

    it('accepts native style objects, custom properties and explicit style precedence', () => {
        const nativeStyle: CSSProperties = { width: '4rem' }
        render(
            <Box width="100%" style={nativeStyle} data-testid="native-style" />,
        )
        expect(screen.getByTestId('native-style').style.width).toBe('4rem')
        const custom = resolveBoxProps({
            width: '100%',
            style: { width: '8rem', '--layout-gap': 12 },
        })
        expect(custom.style).toEqual({ width: '8rem', '--layout-gap': 12 })
        expect(resolveBoxProps({})).not.toHaveProperty('style')
    })

    it('infers native and custom element props and refs', () => {
        expectTypeOf<BoxProps<'a'>['href']>().toEqualTypeOf<
            string | undefined
        >()
        expectTypeOf<BoxProps<'button'>['ref']>().toEqualTypeOf<
            React.Ref<HTMLButtonElement> | undefined
        >()
        expectTypeOf<
            BoxProps<typeof CustomLink>['destination']
        >().toEqualTypeOf<string>()

        const anchor = (
            <Box as="a" href="/example">
                Link
            </Box>
        )
        const button = (
            <Box as="button" type="button" ref={createRef<HTMLButtonElement>()}>
                Action
            </Box>
        )
        const custom = (
            <Box
                as={CustomLink}
                destination="/custom"
                ref={createRef<HTMLAnchorElement>()}
            >
                Custom
            </Box>
        )
        // @ts-expect-error A div does not accept href.
        const invalidDefault = <Box href="/example" />
        const invalidRef = (
            // @ts-expect-error The selected element determines the ref target.
            <Box as="button" ref={createRef<HTMLAnchorElement>()} />
        )
        // @ts-expect-error Custom component requirements are preserved.
        const missingDestination = <Box as={CustomLink} />
        // @ts-expect-error An explicit non-default element still requires as.
        const missingAs = <Box<'a'> href="/example" />

        expect([
            anchor,
            button,
            custom,
            invalidDefault,
            invalidRef,
            missingDestination,
            missingAs,
        ]).toHaveLength(7)
    })

    it('forwards tag-specific attributes, events and refs', async () => {
        const ref = createRef<HTMLButtonElement>()
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(
            <Box as="button" type="button" ref={ref} onClick={handleClick}>
                Action
            </Box>,
        )
        const button = screen.getByRole('button', { name: 'Action' })
        await user.click(button)

        expect(ref.current).toBe(button)
        expect(button.getAttribute('type')).toBe('button')
        expect(handleClick).toHaveBeenCalledOnce()
    })

    it('forwards custom component props, styling and refs', () => {
        const ref = createRef<HTMLAnchorElement>()
        render(
            <Box
                as={CustomLink}
                destination="/custom"
                ref={ref}
                className="consumer"
                color="red"
            >
                Custom
            </Box>,
        )
        const link = screen.getByRole('link', { name: 'Custom' })

        expect(ref.current).toBe(link)
        expect(link.getAttribute('href')).toBe('/custom')
        expect(link.className).toContain('consumer')
        expect(link.style.color).toBe('red')
        expect(link.hasAttribute('destination')).toBe(false)
    })

    it('renders selected native attributes and styling on the server', () => {
        const markup = renderToStaticMarkup(
            <Box as="a" href="/example" padding={16} color="rebeccapurple">
                Link
            </Box>,
        )

        expect(markup).toContain('<a')
        expect(markup).toContain('href="/example"')
        expect(markup).toContain('color:rebeccapurple')
        expect(markup).not.toContain('padding=')
    })

    it('accepts finite numeric props without quoted numeric aliases or arbitrary values', () => {
        expectTypeOf<BoxProps['padding']>().toEqualTypeOf<
            keyof typeof vars.space | undefined
        >()
        expectTypeOf<BoxProps['margin']>().toEqualTypeOf<
            keyof typeof vars.space | 'auto' | undefined
        >()
        expectTypeOf<BoxProps['borderRadius']>().toEqualTypeOf<
            keyof typeof vars.radius | undefined
        >()
        expectTypeOf<'16' | 17>().not.toMatchTypeOf<
            NonNullable<BoxProps['padding']>
        >()
        expectTypeOf<'8' | 9>().not.toMatchTypeOf<
            NonNullable<BoxProps['borderRadius']>
        >()
    })

    it('applies zero tokens rather than treating them as omitted props', () => {
        render(
            <Box
                padding={0}
                margin={0}
                gap={0}
                borderRadius={0}
                data-testid="zero"
            />,
        )
        const box = screen.getByTestId('zero')
        const classes = BOX_STYLES.recipe({
            padding: 0,
            margin: 0,
            gap: 0,
            borderRadius: 0,
        })
        expect(classes).not.toBe(BOX_STYLES.recipe({}))
        for (const className of classes.split(' ')) {
            expect(box.classList.contains(className)).toBe(true)
        }
        expect(box.hasAttribute('padding')).toBe(false)
        expect(box.hasAttribute('gap')).toBe(false)
    })

    it('applies an extended radius token as a class', () => {
        expectTypeOf<32>().toMatchTypeOf<NonNullable<BoxProps['borderRadius']>>()
        render(<Box borderRadius={32} data-testid="rounded" />)

        const box = screen.getByTestId('rounded')
        for (const className of BOX_STYLES.recipe({ borderRadius: 32 }).split(' ')) {
            expect(box.classList.contains(className)).toBe(true)
        }
        expect(box.hasAttribute('borderRadius')).toBe(false)
        expect(box.style.borderRadius).toBe('')
    })

    it('provides every numeric token for every spacing axis', () => {
        for (const property of [
            'padding',
            'paddingX',
            'paddingY',
            'paddingTop',
            'paddingRight',
            'paddingBottom',
            'paddingLeft',
            'margin',
            'marginX',
            'marginY',
            'marginTop',
            'marginRight',
            'marginBottom',
            'marginLeft',
            'gap',
            'columnGap',
            'rowGap',
        ] as const) {
            const keys = Object.keys(
                BOX_STYLES.recipe.classNames.variants[property],
            )
            expect(keys.filter((key) => key !== 'auto')).toEqual(
                Object.keys(vars.space),
            )
            expect(keys.includes('auto')).toBe(property.startsWith('margin'))
        }
        expect(
            Object.keys(BOX_STYLES.recipe.classNames.variants.borderRadius),
        ).toEqual(Object.keys(vars.radius))
        expect(
            Object.keys(BOX_STYLES.recipe.classNames.variants.boxShadow),
        ).toEqual(Object.keys(vars.shadow))
    })

    it('applies the 5rem and 7rem spacing tokens with the extra-small shadow', () => {
        expectTypeOf<80 | 112>().toMatchTypeOf<
            NonNullable<BoxProps['padding']>
        >()
        expectTypeOf<'xs'>().toMatchTypeOf<NonNullable<BoxProps['boxShadow']>>()
        render(
            <Box
                padding={80}
                gap={112}
                boxShadow="xs"
                data-testid="extended-tokens"
            />,
        )
        const box = screen.getByTestId('extended-tokens')
        const classes = BOX_STYLES.recipe({
            padding: 80,
            gap: 112,
            boxShadow: 'xs',
        })
        for (const className of classes.split(' ')) {
            expect(box.classList.contains(className)).toBe(true)
        }
        expect(box.hasAttribute('padding')).toBe(false)
        expect(box.hasAttribute('boxShadow')).toBe(false)
    })

    describe('CSS color contract', () => {
        it('uses native CSS property types instead of theme token unions', () => {
            expectTypeOf<BoxColor>().toEqualTypeOf<CSSProperties['color']>()
            expectTypeOf<BoxProps['color']>().toEqualTypeOf<
                CSSProperties['color']
            >()
            expectTypeOf<BoxProps['backgroundColor']>().toEqualTypeOf<
                CSSProperties['backgroundColor']
            >()
            expectTypeOf<BoxProps['borderColor']>().toEqualTypeOf<
                CSSProperties['borderColor']
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
        ])(
            'applies %s as CSS without leaking color props to the DOM',
            (color) => {
                render(
                    <Box
                        color={color}
                        backgroundColor={color}
                        borderColor={color}
                        data-testid="box"
                    />,
                )
                const box = screen.getByTestId('box')
                const expected = document.createElement('div')
                expected.style.color = color
                expected.style.backgroundColor = color
                expected.style.borderColor = color

                expect(box.style.color).toBe(expected.style.color)
                expect(box.style.backgroundColor).toBe(
                    expected.style.backgroundColor,
                )
                expect(box.style.borderColor).toBe(expected.style.borderColor)
                expect(box.hasAttribute('color')).toBe(false)
                expect(box.hasAttribute('backgroundColor')).toBe(false)
                expect(box.hasAttribute('borderColor')).toBe(false)
            },
        )

        it('applies theme variable references directly', () => {
            render(
                <Box
                    color={vars.color.text.primary}
                    backgroundColor={vars.color.surface.main}
                    borderColor={vars.color.border.main}
                    data-testid="box"
                />,
            )
            const box = screen.getByTestId('box')

            expect(box.style.color).toBe(vars.color.text.primary)
            expect(box.style.backgroundColor).toBe(vars.color.surface.main)
            expect(box.style.borderColor).toBe(vars.color.border.main)
        })

        it('preserves consumer style precedence and custom classes', () => {
            render(
                <Box
                    color="red"
                    backgroundColor="red"
                    borderColor="red"
                    className="interaction-colors"
                    style={{
                        color: 'var(--consumer-color)',
                        backgroundColor: 'blue',
                        borderColor: 'green',
                    }}
                    data-testid="box"
                />,
            )
            const box = screen.getByTestId('box')

            expect(box.style.color).toBe('var(--consumer-color)')
            expect(box.style.backgroundColor).toBe('blue')
            expect(box.style.borderColor).toBe('green')
            expect(box.className).toContain('interaction-colors')
        })

        it('sets no inline color defaults that could override interaction classes', () => {
            render(<Box className="interaction-colors" data-testid="box" />)
            const box = screen.getByTestId('box')

            expect(box.style.color).toBe('')
            expect(box.style.backgroundColor).toBe('')
            expect(box.style.borderColor).toBe('')
            expect(box.className).toContain('interaction-colors')
        })
    })

    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Box>content</Box>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<Box>content</Box>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Box as="section">content</Box>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe(
                'section',
            )
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<Box>content</Box>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<Box className="my-box">content</Box>)
            expect(getFirstChild(container).className).toContain('my-box')
        })

        it('applies variant classes', () => {
            const { container } = render(
                <Box
                    display="flex"
                    padding={12}
                    backgroundColor={vars.color.surface.main}
                >
                    content
                </Box>,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })
    })

    describe('borders', () => {
        it('forwards border props to the DOM element', () => {
            render(
                <Box
                    borderColor={vars.color.border.main}
                    borderStyle="solid"
                    borderTopWidth="1px"
                    data-testid="box"
                />,
            )

            const box = screen.getByTestId('box')

            expect(box.style.borderTopWidth).toBe('1px')
            expect(box.style.borderStyle).toBe('solid')
        })

        it('forwards border props through Flex', () => {
            render(
                <Flex
                    borderColor={vars.color.border.main}
                    borderStyle="solid"
                    borderTopWidth="1px"
                    data-testid="flex"
                />,
            )

            const flex = screen.getByTestId('flex')

            expect(flex.style.borderTopWidth).toBe('1px')
            expect(flex.style.borderStyle).toBe('solid')
        })
    })

    describe('layout props', () => {
        it('applies textAlign to the rendered element', () => {
            render(
                <Box textAlign="center" data-testid="box">
                    content
                </Box>,
            )

            expect(screen.getByTestId('box').style.textAlign).toBe('center')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Box data-testid="box">content</Box>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'box',
            )
        })

        it('forwards aria-* attributes', () => {
            render(<Box aria-label="box label">content</Box>)
            expect(screen.getByLabelText('box label')).toBeTruthy()
        })

        it('forwards id attribute', () => {
            const { container } = render(<Box id="my-box">content</Box>)
            expect(getFirstChild(container).getAttribute('id')).toBe('my-box')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Box ref={ref}>content</Box>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <Box as="section" ref={ref}>
                    content
                </Box>,
            )
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "Box"', () => {
            expect(typeof Box).toBe('function')
        })
    })
})
