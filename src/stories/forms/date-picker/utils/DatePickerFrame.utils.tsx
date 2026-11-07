import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import type { DatePicker } from '@components/forms/date-picker'

/**
 * Bounds segmented date fields to the canvas and preserves horizontal access at narrow widths.
 * @internal Not part of the public package API.
 * @param Story - Storybook's story renderer.
 * @returns A responsive, scrollable frame.
 * @example
 * decorators: [DatePickerFrame]
 */
export const DatePickerFrame: Decorator<ComponentProps<typeof DatePicker> & { width?: string }> = (Story) => (
    <div
        aria-label={'Date picker examples'}
        role={'region'}
        style={{
            boxSizing: 'border-box',
            maxWidth: '100%',
            minWidth: 0,
            overflowX: 'auto',
            width: 'min(24rem, calc(100vw - 2rem))',
        }}
    >
        <Story />
    </div>
)
