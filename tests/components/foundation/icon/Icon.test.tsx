import { USER_ICON as UserIcon } from '@constants/icon-registry'
import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest'
import { createRef, StrictMode, type CSSProperties } from 'react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'

import { Icon, ICON_STYLES, type IconColor, type IconProps, type IconifyIcon } from '@components/foundation/icon'
import { vars } from '@theme/styles/contract/contract.css.ts'

const definitionIcon: IconifyIcon = {
    width: 32,
    height: 16,
    body: '<defs><linearGradient id="paint"><stop stop-color="red"/></linearGradient><clipPath id="clip"><path d="M0 0h32v16H0z"/></clipPath></defs><path fill="url(#paint)" clip-path="url(#clip)" d="M0 0h32v16H0z"/>',
}

describe('Icon', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('offline SVG contract', () => {
        it('accepts local Iconify data in its public props', () => {
            expectTypeOf<IconProps['icon']>().toEqualTypeOf<IconifyIcon>()
        })

        it('renders local data synchronously without fetching or mutating it', () => {
            const fetch = vi.spyOn(globalThis, 'fetch')
            const xhr = vi.spyOn(XMLHttpRequest.prototype, 'open')
            const icon = Object.freeze({ body: '<path d="M0 0h16v16H0z"/>' })
            const { container } = render(<Icon icon={icon} />)

            expect(container.querySelector('svg path')?.getAttribute('d')).toBe('M0 0h16v16H0z')
            expect(fetch).not.toHaveBeenCalled()
            expect(xhr).not.toHaveBeenCalled()
            expect(icon).toEqual({ body: '<path d="M0 0h16v16H0z"/>' })
        })

        it('forwards SVG refs, native attributes and events', async () => {
            const ref = createRef<SVGSVGElement>()
            const onClick = vi.fn()
            render(<Icon icon={UserIcon} ref={ref} onClick={onClick} data-testid="icon" tabIndex={0} />)

            expect(ref.current).toBe(screen.getByTestId('icon'))
            expect(ref.current?.tagName).toBe('svg')
            expect(ref.current?.getAttribute('tabindex')).toBe('0')
            await act(async () => { ref.current?.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
            expect(onClick).toHaveBeenCalledOnce()
        })

        it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)('preserves the %s size and spin recipe without inline dimensions', (size) => {
            render(<Icon icon={definitionIcon} size={size} spin data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.getAttribute('class')).toContain(ICON_STYLES.recipe({ size, spin: true }))
            expect(svg.getAttribute('viewBox')).toBe('0 0 32 16')
            expect(svg.hasAttribute('width')).toBe(false)
            expect(svg.hasAttribute('height')).toBe(false)
            expect(svg.style.width).toBe('')
            expect(svg.style.height).toBe('')
            expect(svg.hasAttribute('size')).toBe(false)
            expect(svg.hasAttribute('spin')).toBe(false)
        })

        it('preserves the default size and consumer dimension overrides', () => {
            render(<Icon icon={UserIcon} style={{ width: '3rem', height: '2rem' }} data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.getAttribute('class')).toContain(ICON_STYLES.recipe({ size: 'md' }))
            expect(svg.style.width).toBe('3rem')
            expect(svg.style.height).toBe('2rem')
        })

        it('rejects remote names rather than rendering an empty fallback', () => {
            // @ts-expect-error Only local Iconify objects are accepted.
            expect(() => render(<Icon icon="lucide:user" />)).toThrow(TypeError)
        })

        it('rejects empty SVG bodies and IDs explicitly', () => {
            expect(() => render(<Icon icon={{ body: '' }} />)).toThrow('nonempty SVG body')
            expect(() => render(<Icon icon={UserIcon} id="" />)).toThrow('nonempty id')
            expect(() => render(<Icon icon={UserIcon} id=" " />)).toThrow('nonempty id')
        })

        it('keeps internal SVG definitions instance-scoped and stable on rerender', () => {
            const content = <StrictMode><Icon icon={definitionIcon} /><Icon icon={definitionIcon} /></StrictMode>
            const { container, rerender } = render(content)
            const ids = Array.from(container.querySelectorAll('defs [id]'), (element) => element.id)
            expect(new Set(ids).size).toBe(4)
            for (const svg of container.querySelectorAll('svg')) {
                const gradientId = svg.querySelector('linearGradient')?.id
                const clipId = svg.querySelector('clipPath')?.id
                expect(svg.querySelector('path[fill]')?.getAttribute('fill')).toBe(`url(#${gradientId})`)
                expect(svg.querySelector('path[fill]')?.getAttribute('clip-path')).toBe(`url(#${clipId})`)
            }

            rerender(<StrictMode><Icon icon={{ ...definitionIcon }} /><Icon icon={{ ...definitionIcon }} /></StrictMode>)
            expect(Array.from(container.querySelectorAll('defs [id]'), (element) => element.id)).toEqual(ids)
        })

        it('preserves custom SVG IDs and namespaces their definitions', () => {
            render(<Icon icon={definitionIcon} id="custom-icon" data-testid="icon" />)
            expect(screen.getByTestId('icon').id).toBe('custom-icon')
            expect(screen.getByTestId('icon').querySelector('linearGradient')?.id).toBe('custom_iconID0')
        })

        it('renders SVG definitions on the server and hydrates without changing them', async () => {
            const content = <StrictMode><Icon icon={definitionIcon} /><Icon icon={definitionIcon} /></StrictMode>
            const markup = renderToString(content)
            const container = document.createElement('div')
            container.innerHTML = markup
            const serverDOM = container.innerHTML
            document.body.append(container)
            const onRecoverableError = vi.fn()
            const consoleError = vi.spyOn(console, 'error')
            let root: ReturnType<typeof hydrateRoot> | undefined

            try {
                expect(container.querySelectorAll('svg')).toHaveLength(2)
                await act(async () => { root = hydrateRoot(container, content, { onRecoverableError }) })
                expect(container.innerHTML).toBe(serverDOM)
                expect(onRecoverableError).not.toHaveBeenCalled()
                expect(consoleError).not.toHaveBeenCalled()
            } finally {
                await act(async () => { root?.unmount() })
                container.remove()
            }
        })
    })

    describe('CSS color contract', () => {
        it('accepts native CSS color values', () => {
            expectTypeOf<IconColor>().toEqualTypeOf<CSSProperties['color']>()
            expectTypeOf<IconProps['color']>().toEqualTypeOf<CSSProperties['color']>()
            expectTypeOf<IconProps['backgroundColor']>().toEqualTypeOf<CSSProperties['backgroundColor']>()
            expectTypeOf<IconProps['borderColor']>().toEqualTypeOf<CSSProperties['borderColor']>()
        })

        it.each(['var(--custom-color)', 'var(--custom-color, hotpink)', 'currentColor', 'transparent', 'inherit', 'rebeccapurple', '#123456', 'rgb(12, 34, 56)'])(
            'applies %s to the SVG and CSS wrapper colors without DOM prop leakage',
            (color) => {
                render(<Icon icon={UserIcon} color={color} backgroundColor={color} borderColor={color} data-testid="icon" />)
                const svg = screen.getByTestId('icon')
                const wrapper = svg.parentElement!
                const expected = document.createElement('span')
                expected.style.color = color
                expected.style.backgroundColor = color
                expected.style.borderColor = color

                expect(svg.style.color).toBe(expected.style.color)
                expect(wrapper.style.backgroundColor).toBe(expected.style.backgroundColor)
                expect(wrapper.style.borderColor).toBe(expected.style.borderColor)
                for (const element of [svg, wrapper]) {
                    expect(element.hasAttribute('color')).toBe(false)
                    expect(element.hasAttribute('backgroundColor')).toBe(false)
                    expect(element.hasAttribute('borderColor')).toBe(false)
                }
            },
        )

        it('applies theme references directly to the correct elements', () => {
            render(<Icon icon={UserIcon} color={vars.color.primary.main} backgroundColor={vars.color.surface.main} borderColor={vars.color.border.main} data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.style.color).toBe(vars.color.primary.main)
            expect(svg.parentElement!.style.backgroundColor).toBe(vars.color.surface.main)
            expect(svg.parentElement!.style.borderColor).toBe(vars.color.border.main)
        })

        it('preserves SVG style precedence and custom interaction classes', () => {
            render(<Icon icon={UserIcon} color="red" className="interaction-colors" style={{ color: 'var(--consumer-color)' }} data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.style.color).toBe('var(--consumer-color)')
            expect(svg.getAttribute('class')).toContain('interaction-colors')
        })

        it('sets no inline color defaults on the SVG or wrapper', () => {
            render(<Icon icon={UserIcon} className="interaction-colors" data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.style.color).toBe('')
            expect(svg.parentElement!.style.color).toBe('')
            expect(svg.parentElement!.style.backgroundColor).toBe('')
            expect(svg.parentElement!.style.borderColor).toBe('')
            expect(svg.getAttribute('class')).toContain('interaction-colors')
        })
    })

    describe('accessibility — decorative icon (no label)', () => {
        it('sets aria-hidden="true"', () => {
            const { container } = render(<Icon icon={UserIcon} />)
            expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
                'true',
            )
        })
    })

    describe('accessibility — semantic icon (with label)', () => {
        it('supports an external accessible label', () => {
            render(<><span id="icon-label">Account</span><Icon icon={UserIcon} aria-labelledby="icon-label" /></>)
            expect(screen.getByRole('img', { name: 'Account' })).toBeTruthy()
        })

        it('respects explicit hiding inside named controls', () => {
            render(<Icon icon={UserIcon} aria-label="Account" aria-hidden />)
            expect(screen.queryByRole('img')).toBeNull()
        })

        it('removes aria-hidden', () => {
            const { container } = render(
                <Icon icon={UserIcon} aria-label={'Home'} />,
            )
            const svg = container.querySelector('svg')
            // aria-hidden must be absent or "false" — never "true"
            expect(svg?.getAttribute('aria-hidden')).not.toBe('true')
        })

        it('sets role="img" and aria-label', () => {
            render(<Icon icon={UserIcon} aria-label={'Home'} />)
            // getByRole throws if not found, so finding the element is the assertion
            expect(screen.getByRole('img', { name: 'Home' })).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Icon"', () => {
            expect(Icon.displayName).toBe('Icon')
        })
    })
})
