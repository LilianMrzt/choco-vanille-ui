import type { Meta } from '@storybook/react-vite'

import type { IconSize } from '@components/foundation/icon'
import type { TypographySize, TypographyWeight } from '@components/foundation/typography'
import type { LinkProps } from '@components/navigation/link'
import ChevronLeftIcon from '@resources/asset/ChevronLeftIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import { lightColors } from '@theme/tokens/colors/lightColors.const.ts'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

export const FONT_SIZES: TypographySize[] = [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
export const FONT_WEIGHTS: TypographyWeight[] = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']
const ICON_SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const LINK_COLORS = getColorEntries(lightColors).map(([name]) => name)
const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128, 'auto'] as const
const PADDINGS = SPACING.filter((value) => value !== 'auto')

export const DEFAULT_ARGS = {
    href: '/',
    label: 'Link',
} satisfies NonNullable<Meta<LinkProps>['args']>

export const ARG_TYPES = {
    href: { control: 'text', description: 'Destination URL.', table: { defaultValue: { summary: '#' } } },
    label: { control: 'text', description: 'Visible text and default accessible name.' },
    color: { control: 'select', options: [undefined, ...LINK_COLORS], description: 'Theme color at rest; hover and active use link colors.' },
    startIcon: { control: 'select', options: ['None', 'ChevronLeft'], mapping: { None: undefined, ChevronLeft: ChevronLeftIcon }, description: 'Decorative leading icon.' },
    endIcon: { control: 'select', options: ['None', 'ChevronRight'], mapping: { None: undefined, ChevronRight: ChevronRightIcon }, description: 'Decorative trailing icon.' },
    fontSize: { control: 'select', options: FONT_SIZES, description: 'Label font size.', table: { defaultValue: { summary: '16' } } },
    fontWeight: { control: 'select', options: FONT_WEIGHTS, description: 'Label font weight.', table: { defaultValue: { summary: 'normal' } } },
    iconSize: { control: 'select', options: ICON_SIZES, description: 'Icon size.', table: { defaultValue: { summary: 'md' } } },
    margin: { control: 'select', options: SPACING, description: 'Margin token.' },
    marginTop: { control: 'select', options: SPACING, description: 'Top margin token.' },
    marginRight: { control: 'select', options: SPACING, description: 'Right margin token.' },
    marginBottom: { control: 'select', options: SPACING, description: 'Bottom margin token.' },
    marginLeft: { control: 'select', options: SPACING, description: 'Left margin token.' },
    padding: { control: 'select', options: PADDINGS, description: 'Padding token.' },
    width: { control: 'text', description: 'CSS width.' },
    alignSelf: { control: 'select', options: [undefined, 'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'], description: 'CSS self-alignment.' },
    target: { control: 'text', description: 'Native link target.' },
    rel: { control: 'text', description: 'Native link relationship.' },
    onClick: { control: false, description: 'Click handler; prevents native navigation when supplied.' },
    className: { control: false, description: 'Additional anchor class.' },
    style: { control: false, description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref to the anchor.' },
} satisfies NonNullable<Meta<LinkProps>['argTypes']>
