import { createElement } from 'react'
import type { Meta } from '@storybook/react-vite'

import { Button } from '@components/actions/button'
import type { TooltipProps } from '@components/overlay/tooltip'

export type TooltipStoryArgs = Omit<TooltipProps, 'content'> & {
    triggerLabel: string
    content: string
}

const POSITIONS = ['top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end', 'left-start', 'left', 'left-end'] as const

export const DEFAULT_ARGS = {
    content: 'Tooltip content',
    children: createElement(Button, { label: 'Hover me' }),
    triggerLabel: 'Hover me',
    open: false,
    side: 'top',
    align: 'center',
    delayDuration: 0,
    disabled: false,
    openOnFocus: true,
    arrow: false,
    closeOnClick: true,
} satisfies NonNullable<Meta<TooltipStoryArgs>['args']>

export const ARG_TYPES = {
    content: { control: 'text' },
    children: { control: false, description: 'A single focusable trigger element.' },
    triggerLabel: { control: 'text' },
    position: { control: 'select', options: [undefined, ...POSITIONS], description: 'Overrides side and alignment.' },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    delayDuration: { control: { type: 'number', min: 0 } },
    disabled: { control: 'boolean' },
    openOnFocus: { control: 'boolean' },
    arrow: { control: 'boolean' },
    closeOnClick: { control: 'boolean' },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean', description: 'Initial uncontrolled state; remount to apply changes.' },
    onOpenChange: { control: false, action: 'open changed' },
    className: { control: false },
} satisfies NonNullable<Meta<TooltipStoryArgs>['argTypes']>
