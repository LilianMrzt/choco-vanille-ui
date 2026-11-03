import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { darkTheme, lightTheme, vars } from '@theme'
import tokensMeta from '@stories/docs/tokens/Tokens.stories'
import variablesMeta from '@stories/docs/css-variables/CssVariables.stories'
import colorsMeta, { LightTheme, DarkTheme } from '@stories/docs/colors/Colors.stories'
import CopyButton from '@stories/_shared/components/copy-button/CopyButton'

const TokenReference = tokensMeta.render
const CssVariableReference = variablesMeta.render
const LightPalette = LightTheme.render
const DarkPalette = DarkTheme.render

afterEach(() => {
    vi.restoreAllMocks()
})

describe('reference stories', () => {
    it('opts every reference out of autodocs', () => {
        for (const meta of [tokensMeta, variablesMeta, colorsMeta]) {
            expect(meta.tags).toContain('!autodocs')
        }
    })

    it('updates token categories and theme-dependent values from args', () => {
        const { rerender } = render(<TokenReference theme="light" category="shadow" />)

        expect(screen.getByRole('heading', { name: 'Box shadows' })).toBeTruthy()
        expect(screen.getByText(lightTheme.shadow.md)).toBeTruthy()
        expect(screen.queryByRole('heading', { name: 'Spacing' })).toBeNull()

        rerender(<TokenReference theme="dark" category="shadow" />)
        expect(screen.getByText(darkTheme.shadow.md)).toBeTruthy()

        rerender(<TokenReference theme="dark" category="space" />)
        expect(screen.getByRole('heading', { name: 'Spacing' })).toBeTruthy()
        expect(screen.queryByRole('heading', { name: 'Box shadows' })).toBeNull()
    })

    it('renders every non-color token without omitting a scale', () => {
        render(<TokenReference theme="light" category="all" />)

        for (const [category, values] of Object.entries(lightTheme)) {
            if (category === 'color' || category === 'editorColors') {
                continue
            }
            for (const name of Object.keys(values)) {
                expect(screen.getByRole('button', { name: `Copy ${category}.${name}` })).toBeTruthy()
            }
        }
    })

    it('documents every semantic color exactly once in both palettes', () => {
        const expectedCount = Object.values(vars.color).flatMap(value =>
            typeof value === 'string' ? [value] : Object.values(value),
        ).length

        const { unmount } = render(<LightPalette />)
        expect(screen.getAllByRole('button')).toHaveLength(expectedCount)
        unmount()

        render(<DarkPalette />)
        expect(screen.getAllByRole('button')).toHaveLength(expectedCount)
    })

    it('filters CSS variables by category and name, and reports empty results', () => {
        const { rerender } = render(<CssVariableReference theme="light" category="space" search="--space-md" />)
        const table = screen.getByRole('table', { name: 'Spacing / 2 variables' })

        expect(within(table).getByText('--space-md')).toBeTruthy()
        expect(within(table).getByText('--space-md2')).toBeTruthy()
        expect(within(table).getByText(lightTheme.space.md)).toBeTruthy()
        expect(screen.queryByText('--space-lg')).toBeNull()

        rerender(<CssVariableReference theme="dark" category="space" search="not-a-variable" />)
        expect(screen.queryByRole('table')).toBeNull()
        expect(screen.getByText(/No variables match/)).toBeTruthy()
    })

    it('shows real light and dark values in a named comparison table', () => {
        render(<CssVariableReference theme="light" category="color" search="--color-primary-main" />)
        const table = screen.getByRole('table', { name: 'Semantic colors / 1 variable' })

        expect(within(table).getByRole('columnheader', { name: 'Light' })).toBeTruthy()
        expect(within(table).getByRole('columnheader', { name: 'Dark' })).toBeTruthy()
        expect(within(table).getByText(lightTheme.color.primary.main)).toBeTruthy()
        expect(within(table).getByText(darkTheme.color.primary.main)).toBeTruthy()
        expect(screen.getByRole('region', { name: 'Semantic colors variables' }).tabIndex).toBe(0)
    })

    it('clears stale copy feedback when the value changes', async () => {
        const user = userEvent.setup()
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
        const { rerender } = render(<CopyButton label="Copy token" value="vars.space.md" />)

        await user.click(screen.getByRole('button', { name: 'Copy token' }))
        expect(screen.getByRole('button', { name: 'Copied: Copy token' })).toBeTruthy()

        rerender(<CopyButton label="Copy token" value="vars.space.lg" />)
        await user.click(screen.getByRole('button', { name: 'Copy token' }))
        expect(writeText).toHaveBeenLastCalledWith('vars.space.lg')
    })
})
