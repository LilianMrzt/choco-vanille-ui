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

    it('groups comparable tokens in named lists with working family anchors', () => {
        const { rerender } = render(<TokenReference theme="light" category="all" />)
        const navigation = screen.getByRole('navigation', { name: 'Token families' })
        const spacing = screen.getByRole('region', { name: 'Spacing' })
        const list = within(spacing).getByRole('list', { name: 'Spacing tokens' })
        const target = within(navigation).getByRole('link', { name: 'Spacing' }).getAttribute('href')

        expect(within(list).getAllByRole('listitem')).toHaveLength(Object.keys(vars.space).length)
        expect(target).toBe(`#${within(spacing).getByRole('heading', { name: 'Spacing' }).id}`)
        expect(within(list).getByText('vars.space[16]')).toBeTruthy()
        expect(within(list).getByText('1rem')).toBeTruthy()

        rerender(<TokenReference theme="dark" category="space" />)
        expect(screen.queryByRole('navigation', { name: 'Token families' })).toBeNull()
        expect(screen.getAllByRole('region')).toHaveLength(1)
    })

    it('copies a numeric reference from a compact action using the keyboard', async () => {
        const user = userEvent.setup()
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
        render(<TokenReference theme="light" category="space" />)
        screen.getByRole('button', { name: 'Copy space.16' }).focus()

        await user.keyboard('{Enter}')

        expect(writeText).toHaveBeenLastCalledWith('vars.space[16]')
        expect(screen.getByRole('button', { name: 'Copied: space.16' })).toBeTruthy()
        expect(screen.getByText('Copied vars.space[16]')).toBeTruthy()
    })

    it('reports failed token copies visibly and allows retrying', async () => {
        const user = userEvent.setup()
        const writeText = vi.spyOn(navigator.clipboard, 'writeText')
            .mockRejectedValueOnce(new Error('Permission denied'))
            .mockResolvedValue()
        render(<TokenReference theme="light" category="radius" />)

        await user.click(screen.getByRole('button', { name: 'Copy radius.8' }))
        expect(screen.getByText(/Copy failed/)).toBeTruthy()

        await user.click(screen.getByRole('button', { name: 'Copy radius.8' }))
        expect(writeText).toHaveBeenLastCalledWith('vars.radius[8]')
        expect(screen.queryByText(/Copy failed/)).toBeNull()
        expect(screen.getByRole('button', { name: 'Copied: radius.8' })).toBeTruthy()
    })

    it('keeps motion previews keyboard-accessible and names their actual values', () => {
        const { rerender } = render(<TokenReference theme="light" category="duration" />)
        for (const value of Object.values(lightTheme.duration)) {
            expect(screen.getByRole('button', { name: `Preview duration: ${value}` })).toBeTruthy()
        }

        rerender(<TokenReference theme="dark" category="easing" />)
        for (const value of Object.values(darkTheme.easing)) {
            expect(screen.getByRole('button', { name: `Preview easing: ${value}` })).toBeTruthy()
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
        const { rerender } = render(<CssVariableReference theme="light" category="space" search="--space-12" />)
        const table = screen.getByRole('table', { name: 'Spacing / 2 variables' })

        expect(within(table).getByText('--space-12')).toBeTruthy()
        expect(within(table).getByText('--space-128')).toBeTruthy()
        expect(within(table).getByText(lightTheme.space[12])).toBeTruthy()
        expect(screen.queryByText('--space-16')).toBeNull()

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
        const { rerender } = render(<CopyButton label="Copy token" value="vars.space[12]" />)

        await user.click(screen.getByRole('button', { name: 'Copy token' }))
        expect(screen.getByRole('button', { name: 'Copied: Copy token' })).toBeTruthy()

        rerender(<CopyButton label="Copy token" value="vars.space[16]" />)
        await user.click(screen.getByRole('button', { name: 'Copy token' }))
        expect(writeText).toHaveBeenLastCalledWith('vars.space[16]')
    })
})
