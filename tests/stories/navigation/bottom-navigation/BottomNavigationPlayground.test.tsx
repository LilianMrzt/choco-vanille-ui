import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import BottomNavigationPlayground from '@stories/navigation/bottom-navigation/components/playground/BottomNavigationPlayground'
import type { BottomNavigationStoryArgs } from '@stories/navigation/bottom-navigation/types'
import { playNavigation } from '@stories/navigation/bottom-navigation/utils/playNavigation.utils'

const controls = vi.hoisted((): { args: BottomNavigationStoryArgs; updateArgs: ReturnType<typeof vi.fn> } => ({
    args: { 'aria-label': 'Primary navigation', children: null, value: 'home' },
    updateArgs: vi.fn(),
}))

vi.mock('storybook/preview-api', () => ({
    useArgs: () => [controls.args, controls.updateArgs],
}))

describe('BottomNavigationPlayground', () => {
    it('completes its play when Controls asynchronously replace the rendered nodes', async () => {
        let revision = 0
        const { container, rerender } = render(<BottomNavigationPlayground key={revision} />)
        controls.updateArgs.mockImplementation((next: Partial<BottomNavigationStoryArgs>) => {
            setTimeout(() => {
                controls.args = { ...controls.args, ...next }
                revision += 1
                rerender(<BottomNavigationPlayground key={revision} />)
            }, 0)
        })

        await playNavigation({ canvasElement: container })
        expect(screen.getByRole('link', { name: 'Search' }).getAttribute('aria-current')).toBe('page')
    })
})
