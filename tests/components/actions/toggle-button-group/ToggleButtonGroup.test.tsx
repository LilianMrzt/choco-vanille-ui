import { createRef, useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    ToggleButtonGroup,
    TOGGLE_BUTTON_GROUP_STYLES,
    TOGGLE_BUTTON_GROUP_ICON_ITEM_STYLES,
} from '@components/actions/toggle-button-group'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

const ControlledToggleButtonGroup = ({
    defaultValue,
    onValueChange,
    ...props
}: Omit<
  React.ComponentProps<typeof ToggleButtonGroup>,
  'value' | 'onValueChange'
> & {
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}) => {
    const [value, setValue] = useState<string[]>(defaultValue ?? [])

    return (
        <ToggleButtonGroup
            {...props}
            value={value}
            onValueChange={(newValue) => {
                setValue(newValue)
                onValueChange?.(newValue)
            }}
        />
    )
}

describe('ToggleButtonGroup', () => {
    describe('default rendering', () => {
        it('renders a <div> with role="group"', () => {
            const { container } = render(
                <ToggleButtonGroup>
                    <ToggleButtonGroup.Item value="a" label="A" />
                </ToggleButtonGroup>,
            )
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
            expect(getFirstChild(container).getAttribute('role')).toBe('group')
        })

        it('renders all child toggle buttons', () => {
            render(
                <ToggleButtonGroup>
                    <ToggleButtonGroup.Item value="a" label="A" />
                    <ToggleButtonGroup.Item value="b" label="B" />
                    <ToggleButtonGroup.Item value="c" label="C" />
                </ToggleButtonGroup>,
            )
            expect(screen.getByRole('button', { name: 'A' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'B' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'C' })).toBeTruthy()
        })

        it('renders icon items', () => {
            render(
                <ToggleButtonGroup>
                    <ToggleButtonGroup.IconItem
                        value="a"
                        icon="lucide:bold"
                        aria-label="Bold"
                    />
                    <ToggleButtonGroup.IconItem
                        value="b"
                        icon="lucide:italic"
                        aria-label="Italic"
                    />
                </ToggleButtonGroup>,
            )
            expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Italic' })).toBeTruthy()
        })
    })

    describe('selection behavior', () => {
        it('selects only one button by default', async () => {
            render(
                <ControlledToggleButtonGroup defaultValue={['a']}>
                    <ToggleButtonGroup.Item value="a" label="A" />
                    <ToggleButtonGroup.Item value="b" label="B" />
                </ControlledToggleButtonGroup>,
            )

            expect(
                screen.getByRole('button', { name: 'A' }).getAttribute('aria-pressed'),
            ).toBe('true')
            expect(
                screen.getByRole('button', { name: 'B' }).getAttribute('aria-pressed'),
            ).toBe('false')

            await userEvent.click(screen.getByRole('button', { name: 'B' }))

            expect(
                screen.getByRole('button', { name: 'A' }).getAttribute('aria-pressed'),
            ).toBe('false')
            expect(
                screen.getByRole('button', { name: 'B' }).getAttribute('aria-pressed'),
            ).toBe('true')
        })

        it('allows multiple selections when multiple is true', async () => {
            render(
                <ControlledToggleButtonGroup defaultValue={['a']} multiple>
                    <ToggleButtonGroup.Item value="a" label="A" />
                    <ToggleButtonGroup.Item value="b" label="B" />
                </ControlledToggleButtonGroup>,
            )

            await userEvent.click(screen.getByRole('button', { name: 'B' }))

            expect(
                screen.getByRole('button', { name: 'A' }).getAttribute('aria-pressed'),
            ).toBe('true')
            expect(
                screen.getByRole('button', { name: 'B' }).getAttribute('aria-pressed'),
            ).toBe('true')
        })

        it('calls onValueChange when selection changes', async () => {
            const onValueChange = vi.fn()
            render(
                <ControlledToggleButtonGroup onValueChange={onValueChange}>
                    <ToggleButtonGroup.Item value="a" label="A" />
                    <ToggleButtonGroup.Item value="b" label="B" />
                </ControlledToggleButtonGroup>,
            )

            await userEvent.click(screen.getByRole('button', { name: 'B' }))
            expect(onValueChange).toHaveBeenCalledWith(['b'])
        })
    })

    describe('orientation styling', () => {
        it('applies horizontal orientation styles by default', () => {
            const { container } = render(
                <ToggleButtonGroup>
                    <ToggleButtonGroup.Item value="a" label="A" />
                </ToggleButtonGroup>,
            )
            expect(getFirstChild(container).className).toBe(
                TOGGLE_BUTTON_GROUP_STYLES.recipe({ orientation: 'horizontal' }),
            )
        })

        it('applies vertical orientation styles when set', () => {
            const { container } = render(
                <ToggleButtonGroup orientation="vertical">
                    <ToggleButtonGroup.Item value="a" label="A" />
                </ToggleButtonGroup>,
            )
            expect(getFirstChild(container).className).toBe(
                TOGGLE_BUTTON_GROUP_STYLES.recipe({ orientation: 'vertical' }),
            )
        })
    })

    describe('disabled state', () => {
        it('disables all buttons when group is disabled', () => {
            render(
                <ToggleButtonGroup disabled>
                    <ToggleButtonGroup.Item value="a" label="A" />
                    <ToggleButtonGroup.Item value="b" label="B" />
                </ToggleButtonGroup>,
            )
            expect(
                (screen.getByRole('button', { name: 'A' }) as HTMLButtonElement)
                    .disabled,
            ).toBe(true)
            expect(
                (screen.getByRole('button', { name: 'B' }) as HTMLButtonElement)
                    .disabled,
            ).toBe(true)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <ToggleButtonGroup className="my-custom-class">
                    <ToggleButtonGroup.Item value="a" label="A" />
                </ToggleButtonGroup>,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <ToggleButtonGroup ref={ref}>
                    <ToggleButtonGroup.Item value="a" label="A" />
                </ToggleButtonGroup>,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('icon item selection behavior', () => {
        it('selects only one icon item by default', async () => {
            render(
                <ControlledToggleButtonGroup defaultValue={['a']}>
                    <ToggleButtonGroup.IconItem
                        value="a"
                        icon="lucide:bold"
                        aria-label="Bold"
                    />
                    <ToggleButtonGroup.IconItem
                        value="b"
                        icon="lucide:italic"
                        aria-label="Italic"
                    />
                </ControlledToggleButtonGroup>,
            )

            expect(
                screen
                    .getByRole('button', { name: 'Bold' })
                    .getAttribute('aria-pressed'),
            ).toBe('true')
            expect(
                screen
                    .getByRole('button', { name: 'Italic' })
                    .getAttribute('aria-pressed'),
            ).toBe('false')

            await userEvent.click(screen.getByRole('button', { name: 'Italic' }))

            expect(
                screen
                    .getByRole('button', { name: 'Bold' })
                    .getAttribute('aria-pressed'),
            ).toBe('false')
            expect(
                screen
                    .getByRole('button', { name: 'Italic' })
                    .getAttribute('aria-pressed'),
            ).toBe('true')
        })

        it('applies a non-empty class for icon items', () => {
            const { container } = render(
                <ToggleButtonGroup>
                    <ToggleButtonGroup.IconItem
                        value="a"
                        icon="lucide:bold"
                        aria-label="Bold"
                    />
                </ToggleButtonGroup>,
            )
            const button = container.querySelector('button')
            expect(button!.className.length).toBeGreaterThan(0)
        })

        it('produces distinct icon item class names for each size', () => {
            const sizes = ['sm', 'md', 'lg'] as const
            const classNames = sizes.map((size) =>
                TOGGLE_BUTTON_GROUP_ICON_ITEM_STYLES.recipe({ size }),
            )
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('displayName', () => {
        it('is set to "ToggleButtonGroup"', () => {
            expect(ToggleButtonGroup.displayName).toBe('ToggleButtonGroup')
        })

        it('is set to "ToggleButtonGroup.Item" on the item', () => {
            expect(ToggleButtonGroup.Item.displayName).toBe('ToggleButtonGroup.Item')
        })

        it('is set to "ToggleButtonGroup.IconItem" on the icon item', () => {
            expect(ToggleButtonGroup.IconItem.displayName).toBe(
                'ToggleButtonGroup.IconItem',
            )
        })
    })
})
