import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import {
    Fab,
    FAB_POSITIONS_ARRAY,
    FAB_STYLES,
    type FabProps,
    type FabSize,
} from '@components/actions/fab'
import { BUTTON_STYLES } from '@components/actions/button'
import { ICON_BUTTON_STYLES } from '@components/actions/icon-button'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import { Fab as PublicFab } from '@/index'
import type { IconComponent } from '@components/foundation/icon'

describe('Fab', () => {
    it('exposes the same component from the public entry', () => {
        expect(PublicFab).toBe(Fab)
        expectTypeOf<FabProps['icon']>().toEqualTypeOf<IconComponent>()
    })

    describe('round (icon-only) rendering', () => {
        it('renders a button named by aria-label', () => {
            render(<Fab icon={BoldIcon} aria-label={'New trip'} />)
            expect(screen.getByRole('button', { name: 'New trip' })).toBeTruthy()
        })

        it('composes a contained IconButton with the default Fab recipe', () => {
            render(<Fab icon={BoldIcon} aria-label={'New trip'} />)
            const className = screen.getByRole('button').className
            expect(className).toContain(
                ICON_BUTTON_STYLES.recipe({ variant: 'contained', size: 'md' }),
            )
            expect(className).toContain(
                FAB_STYLES.recipe({ position: 'bottom-end', size: 'md', extended: false }),
            )
        })
    })

    describe('extended rendering', () => {
        it('renders the visible label as accessible name', () => {
            render(<Fab icon={BoldIcon} label={'New trip'} />)
            const button = screen.getByRole('button', { name: 'New trip' })
            expect(button.textContent).toBe('New trip')
            expect(button.querySelector('svg')).toBeTruthy()
        })

        it('composes a contained Button with the extended Fab recipe', () => {
            render(<Fab icon={BoldIcon} label={'New trip'} />)
            const className = screen.getByRole('button').className
            expect(className).toContain(
                BUTTON_STYLES.recipe({ variant: 'contained', size: 'md' }),
            )
            expect(className).toContain(FAB_STYLES.recipe({ extended: true }))
        })
    })

    describe('variants', () => {
        it.each(FAB_POSITIONS_ARRAY)('applies position="%s"', (position) => {
            render(<Fab icon={BoldIcon} aria-label={'Add'} position={position} />)
            expect(screen.getByRole('button').className).toContain(
                FAB_STYLES.recipe({ position }),
            )
        })

        it('produces distinct class names for each position', () => {
            const classNames = FAB_POSITIONS_ARRAY.map((position) =>
                FAB_STYLES.recipe({ position }),
            )
            expect(new Set(classNames).size).toBe(FAB_POSITIONS_ARRAY.length)
        })

        const sizes: FabSize[] = ['sm', 'md', 'lg']

        it.each(sizes)('applies size="%s"', (size) => {
            render(<Fab icon={BoldIcon} aria-label={'Add'} size={size} />)
            expect(screen.getByRole('button').className).toContain(
                FAB_STYLES.recipe({ size }),
            )
        })

        it('forwards color to the underlying button', () => {
            render(<Fab icon={BoldIcon} aria-label={'Add'} color={'secondary'} />)
            expect(screen.getByRole('button').className).toContain(
                ICON_BUTTON_STYLES.recipe({ color: 'secondary' }),
            )
        })
    })

    describe('HTML behavior', () => {
        it('merges a custom className', () => {
            render(<Fab icon={BoldIcon} aria-label={'Add'} className={'custom'} />)
            expect(screen.getByRole('button').className).toContain('custom')
        })

        it('calls onClick when clicked', async () => {
            const onClick = vi.fn()
            render(<Fab icon={BoldIcon} label={'Add'} onClick={onClick} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(<Fab icon={BoldIcon} aria-label={'Add'} disabled onClick={onClick} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).not.toHaveBeenCalled()
        })

        it('forwards the ref to the button element', () => {
            const ref = createRef<HTMLButtonElement>()
            render(<Fab ref={ref} icon={BoldIcon} label={'Add'} />)
            expect(ref.current?.tagName.toLowerCase()).toBe('button')
        })
    })

    it('sets displayName to "Fab"', () => {
        expect(Fab.displayName).toBe('Fab')
    })
})
