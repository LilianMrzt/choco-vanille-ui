import { createElement } from 'react'
import type { Meta } from '@storybook/react-vite'

import { Breadcrumbs, BREADCRUMBS_SEPARATORS } from '@components/navigation/breadcrumbs'
import { lightColors } from '@theme/tokens/colors/lightColors.const.ts'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

import type { BreadcrumbsStoryArgs } from '@stories/navigation/breadcrumbs/types'

export const DEFAULT_ARGS = {
    'aria-label': 'Breadcrumb',
    color: 'primary.main',
    separator: 'chevron',
    currentLabel: 'Details',
    children: createElement(Breadcrumbs.Item, { label: 'Details' }),
} satisfies NonNullable<Meta<BreadcrumbsStoryArgs>['args']>

export const ARG_TYPES = {
    'aria-label': { control: 'text', description: 'Accessible navigation landmark name.' },
    children: { control: false, description: 'Ordered Breadcrumbs.Item elements.' },
    color: { control: 'select', options: [undefined, ...getColorEntries(lightColors).map(([name]) => name)] },
    separator: { control: 'select', options: Object.values(BREADCRUMBS_SEPARATORS) },
    currentLabel: { control: 'text', table: { category: 'Compound: Item' } },
    className: { control: false, description: 'Additional classes; use consumer code to supply a stylesheet.' },
    style: { control: false, description: 'Inline style override; use consumer code.' },
    ref: { control: false, description: 'Navigation DOM ref; requires a React ref object.' },
} satisfies NonNullable<Meta<BreadcrumbsStoryArgs>['argTypes']>
