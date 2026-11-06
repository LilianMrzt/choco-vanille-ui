import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { PaginationProps } from '@components/navigation/pagination'

export const DEFAULT_ARGS = {
    'aria-label': 'Product pages',
    currentPage: 3,
    totalPages: 10,
    previousLabel: 'Previous',
    nextLabel: 'Next',
    siblingCount: 1,
    boundaryCount: 1,
    onPageChange: fn(),
} satisfies NonNullable<Meta<PaginationProps>['args']>

export const ARG_TYPES = {
    'aria-label': { control: 'text', description: 'Accessible navigation landmark name.' },
    currentPage: { control: { type: 'number', min: 1, step: 1 }, description: 'Selected page, starting at one.' },
    totalPages: { control: { type: 'number', min: 1, step: 1 }, description: 'Total number of available pages.' },
    siblingCount: { control: { type: 'number', min: 0, step: 1 }, description: 'Pages shown around the current page.', table: { defaultValue: { summary: '1' } } },
    boundaryCount: { control: { type: 'number', min: 0, step: 1 }, description: 'Pages shown at each boundary.', table: { defaultValue: { summary: '1' } } },
    previousLabel: { control: 'text', description: 'Accessible previous button name.' },
    nextLabel: { control: 'text', description: 'Accessible next button name.' },
    onPageChange: { control: false, description: 'Called with the requested page number.' },
    className: { control: false, description: 'Additional navigation class.' },
    style: { control: false, description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref to the navigation element.' },
} satisfies NonNullable<Meta<PaginationProps>['argTypes']>
