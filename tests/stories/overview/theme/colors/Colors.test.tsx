import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ColorGroupCard } from '@stories/overview/theme/colors/components/color-group-card/ColorGroupCard.tsx'
import { ColorSwatch } from '@stories/overview/theme/colors/components/color-swatch/ColorSwatch.tsx'

afterEach(() => {
    vi.restoreAllMocks()
})

describe('theme color stories', () => {
    it.each([false, true])('spans main across the grid without stretching other swatches (dark: %s)', (dark) => {
        render(
            <ColorGroupCard
                colors={{
                    'secondary.main': '#7c3aed',
                    'secondary.hover': '#6d28d9',
                    'secondary.subtleBorder': '#7c3aed',
                }}
                dark={dark}
                group={{
                    label: 'Secondary',
                    tokens: ['secondary.main', 'secondary.hover', 'secondary.subtleBorder'],
                }}
            />,
        )

        const main = screen.getByTitle('Click to copy: vars.color.secondary.main')
        const hover = screen.getByTitle('Click to copy: vars.color.secondary.hover')
        const subtleBorder = screen.getByTitle('Click to copy: vars.color.secondary.subtleBorder')

        expect(main.parentElement?.style.display).toBe('grid')
        expect(main.parentElement?.style.gridTemplateColumns)
            .toBe('repeat(auto-fit, minmax(min(100%, 110px), 1fr))')
        expect(main.style.gridColumn).toBe('1 / -1')
        expect(hover.style.gridColumn).toBe('')
        expect(subtleBorder.style.gridColumn).toBe('')
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
                expect(screen.getByText('✓ copied')).toBeTruthy()
            })
            expect(screen.getByText('#7c3aed')).toBeTruthy()
        },
    )
})
