import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import type { BottomNavigationStoryArgs } from '@stories/navigation/bottom-navigation/types'

import type { BoxSpace } from '@components/layout/box'

export const GAP_OPTIONS: BoxSpace[] = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128]

export const ARG_TYPES = {
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    className: { control: 'text' },
    bordered: { control: 'boolean' },
    defaultValue: { control: false, description: 'Initial uncontrolled selection; remount to apply changes.' },
    value: { control: 'text' },
    onValueChange: { control: false, description: 'Selected value callback; requires consumer code.' },
    children: { control: false, description: 'Compose List and Item slots in consumer code; edit the slot demonstration controls here.' },
    listClassName: {
        control: 'text',
        table: { category: 'Compound: List' },
    },
    listGap: {
        control: 'select',
        options: GAP_OPTIONS,
        table: { category: 'Compound: List' },
    },
    listWidth: {
        control: 'text',
        table: { category: 'Compound: List' },
    },
    listMaxWidth: {
        control: 'text',
        table: { category: 'Compound: List' },
    },
    itemLabel: {
        control: 'text',
        table: { category: 'Compound: Item' },
    },
    itemShowLabel: {
        control: 'boolean',
        table: { category: 'Compound: Item' },
    },
    itemAriaLabel: {
        control: 'text',
        table: { category: 'Compound: Item' },
    },
    itemHref: {
        control: 'text',
        table: { category: 'Compound: Item' },
    },
    itemHeight: {
        control: 'text',
        table: { category: 'Compound: Item' },
    },
    itemDisabled: {
        control: 'boolean',
        table: { category: 'Compound: Item' },
    },
    itemOnClick: {
        control: false,
        description: 'Native click callback; requires consumer code.',
        table: { category: 'Compound: Item' },
    },
} satisfies NonNullable<Meta<BottomNavigationStoryArgs>['argTypes']>

export const DEFAULT_ARGS = {
    'aria-label': 'Primary navigation',
    bordered: false,
    value: 'home',
    onValueChange: fn(),
    itemOnClick: fn(),
    listClassName: '',
    listGap: 2,
    listWidth: '100%',
    listMaxWidth: '32rem',
    itemLabel: 'Home',
    itemShowLabel: true,
    itemAriaLabel: 'Home',
    itemHref: '/',
    itemHeight: '',
    itemDisabled: false,
} satisfies NonNullable<Meta<BottomNavigationStoryArgs>['args']>
