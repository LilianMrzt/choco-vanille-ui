import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import type { IconProps, IconSize } from '@components/foundation/icon'
import type { BoxBorderRadius, BoxSpace } from '@components/layout/box'
import type { Meta } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

export const SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
export const PADDINGS: (BoxSpace | undefined)[] = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128]
export const BORDER_RADIUSES: (BoxBorderRadius | undefined)[] = [undefined, 0, 4, 6, 8, 10, 14, 20, 'full']
export const BORDER_STYLES: (CSSProperties['borderStyle'] | undefined)[] = [
    undefined, 'none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset',
]

export const DEFAULT_ARGS = {
    icon: SearchIcon,
    size: 'md',
} satisfies NonNullable<Meta<IconProps>['args']>

export const ARG_TYPES = {
    icon: { control: false, description: 'Trusted local IconifyIcon data rendered with @iconify/react/offline.' },
    size: { control: 'select', options: SIZES, description: 'SVG size preset.', table: { defaultValue: { summary: 'md' } } },
    spin: { control: 'boolean', description: 'Continuously rotate the SVG.' },
    color: { control: 'color', description: 'CSS SVG color; inherits when omitted. SVG style.color takes precedence.' },
    padding: { control: 'select', options: PADDINGS, description: 'Wrapper padding token.' },
    borderColor: { control: 'color', description: 'CSS wrapper border color.' },
    backgroundColor: { control: 'color', description: 'CSS wrapper background color.' },
    borderWidth: { control: 'text', description: 'CSS wrapper border width.' },
    borderStyle: { control: 'select', options: BORDER_STYLES, description: 'CSS wrapper border style.' },
    borderRadius: { control: 'select', options: BORDER_RADIUSES, description: 'Wrapper radius token.' },
    'aria-label': { control: 'text', description: 'Names an informative icon; otherwise the SVG is decorative.' },
    'aria-labelledby': { control: 'text', description: 'References the accessible label of an informative icon.' },
    'aria-hidden': { control: 'boolean', description: 'Overrides automatic decorative hiding.' },
    role: { control: false, description: 'Native SVG role; defaults to presentation for decorative icons and img for named icons.' },
    id: { control: 'text', description: 'Nonempty SVG ID, unique after hyphens become underscores; generated when omitted.' },
    width: { control: 'text', description: 'Native SVG width; the size preset and inline style take precedence in CSS.' },
    height: { control: 'text', description: 'Native SVG height; the size preset and inline style take precedence in CSS.' },
    className: { control: 'text', description: 'Additional SVG class.' },
    style: { control: 'object', description: 'SVG style overrides.' },
    ref: { control: false, description: 'Ref forwarded to the SVG element.' },
} satisfies NonNullable<Meta<IconProps>['argTypes']>
