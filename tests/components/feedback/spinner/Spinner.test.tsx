import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    SPINNER_STYLES,
    Spinner,
    type SpinnerColor,
    type SpinnerSize,
} from '@components/feedback/spinner'

describe('Spinner', () => {
    it('renders a status role by default', () => {
        render(<Spinner />)
        expect(screen.getByRole('status')).toBeTruthy()
    })

    it('forwards an accessible label and custom role', () => {
        render(<Spinner role={'alert'} aria-label={'Saving'} />)
        expect(screen.getByRole('alert', { name: 'Saving' })).toBeTruthy()
    })

    it('applies every supported size', () => {
        const sizes: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

        for (const size of sizes) {
            const { container, unmount } = render(<Spinner size={size} />)
            expect(container.firstElementChild?.className).toContain(
                SPINNER_STYLES.recipe({ size }),
            )
            unmount()
        }
    })

    it('applies every supported color', () => {
        const colors: SpinnerColor[] = [
            'primary',
            'secondary',
            'tertiary',
            'destructive',
            'success',
            'warning',
            'info',
        ]

        for (const color of colors) {
            const { container, unmount } = render(<Spinner color={color} />)
            expect(container.firstElementChild?.className).toContain(
                SPINNER_STYLES.recipe({ color }),
            )
            unmount()
        }
    })

    it('merges a custom className', () => {
        render(<Spinner className={'custom-spinner'} />)
        expect(screen.getByRole('status').className).toContain('custom-spinner')
    })

    it('forwards a ref to the underlying span', () => {
        const ref = createRef<HTMLSpanElement>()
        render(<Spinner ref={ref} />)
        expect(ref.current?.tagName.toLowerCase()).toBe('span')
    })

    it('forwards native attributes while keeping variant props off the DOM', () => {
        render(
            <Spinner
                aria-label={'Saving'}
                color={'success'}
                data-testid={'spinner'}
                size={'lg'}
                title={'Progress'}
            />,
        )

        const spinner = screen.getByTestId('spinner')
        expect(spinner.getAttribute('title')).toBe('Progress')
        expect(spinner.getAttribute('color')).toBeNull()
        expect(spinner.getAttribute('size')).toBeNull()
    })

    it('sets its display name', () => {
        expect(Spinner.displayName).toBe('Spinner')
    })
})
