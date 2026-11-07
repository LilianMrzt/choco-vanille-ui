import { render, screen, within } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'

import ButtonAppearance from '@stories/actions/button/components/button-appearance/ButtonAppearance'
import IconButtonAppearance from '@stories/actions/icon-button/components/icon-button-appearance/IconButtonAppearance'
import ToggleAppearance from '@stories/actions/toggle/components/toggle-appearance/ToggleAppearance'
import BadgeAppearance from '@stories/data-display/badge/components/badge-appearance/BadgeAppearance'
import { COLORS as BUTTON_COLORS, VARIANTS as BUTTON_VARIANTS } from '@stories/actions/button/constants'
import { COLORS as ICON_COLORS, VARIANTS as ICON_VARIANTS } from '@stories/actions/icon-button/constants'
import { COLORS as TOGGLE_COLORS, VARIANTS as TOGGLE_VARIANTS } from '@stories/actions/toggle/constants'
import { COLORS as BADGE_COLORS, VARIANTS as BADGE_VARIANTS } from '@stories/data-display/badge/constants'
import { Appearance as ButtonComparison, Sizes as ButtonSizes } from '@stories/actions/button/Button.stories'
import { Appearance as IconComparison, Sizes as IconSizes } from '@stories/actions/icon-button/IconButton.stories'
import { Appearance as ToggleComparison, Sizes as ToggleSizes } from '@stories/actions/toggle/Toggle.stories'
import { Appearance as BadgeComparison, Sizes as BadgeSizes } from '@stories/data-display/badge/Badge.stories'

describe('Appearance comparisons', () => {
    it.each([
        { name: 'Button', render: ButtonAppearance, colors: BUTTON_COLORS, variants: BUTTON_VARIANTS, story: ButtonComparison, sizes: ButtonSizes },
        { name: 'IconButton', render: IconButtonAppearance, colors: ICON_COLORS, variants: ICON_VARIANTS, story: IconComparison, sizes: IconSizes },
        { name: 'Toggle', render: ToggleAppearance, colors: TOGGLE_COLORS, variants: TOGGLE_VARIANTS, story: ToggleComparison, sizes: ToggleSizes },
        { name: 'Badge', render: BadgeAppearance, colors: BADGE_COLORS, variants: BADGE_VARIANTS, story: BadgeComparison, sizes: BadgeSizes },
    ])('shows every $name treatment in every color without mixing in sizes', (example) => {
        const { container } = render(createElement(example.render))
        const source: string = example.story.parameters?.docs.source.code
        const classes = new Set<string>()
        for (const color of example.colors) {
            expect(screen.getByRole('heading', { name: color })).toBeTruthy()
            const group = within(screen.getByRole('group', { name: color }))
            for (const variant of example.variants) {
                const name = `${color}, ${variant}`
                const instance = example.name === 'Badge'
                    ? group.getByText(variant).parentElement
                    : group.getByRole('button', { name: example.name === 'IconButton' ? name : variant })
                expect(instance).toBeTruthy()
                classes.add(instance?.className ?? '')
                expect(source).toContain(`color="${color}"`)
                expect(source).toContain(`variant="${variant}"`)
                expect(source).toContain(example.name === 'IconButton' ? `"${name}"` : `label="${variant}"`)
            }
        }
        expect(classes.size).toBe(example.colors.length * example.variants.length)
        expect(source).not.toContain('size=')
        expect(example.sizes.parameters?.docs.source.code).toContain('size=')
        expect(container.firstElementChild?.getAttribute('style')).toContain('40rem')
    })
})
