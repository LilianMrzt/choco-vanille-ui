import { act, fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { darkColors, lightColors, ThemeProvider, useTheme, type ThemeColorOverrides } from '@theme'
import { THEME_TRANSITION_ATTRIBUTE, THEME_TRANSITION_DURATION_VAR, } from '@theme/constants/index.ts'

const createMatchMediaMock = (matches: boolean) => {
    const listeners = new Set<EventListenerOrEventListenerObject>()
    const mql = {
        matches,
        media: '(prefers-color-scheme: dark)',
        addEventListener: (
            _event: string,
            listener: EventListenerOrEventListenerObject,
        ) => {
            listeners.add(listener)
        },
        removeEventListener: (
            _event: string,
            listener: EventListenerOrEventListenerObject,
        ) => {
            listeners.delete(listener)
        },
        dispatchEvent: (event: Event) => {
            if ('matches' in event && typeof event.matches === 'boolean') {
                Object.defineProperty(mql, 'matches', { value: event.matches, configurable: true })
            }
            listeners.forEach((listener) => {
                if (typeof listener === 'function') {
                    listener(event)
                } else {
                    listener.handleEvent(event)
                }
            })
            return true
        },
    } as MediaQueryList
    return mql
}

const matchMediaMock = (matches: boolean) => {
    const mql = createMatchMediaMock(matches)

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) =>
            query === '(prefers-color-scheme: dark)'
                ? mql
                : {
                    matches: false,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                },
        ),
    })

    return mql
}

// Provide a default light-mode matchMedia implementation for tests that do not
// explicitly mock the OS preference.
matchMediaMock(false)

const ThemeReader = () => {
    const { theme, resolvedTheme, setTheme } = useTheme()
    return (
        <div>
            <span data-testid={'theme'}>{theme}</span>
            <span data-testid={'resolved-theme'}>{resolvedTheme}</span>
            <button onClick={() => setTheme('dark')}>set dark</button>
            <button onClick={() => setTheme('light')}>set light</button>
            <button onClick={() => setTheme('system')}>set system</button>
        </div>
    )
}

describe('ThemeProvider', () => {
    it('keeps the documented fallback when useTheme is called without a provider', () => {
        render(<ThemeReader />)

        expect(screen.getByTestId('theme').textContent).toBe('system')
        expect(screen.getByTestId('resolved-theme').textContent).toBe('light')
        fireEvent.click(screen.getByRole('button', { name: 'set dark' }))
        expect(screen.getByTestId('theme').textContent).toBe('system')
    })

    it('renders the provider on the server without changing the document', () => {
        const previousTheme = document.documentElement.getAttribute('data-theme')
        const markup = renderToString(
            <ThemeProvider theme={'dark'}><span>child</span></ThemeProvider>,
        )

        expect(markup).toContain('child')
        expect(document.documentElement.getAttribute('data-theme')).toBe(previousTheme)
    })

    it('restores document state after StrictMode unmount', () => {
        const previousTheme = document.documentElement.getAttribute('data-theme')
        const { unmount } = render(
            <StrictMode>
                <ThemeProvider theme={'dark'}><span>child</span></ThemeProvider>
            </StrictMode>,
        )

        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
        unmount()
        expect(document.documentElement.getAttribute('data-theme')).toBe(previousTheme)
    })

    it('renders its children inside a wrapper div', () => {
        render(
            <ThemeProvider>
                <span>child</span>
            </ThemeProvider>,
        )
        expect(screen.getByText('child')).toBeTruthy()
    })

    it('sets data-theme on html for document scope', () => {
        render(
            <ThemeProvider theme={'dark'}>
                <span>child</span>
            </ThemeProvider>,
        )
        const wrapper = screen.getByText('child').parentElement as HTMLElement
        expect(wrapper.hasAttribute('data-theme')).toBe(false)
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('exposes the active theme via context', () => {
        render(
            <ThemeProvider theme={'dark'}>
                <ThemeReader />
            </ThemeProvider>,
        )
        expect(screen.getByTestId('theme').textContent).toBe('dark')
        expect(screen.getByTestId('resolved-theme').textContent).toBe('dark')
    })

    describe('uncontrolled mode', () => {
        it('uses defaultTheme as the initial theme', () => {
            render(
                <ThemeProvider defaultTheme={'dark'}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            expect(screen.getByTestId('theme').textContent).toBe('dark')
            expect(screen.getByTestId('resolved-theme').textContent).toBe('dark')
        })

        it('defaults to system when no defaultTheme is provided', () => {
            matchMediaMock(false)
            render(
                <ThemeProvider>
                    <ThemeReader />
                </ThemeProvider>,
            )
            expect(screen.getByTestId('theme').textContent).toBe('system')
            expect(screen.getByTestId('resolved-theme').textContent).toBe('light')
        })

        it('updates internal state when setTheme is called', async () => {
            render(
                <ThemeProvider defaultTheme={'light'}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            await userEvent.click(screen.getByRole('button', { name: 'set dark' }))
            expect(screen.getByTestId('theme').textContent).toBe('dark')
            expect(screen.getByTestId('resolved-theme').textContent).toBe('dark')
        })

        it('calls onThemeChange when the theme changes internally', async () => {
            const handleThemeChange = vi.fn()
            render(
                <ThemeProvider defaultTheme={'light'} onThemeChange={handleThemeChange}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            await userEvent.click(screen.getByRole('button', { name: 'set dark' }))
            expect(handleThemeChange).toHaveBeenCalledWith('dark')
        })
    })

    describe('controlled mode', () => {
        it('uses the controlled theme prop', () => {
            render(
                <ThemeProvider theme={'dark'}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            expect(screen.getByTestId('theme').textContent).toBe('dark')
        })

        it('accepts consumer-defined theme names', () => {
            render(
                <ThemeProvider theme={'light-green'}>
                    <ThemeReader />
                </ThemeProvider>,
            )

            expect(screen.getByTestId('theme').textContent).toBe('light-green')
            expect(screen.getByTestId('resolved-theme').textContent).toBe('light-green')
        })

        it('does not update internal state when setTheme is called', async () => {
            render(
                <ThemeProvider theme={'light'}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            await userEvent.click(screen.getByRole('button', { name: 'set dark' }))
            expect(screen.getByTestId('theme').textContent).toBe('light')
        })

        it('calls onThemeChange when setTheme is called', async () => {
            const handleThemeChange = vi.fn()
            render(
                <ThemeProvider theme={'light'} onThemeChange={handleThemeChange}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            await userEvent.click(screen.getByRole('button', { name: 'set dark' }))
            expect(handleThemeChange).toHaveBeenCalledWith('dark')
        })
    })

    describe('system theme preference', () => {
        it('resolves system to light when OS prefers light', () => {
            matchMediaMock(false)
            render(
                <ThemeProvider theme={'system'}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            expect(screen.getByTestId('resolved-theme').textContent).toBe('light')
        })

        it('resolves system to dark when OS prefers dark', () => {
            matchMediaMock(true)
            render(
                <ThemeProvider theme={'system'}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            expect(screen.getByTestId('resolved-theme').textContent).toBe('dark')
        })

        it('reactively updates when the OS preference changes', async () => {
            const mql = matchMediaMock(false)
            render(
                <ThemeProvider theme={'system'}>
                    <ThemeReader />
                </ThemeProvider>,
            )
            expect(screen.getByTestId('resolved-theme').textContent).toBe('light')

            const event = new Event('change') as MediaQueryListEvent
            Object.defineProperty(event, 'matches', { value: true })
            Object.defineProperty(event, 'media', {
                value: '(prefers-color-scheme: dark)',
            })
            await act(async () => {
                mql.dispatchEvent(event)
            })
            expect(screen.getByTestId('resolved-theme').textContent).toBe('dark')
        })

        it('hydrates a system-scoped subtree without a mismatch before synchronizing', async () => {
            matchMediaMock(true)
            const tree = (
                <StrictMode>
                    <ThemeProvider scope={'subtree'} theme={'system'}>
                        <ThemeReader />
                    </ThemeProvider>
                </StrictMode>
            )
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
            const onRecoverableError = vi.fn()
            const container = document.createElement('div')
            document.body.appendChild(container)
            let root: ReturnType<typeof hydrateRoot> | undefined

            try {
                vi.stubGlobal('window', undefined)
                const markup = renderToString(tree)
                vi.unstubAllGlobals()
                expect(markup).toContain('data-theme="light"')
                container.innerHTML = markup

                await act(async () => {
                    root = hydrateRoot(container, tree, { onRecoverableError })
                })

                expect(container.firstElementChild?.getAttribute('data-theme')).toBe('dark')
                expect(container.querySelector('[data-testid="resolved-theme"]')?.textContent).toBe('dark')
                expect(onRecoverableError).not.toHaveBeenCalled()
                expect(consoleError).not.toHaveBeenCalled()
            } finally {
                vi.unstubAllGlobals()
                if (root) {
                    act(() => root?.unmount())
                }
                container.remove()
                consoleError.mockRestore()
            }
        })

        it('subscribes only while system is active and cleans up in StrictMode', () => {
            const mql = matchMediaMock(false)
            const add = vi.spyOn(mql, 'addEventListener')
            const remove = vi.spyOn(mql, 'removeEventListener')
            const { rerender, unmount } = render(
                <StrictMode>
                    <ThemeProvider theme={'light'}><ThemeReader /></ThemeProvider>
                </StrictMode>,
            )

            expect(screen.getByTestId('resolved-theme').textContent).toBe('light')
            expect(add).not.toHaveBeenCalled()
            const event = new Event('change')
            Object.defineProperty(event, 'matches', { value: true })
            act(() => { mql.dispatchEvent(event) })
            rerender(
                <StrictMode>
                    <ThemeProvider theme={'system'}><ThemeReader /></ThemeProvider>
                </StrictMode>,
            )
            expect(screen.getByTestId('resolved-theme').textContent).toBe('dark')
            expect(add).toHaveBeenCalled()
            rerender(
                <StrictMode>
                    <ThemeProvider theme={'light'}><ThemeReader /></ThemeProvider>
                </StrictMode>,
            )
            expect(screen.getByTestId('resolved-theme').textContent).toBe('light')
            expect(remove).toHaveBeenCalledTimes(add.mock.calls.length)
            unmount()
            expect(remove).toHaveBeenCalledTimes(add.mock.calls.length)
        })
    })

    describe('tokens', () => {
        it.each(['document', 'subtree'] as const)('updates and removes only supplied leaves in %s scope', (scope) => {
            const root = document.documentElement
            const previousStyle = root.getAttribute('style')
            const { getByTestId, rerender, unmount } = render(
                <StrictMode>
                    <ThemeProvider
                        data-testid={'scope'}
                        scope={scope}
                        theme={'light'}
                        tokens={{
                            primary: { main: 'red', hover: 'blue' },
                            surface: { elevated: 'white' },
                        }}
                    />
                </StrictMode>,
            )
            const target = scope === 'document' ? root : getByTestId('scope')

            expect(target.style.getPropertyValue('--color-primary-main')).toBe('red')
            expect(target.style.getPropertyValue('--color-primary-hover')).toBe('blue')
            expect(target.style.getPropertyValue('--color-primary-foreground')).toBe('')
            expect(target.style.getPropertyValue('--color-surface-elevated')).toBe('white')
            expect(target.style.cssText).not.toContain('[object Object]')

            rerender(
                <StrictMode>
                    <ThemeProvider
                        data-testid={'scope'}
                        scope={scope}
                        theme={'dark'}
                        tokens={{ primary: { main: 'purple', hover: undefined } }}
                    />
                </StrictMode>,
            )
            expect(target.style.getPropertyValue('--color-primary-main')).toBe('purple')
            expect(target.style.getPropertyValue('--color-primary-hover')).toBe('')
            expect(target.style.getPropertyValue('--color-surface-elevated')).toBe('')

            rerender(
                <StrictMode>
                    <ThemeProvider data-testid={'scope'} scope={scope} theme={'dark'} />
                </StrictMode>,
            )
            expect(target.style.getPropertyValue('--color-primary-main')).toBe('')
            unmount()
            expect(root.getAttribute('style') ?? '').toBe(previousStyle ?? '')
        })

        it('restores existing document leaf declarations and their priority', () => {
            const root = document.documentElement
            const previousStyle = root.style.cssText
            root.style.setProperty('--color-primary-hover', 'green', 'important')

            try {
                const { unmount } = render(
                    <ThemeProvider tokens={{ primary: { hover: 'blue' } }} />,
                )
                expect(root.style.getPropertyValue('--color-primary-hover')).toBe('blue')
                unmount()
                expect(root.style.getPropertyValue('--color-primary-hover')).toBe('green')
                expect(root.style.getPropertyPriority('--color-primary-hover')).toBe('important')
            } finally {
                root.style.cssText = previousStyle
            }
        })

        it('serializes nested overrides during SSR without changing the document', () => {
            const previousStyle = document.documentElement.style.cssText
            const markup = renderToString(
                <ThemeProvider
                    scope={'subtree'}
                    theme={'light'}
                    tokens={{ primary: { subtleForeground: 'var(--brand-text)' } }}
                />,
            )
            expect(markup).toContain('--color-primary-subtleForeground:var(--brand-text)')
            expect(markup).not.toContain('[object Object]')
            expect(document.documentElement.style.cssText).toBe(previousStyle)
        })

        it('keeps nested subtree overrides independent of the document and their parent', () => {
            const previousTheme = document.documentElement.getAttribute('data-theme')
            const previousPrimary = document.documentElement.style.getPropertyValue('--color-primary-main')
            const overrides = {
                primary: { main: '#0f766e', foreground: '#ffffff' },
                focusRing: '#0f766e',
            } as const satisfies ThemeColorOverrides

            const { getByTestId, rerender, unmount } = render(
                <ThemeProvider
                    data-testid={'outer'}
                    scope={'subtree'}
                    theme={'light'}
                    tokens={{ primary: { main: lightColors.primary.main } }}
                >
                    <ThemeProvider
                        data-testid={'inner'}
                        scope={'subtree'}
                        theme={'dark'}
                        tokens={overrides}
                    />
                </ThemeProvider>,
            )

            expect(getByTestId('outer').style.getPropertyValue('--color-primary-main')).toBe(lightColors.primary.main)
            expect(getByTestId('inner').style.getPropertyValue('--color-primary-main')).toBe(overrides.primary.main)
            expect(getByTestId('inner').getAttribute('data-theme')).toBe('dark')
            expect(document.documentElement.getAttribute('data-theme')).toBe(previousTheme)
            expect(document.documentElement.style.getPropertyValue('--color-primary-main')).toBe(previousPrimary)

            rerender(
                <ThemeProvider
                    data-testid={'outer'}
                    scope={'subtree'}
                    theme={'light'}
                    tokens={{ primary: { main: lightColors.primary.main } }}
                >
                    <ThemeProvider
                        data-testid={'inner'}
                        scope={'subtree'}
                        theme={'dark'}
                        tokens={{ primary: { main: darkColors.primary.main } }}
                    />
                </ThemeProvider>,
            )

            expect(getByTestId('inner').style.getPropertyValue('--color-primary-main')).toBe(darkColors.primary.main)
            expect(getByTestId('inner').style.getPropertyValue('--color-focusRing')).toBe('')
            expect(getByTestId('inner').style.getPropertyValue('--color-primary-foreground')).toBe('')
            expect(getByTestId('outer').style.getPropertyValue('--color-primary-main')).toBe(lightColors.primary.main)

            unmount()
            expect(document.documentElement.getAttribute('data-theme')).toBe(previousTheme)
            expect(document.documentElement.style.getPropertyValue('--color-primary-main')).toBe(previousPrimary)
        })

        it('injects token values as CSS custom properties', () => {
            render(
                <ThemeProvider
                    theme={'light'}
                    tokens={{ primary: { main: 'red' }, focusRing: 'blue' }}
                >
                    <span>child</span>
                </ThemeProvider>,
            )
            expect(
                document.documentElement.style.getPropertyValue('--color-primary-main'),
            ).toBe('red')
            expect(document.documentElement.style.getPropertyValue('--color-focusRing')).toBe(
                'blue',
            )
        })

        it('merges custom style with token styles', () => {
            render(
                <ThemeProvider
                    theme={'light'}
                    tokens={{ primary: { main: 'red' } }}
                    style={{ padding: '1rem' }}
                >
                    <span>child</span>
                </ThemeProvider>,
            )
            expect(
                document.documentElement.style.getPropertyValue('--color-primary-main'),
            ).toBe('red')
            const wrapper = screen.getByText('child').parentElement as HTMLElement
            expect(wrapper.style.padding).toBe('1rem')
        })
    })

    it('syncs document scope to html for body-mounted portals', () => {
        const { unmount } = render(
            <ThemeProvider
                scope={'document'}
                theme={'dark'}
                tokens={{ primary: { main: 'red' } }}
            >
                <span>child</span>
            </ThemeProvider>,
        )

        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
        expect(
            document.documentElement.style.getPropertyValue('--color-primary-main'),
        ).toBe('red')

        unmount()

        expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
        expect(
            document.documentElement.style.getPropertyValue('--color-primary-main'),
        ).toBe('')
    })

    it('applies a transition only when an explicit duration is configured', () => {
        vi.useFakeTimers()

        try {
            const { unmount } = render(
                <ThemeProvider
                    scope={'subtree'}
                    defaultTheme={'light'}
                    themeTransitionDuration={100}
                >
                    <ThemeReader />
                </ThemeProvider>,
            )
            const wrapper = screen.getByTestId('theme').parentElement
                ?.parentElement as HTMLElement

            expect(wrapper.hasAttribute(THEME_TRANSITION_ATTRIBUTE)).toBe(false)
            fireEvent.click(screen.getByRole('button', { name: 'set dark' }))

            expect(wrapper.getAttribute(THEME_TRANSITION_ATTRIBUTE)).toBe('')
            expect(
                wrapper.style.getPropertyValue(THEME_TRANSITION_DURATION_VAR),
            ).toBe('100ms')
            act(() => {
                vi.advanceTimersByTime(100)
            })

            expect(wrapper.hasAttribute(THEME_TRANSITION_ATTRIBUTE)).toBe(false)

            unmount()
        } finally {
            vi.useRealTimers()
        }
    })

    it('does not subscribe to system preference changes for a fixed theme', () => {
        const matchMedia = vi.fn().mockReturnValue(createMatchMediaMock(false))
        Object.defineProperty(window, 'matchMedia', { writable: true, value: matchMedia })

        render(
            <ThemeProvider theme={'dark'}>
                <span>child</span>
            </ThemeProvider>,
        )

        expect(matchMedia).not.toHaveBeenCalled()
    })

    it('displayName is "ThemeProvider"', () => {
        expect(ThemeProvider.displayName).toBe('ThemeProvider')
    })
})
