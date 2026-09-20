import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    ToggleGroup,
    TOGGLE_GROUP_STYLES,
} from '@components/actions/toggle-group'
import { BOX_STYLES } from '@components/layout/box'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'

// Helper

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

// A reusable three-item group helper.
const TestGroup = (props: React.ComponentProps<typeof ToggleGroup>) => (
    <ToggleGroup aria-label={'Formatting'} {...props}>
        <ToggleGroup.Item value={'bold'} label={'Bold'} />
        <ToggleGroup.Item value={'italic'} label={'Italic'} />
        <ToggleGroup.Item value={'underline'} label={'Underline'} disabled />
    </ToggleGroup>
)

// Suites

describe('ToggleGroup', () => {
    describe('default rendering', () => {
        it('renders a container element', () => {
            const { container } = render(<TestGroup />)
            expect(getFirstChild(container)).toBeTruthy()
        })

        it('renders all item buttons', () => {
            render(<TestGroup />)
            expect(screen.getAllByRole('button')).toHaveLength(3)
        })

        it('renders items with their labels', () => {
            render(<TestGroup />)
            expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Italic' })).toBeTruthy()
        })
    })

    describe('orientation', () => {
        it('defaults to horizontal orientation', () => {
            const { container } = render(<TestGroup />)
            expect(getFirstChild(container).getAttribute('data-orientation')).toBe(
                'horizontal',
            )
        })

        it('applies vertical orientation when specified', () => {
            const { container } = render(<TestGroup orientation={'vertical'} />)
            expect(getFirstChild(container).getAttribute('data-orientation')).toBe(
                'vertical',
            )
        })

        it('applies distinct class names for each orientation', () => {
            const horizontal = TOGGLE_GROUP_STYLES.recipe({
                orientation: 'horizontal',
            })
            const vertical = TOGGLE_GROUP_STYLES.recipe({
                orientation: 'vertical',
            })
            expect(horizontal).not.toBe(vertical)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<TestGroup className={'my-group'} />)
            expect(getFirstChild(container).className).toContain('my-group')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<TestGroup />)
            for (const cls of TOGGLE_GROUP_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('uncontrolled selection', () => {
        it('starts with no items pressed when no defaultValue is provided', () => {
            render(<TestGroup />)
            for (const btn of screen.getAllByRole('button')) {
                expect(btn.getAttribute('data-pressed')).toBeNull()
            }
        })

        it('starts with the specified item pressed when defaultValue is set', () => {
            render(<TestGroup defaultValue={['bold']} />)
            expect(
                screen
                    .getByRole('button', { name: 'Bold' })
                    .getAttribute('data-pressed'),
            ).not.toBeNull()
        })

        it('selects an item when it is clicked', async () => {
            render(<TestGroup />)
            await userEvent.click(screen.getByRole('button', { name: 'Bold' }))
            expect(
                screen
                    .getByRole('button', { name: 'Bold' })
                    .getAttribute('data-pressed'),
            ).not.toBeNull()
        })

        it('deselects the previously selected item in single-select mode', async () => {
            render(<TestGroup defaultValue={['bold']} />)
            await userEvent.click(screen.getByRole('button', { name: 'Italic' }))
            expect(
                screen
                    .getByRole('button', { name: 'Bold' })
                    .getAttribute('data-pressed'),
            ).toBeNull()
            expect(
                screen
                    .getByRole('button', { name: 'Italic' })
                    .getAttribute('data-pressed'),
            ).not.toBeNull()
        })

        it('allows multiple items pressed when multiple={true}', async () => {
            render(<TestGroup multiple />)
            await userEvent.click(screen.getByRole('button', { name: 'Bold' }))
            await userEvent.click(screen.getByRole('button', { name: 'Italic' }))
            expect(
                screen
                    .getByRole('button', { name: 'Bold' })
                    .getAttribute('data-pressed'),
            ).not.toBeNull()
            expect(
                screen
                    .getByRole('button', { name: 'Italic' })
                    .getAttribute('data-pressed'),
            ).not.toBeNull()
        })
    })

    describe('controlled selection', () => {
        it('renders the specified item as pressed when value is provided', () => {
            render(<TestGroup value={['italic']} onValueChange={() => {}} />)
            expect(
                screen
                    .getByRole('button', { name: 'Italic' })
                    .getAttribute('data-pressed'),
            ).not.toBeNull()
            expect(
                screen
                    .getByRole('button', { name: 'Bold' })
                    .getAttribute('data-pressed'),
            ).toBeNull()
        })

        it('calls onValueChange with the new value array when an item is clicked', async () => {
            const onValueChange = vi.fn()
            render(<TestGroup value={[]} onValueChange={onValueChange} />)
            await userEvent.click(screen.getByRole('button', { name: 'Bold' }))
            expect(onValueChange).toHaveBeenCalledWith(['bold'], expect.anything())
        })
    })

    describe('disabled item', () => {
        it('marks a disabled item with data-disabled', () => {
            render(<TestGroup />)
            expect(
                screen
                    .getByRole('button', { name: 'Underline' })
                    .getAttribute('data-disabled'),
            ).not.toBeNull()
        })

        it('does not press a disabled item on click', async () => {
            render(<TestGroup />)
            await userEvent.click(screen.getByRole('button', { name: 'Underline' }))
            expect(
                screen
                    .getByRole('button', { name: 'Underline' })
                    .getAttribute('data-pressed'),
            ).toBeNull()
        })
    })

    describe('keyboard navigation', () => {
        it('moves focus to the next item with ArrowRight', async () => {
            render(<TestGroup />)
            const boldBtn = screen.getByRole('button', { name: 'Bold' })
            boldBtn.focus()
            await userEvent.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Italic' }),
            )
        })

        it('moves focus to the previous item with ArrowLeft', async () => {
            render(<TestGroup />)
            const italicBtn = screen.getByRole('button', { name: 'Italic' })
            italicBtn.focus()
            await userEvent.keyboard('{ArrowLeft}')
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Bold' }),
            )
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<TestGroup data-testid={'group'} />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'group',
            )
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying container element', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <ToggleGroup ref={ref} aria-label={'Group'}>
                    <ToggleGroup.Item value={'a'} label={'A'} />
                </ToggleGroup>,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('compound slots', () => {
        it('exposes ToggleGroup.Item', () => {
            expect(ToggleGroup.Item).toBeDefined()
        })

        it('ToggleGroup.Item has displayName "ToggleGroup.Item"', () => {
            expect(ToggleGroup.Item.displayName).toBe('ToggleGroup.Item')
        })

        it('ToggleGroup.Item renders a button with its label', () => {
            render(
                <ToggleGroup aria-label={'Group'}>
                    <ToggleGroup.Item value={'x'} label={'Option X'} />
                </ToggleGroup>,
            )
            expect(screen.getByRole('button', { name: 'Option X' })).toBeTruthy()
        })

        it('ToggleGroup.Item accepts an icon prop for icon-only mode', () => {
            const { container } = render(
                <ToggleGroup aria-label={'Group'}>
                    <ToggleGroup.Item
                        value={'check'}
                        icon={CheckIcon}
                        aria-label={'Check'}
                    />
                </ToggleGroup>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('ToggleGroup.Item accepts button layout props', () => {
            render(
                <ToggleGroup aria-label={'Group'}>
                    <ToggleGroup.Item
                        value={'x'}
                        label={'Option X'}
                        marginRight={'xs'}
                        width={'10rem'}
                    />
                </ToggleGroup>,
            )

            const item = screen.getByRole('button', { name: 'Option X' })
            expect(item.className).toContain(
                BOX_STYLES.recipe({ marginRight: 'xs' }),
            )
            expect(item.style.width).toBe('10rem')
        })
    })

    describe('displayName', () => {
        it('is set to "ToggleGroup"', () => {
            expect(ToggleGroup.displayName).toBe('ToggleGroup')
        })
    })
})
