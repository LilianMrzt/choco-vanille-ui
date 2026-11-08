import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button, type ButtonSize } from '@components/actions/button'
import {
    BUTTON_SIZE_TO_FONT_SIZE,
    BUTTON_SIZE_TO_HEIGHT,
    buttonSizeToIconSize,
} from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_SIZE_STYLES } from '@components/actions/_shared/buttons/styles/ButtonSharedSizes.css'
import { Toggle } from '@components/actions/toggle'
import { IconButton } from '@components/actions/icon-button'
import { ICON_BUTTON_SIZE_VARIANTS } from '@components/actions/icon-button/constants/iconButtonSizeVariants.const'
import { ICON_STYLES } from '@components/foundation/icon/Icon.css'
import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/Typography.css'
import { vars } from '@theme/styles/contract/contract.css.ts'

const sizes: ButtonSize[] = ['sm', 'md', 'lg']

describe('Button sizing', () => {
    it('uses a shared 28/36/44px height scale with distinct 8px steps', () => {
        expect(BUTTON_SIZE_TO_HEIGHT).toEqual({
            sm: '1.75rem',
            md: '2.25rem',
            lg: '2.75rem',
        })
        const heights = sizes.map((size) => Number.parseFloat(BUTTON_SIZE_TO_HEIGHT[size]) * 16)
        expect(heights).toEqual([28, 36, 44])
        expect(heights[1] - heights[0]).toBe(8)
        expect(heights[2] - heights[1]).toBe(8)
    })

    it('keeps icon buttons square and xs at the 24px minimum target size', () => {
        expect(ICON_BUTTON_SIZE_VARIANTS.xs).toEqual({
            height: '1.5rem',
            width: '1.5rem',
        })
        for (const size of sizes) {
            expect(ICON_BUTTON_SIZE_VARIANTS[size]).toEqual({
                height: BUTTON_SIZE_TO_HEIGHT[size],
                width: BUTTON_SIZE_TO_HEIGHT[size],
            })
        }
    })

    it('scales text-button padding and icon gaps with the height', () => {
        expect(BUTTON_SHARED_SIZE_STYLES).toEqual({
            sm: { height: '1.75rem', paddingInline: vars.space[10], gap: vars.space[4] },
            md: { height: '2.25rem', paddingInline: vars.space[14], gap: vars.space[6] },
            lg: { height: '2.75rem', paddingInline: vars.space[20], gap: vars.space[8] },
        })
    })

    it.each(sizes)('renders proportional text and icons for %s buttons and toggles', (size) => {
        const { container } = render(
            <>
                <Button label={'Save'} size={size} startIcon={SearchIcon} />
                <Toggle label={'Search'} size={size} startIcon={SearchIcon} />
                <IconButton aria-label={'Search only'} icon={SearchIcon} size={size} />
            </>,
        )
        for (const svg of container.querySelectorAll('svg')) {
            for (const className of ICON_STYLES.recipe({ size: buttonSizeToIconSize[size] }).split(' ')) {
                expect(svg.classList.contains(className)).toBe(true)
            }
        }
        for (const label of [screen.getByText('Save'), screen.getByText('Search')]) {
            for (const className of TYPOGRAPHY_STYLES.recipe({ fontSize: BUTTON_SIZE_TO_FONT_SIZE[size] }).split(' ')) {
                expect(label.classList.contains(className)).toBe(true)
            }
        }
    })

    it('uses 14/14/16px labels and 14/16/20px icons', () => {
        expect(BUTTON_SIZE_TO_FONT_SIZE).toEqual({ sm: 14, md: 14, lg: 16 })
        expect(buttonSizeToIconSize).toEqual({ sm: 14, md: 16, lg: 20 })
    })

    it('renders a proportional 12px icon in an xs icon button', () => {
        const { container } = render(<IconButton aria-label={'Search'} icon={SearchIcon} size={'xs'} />)
        for (const className of ICON_STYLES.recipe({ size: 12 }).split(' ')) {
            expect(container.querySelector('svg')?.classList.contains(className)).toBe(true)
        }
    })

    it('preserves explicit dimension overrides', () => {
        render(
            <>
                <Button label={'Save'} style={{ height: '3rem' }} width={'12rem'} />
                <IconButton aria-label={'Search'} icon={SearchIcon} style={{ height: '3rem' }} width={'3rem'} />
            </>,
        )
        const button = screen.getByRole('button', { name: 'Save' })
        const iconButton = screen.getByRole('button', { name: 'Search' })
        expect(button.style.height).toBe('3rem')
        expect(button.style.width).toBe('12rem')
        expect(iconButton.style.height).toBe('3rem')
        expect(iconButton.style.width).toBe('3rem')
    })
})
