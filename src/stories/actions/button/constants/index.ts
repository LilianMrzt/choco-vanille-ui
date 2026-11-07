import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from '@components/actions/button'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'

export const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'ghost']
export const COLORS: ButtonColor[] = ['primary', 'secondary', 'neutral', 'danger', 'success', 'warning', 'info']
export const SIZES: ButtonSize[] = ['sm', 'md', 'lg']
const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128, 'auto']

export const DEFAULT_ARGS = {
    label: 'Button',
    onClick: fn(),
} satisfies NonNullable<Meta<ButtonProps>['args']>

export const ARG_TYPES = {
    label: { control: 'text', description: 'Visible text and accessible name.' },
    href: { control: false, description: 'When supplied, renders an anchor instead of a button; see WithHref.' },
    variant: { control: 'select', options: VARIANTS, description: 'Visual treatment.', table: { defaultValue: { summary: 'contained' } } },
    color: { control: 'select', options: COLORS, description: 'Semantic color intent.', table: { defaultValue: { summary: 'primary' } } },
    size: { control: 'select', options: SIZES, description: 'Height at a 16px root: sm 28px, md 36px, lg 44px. Fixed across viewport and pointer types.', table: { defaultValue: { summary: 'md' } } },
    startIcon: { control: 'select', options: ['None', 'Trash'], mapping: { None: undefined, Trash: TrashIcon }, description: 'Decorative leading SVG component.' },
    endIcon: { control: 'select', options: ['None', 'Chevron'], mapping: { None: undefined, Chevron: ChevronRightIcon }, description: 'Decorative trailing SVG component.' },
    margin: { control: 'select', options: SPACING, description: 'Margin token.' },
    marginTop: { control: 'select', options: SPACING, description: 'Top margin token.' },
    marginRight: { control: 'select', options: SPACING, description: 'Right margin token.' },
    marginBottom: { control: 'select', options: SPACING, description: 'Bottom margin token.' },
    marginLeft: { control: 'select', options: SPACING, description: 'Left margin token.' },
    width: { control: 'text', description: 'CSS width.' },
    alignSelf: { control: 'select', options: ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'], description: 'Flex alignment.' },
    disabled: { control: 'boolean', description: 'Disables the native button; not supported for links.' },
    active: { control: 'boolean', description: 'Enables active styling.' },
    onClick: { control: false, description: 'Native click handler. For anchors, supplying it prevents native navigation.' },
    className: { control: false, description: 'Additional class on the rendered element.' },
    style: { control: false, description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref to the button or anchor.' },
} satisfies NonNullable<Meta<ButtonProps>['argTypes']>
