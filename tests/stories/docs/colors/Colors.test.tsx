import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ThemeProvider } from '@theme'
import ColorGroupCard from '@stories/docs/colors/components/color-group-card/ColorGroupCard.tsx'
import ColorSwatch from '@stories/docs/colors/components/color-swatch/ColorSwatch.tsx'
import { COLOR_GROUP_CARD_STYLES } from '@stories/docs/colors/components/color-group-card/ColorGroupCard.css'
import { COLOR_SWATCH_STYLES } from '@stories/docs/colors/components/color-swatch/ColorSwatch.css'

afterEach(() => {
    vi.restoreAllMocks()
})

describe('theme color stories', () => {
    it.each([false, true])('spans main across the grid without stretching other swatches (dark: %s)', (dark) => {
        render(
            <ThemeProvider
                scope="subtree"
                theme={dark ? 'dark' : 'light'}
            >
                <ColorGroupCard
                    colors={{
                        'secondary.main': '#7c3aed',
                        'secondary.hover': '#6d28d9',
                        'secondary.subtleBorder': '#7c3aed',
                    }}
                    group={{
                        label: 'Secondary',
                        tokens: ['secondary.main', 'secondary.hover', 'secondary.subtleBorder'],
                    }}
                />
            </ThemeProvider>,
        )

        const main = screen.getByTitle('Click to copy: vars.color.secondary.main')
        const hover = screen.getByTitle('Click to copy: vars.color.secondary.hover')
        const subtleBorder = screen.getByTitle('Click to copy: vars.color.secondary.subtleBorder')

        expect(main.parentElement?.classList.contains(COLOR_GROUP_CARD_STYLES.swatches)).toBe(true)
        expect(main.classList.contains(COLOR_SWATCH_STYLES.main)).toBe(true)
        expect(hover.classList.contains(COLOR_SWATCH_STYLES.main)).toBe(false)
        expect(subtleBorder.classList.contains(COLOR_SWATCH_STYLES.main)).toBe(false)
    })

    it.each(['primary.main', 'secondary.subtleBorder', 'background'])(
        'copies the literal vars reference for %s instead of its color value',
        async (name) => {
            userEvent.setup()
            const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
            render(<ColorSwatch name={name} value="#7c3aed" />)

            fireEvent.click(screen.getByTitle(`Click to copy: vars.color.${name}`))

            await waitFor(() => {
                expect(writeText).toHaveBeenCalledExactlyOnceWith(`vars.color.${name}`)
                expect(screen.getByText('Copied')).toBeTruthy()
            })
            expect(screen.getByText('#7c3aed')).toBeTruthy()
        },
    )

    it('copies a swatch with the keyboard', async () => {
        const user = userEvent.setup()
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
        render(<ColorSwatch name="primary.main" value="#2563eb" />)

        await user.tab()
        expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Copy vars.color.primary.main' }))
        await user.keyboard('{Enter}')

        expect(writeText).toHaveBeenCalledExactlyOnceWith('vars.color.primary.main')
        expect(screen.getByRole('status').textContent).toBe('Copied')
    })

    it('announces clipboard failures instead of showing a successful copy', async () => {
        const user = userEvent.setup()
        vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Permission denied'))
        render(<ColorSwatch name="primary.main" value="#2563eb" />)

        await user.click(screen.getByRole('button', { name: 'Copy vars.color.primary.main' }))

        expect(screen.getByRole('status').textContent).toContain('Copy failed')
        expect(screen.queryByText('Copied')).toBeNull()
    })
})
