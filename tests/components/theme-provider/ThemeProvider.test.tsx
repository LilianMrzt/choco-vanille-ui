import { act, fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ThemeProvider, useTheme } from '@components/theme-provider'
import { THEME_TRANSITION_ATTRIBUTE, THEME_TRANSITION_DURATION_VAR, } from '@constants/theme'

const createMatchMediaMock = (matches: boolean) => {
    const listeners = new Set<EventListenerOrEventListenerObject>()
    return {
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
    })

    describe('tokens', () => {
        it('injects token values as CSS custom properties', () => {
            render(
                <ThemeProvider
                    theme={'light'}
                    tokens={{ primary: 'red', ring: 'blue' }}
                >
                    <span>child</span>
                </ThemeProvider>,
            )
            expect(
                document.documentElement.style.getPropertyValue('--color-primary'),
            ).toBe('red')
            expect(document.documentElement.style.getPropertyValue('--color-ring')).toBe(
                'blue',
            )
        })

        it('merges custom style with token styles', () => {
            render(
                <ThemeProvider
                    theme={'light'}
                    tokens={{ primary: 'red' }}
                    style={{ padding: '1rem' }}
                >
                    <span>child</span>
                </ThemeProvider>,
            )
            expect(
                document.documentElement.style.getPropertyValue('--color-primary'),
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
                tokens={{ primary: 'red' }}
            >
                <span>child</span>
            </ThemeProvider>,
        )

        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
        expect(
            document.documentElement.style.getPropertyValue('--color-primary'),
        ).toBe('red')

        unmount()

        expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
        expect(
            document.documentElement.style.getPropertyValue('--color-primary'),
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

        expect(matchMedia).toHaveBeenCalledTimes(1)
    })

    it('displayName is "ThemeProvider"', () => {
        expect(ThemeProvider.displayName).toBe('ThemeProvider')
    })
})
