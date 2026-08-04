import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'
import Inset from '@components/layout/inset/Inset.tsx'
import { INSET_STYLES } from '@components/layout/inset/styles/Inset.css.ts'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Inset', () => {
    it('renders a div containing its children', () => {
        const { container } = render(<Inset space="md">content</Inset>)

        expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        expect(screen.getByText('content')).toBeTruthy()
    })

    it('uses the supplied spacing token as a negative margin variable', () => {
        const { container } = render(<Inset space="lg">content</Inset>)

        expect(
            getFirstChild(container).style.getPropertyValue(
                INSET_STYLES.insetSpaceProperty,
            ),
        ).toBe(SPACE_VARIANTS.lg)
    })

    it('applies the requested logical side', () => {
        const { container } = render(
            <Inset
                space="md"
                side="top"
                clip="padding-box"
                paddingBottom="current"
            >
                content
            </Inset>,
        )

        expect(getFirstChild(container).className).toContain(
            INSET_STYLES.recipe({ side: 'top', clip: 'padding-box' }),
        )
    })

    it('merges custom classes and forwards HTML attributes', () => {
        const { container } = render(
            <Inset space="md" className="custom-inset" data-testid="inset">
                content
            </Inset>,
        )

        expect(getFirstChild(container).className).toContain('custom-inset')
        expect(screen.getByTestId('inset')).toBeTruthy()
    })

    it('forwards refs to the underlying div', () => {
        const ref = createRef<HTMLDivElement>()

        render(<Inset ref={ref} space="md">content</Inset>)

        expect(ref.current?.tagName.toLowerCase()).toBe('div')
    })

    it('sets a display name', () => {
        expect(Inset.displayName).toBe('Inset')
    })
})
