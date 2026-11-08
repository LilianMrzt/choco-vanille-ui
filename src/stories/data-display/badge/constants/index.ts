import { CHECK_ICON as CheckIcon, CHEVRON_RIGHT_ICON as ChevronRightIcon } from '@constants/icon-registry'
import { type BadgeColor, type BadgeProps, type BadgeSize, type BadgeVariant } from '@components/data-display/badge'
import type { Meta } from '@storybook/react-vite'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

export const VARIANTS: BadgeVariant[] = ['contained', 'subtle', 'outlined', 'outlinedSubtle']

export const COLORS: BadgeColor[] = [
    'primary', 'secondary', 'neutral', 'danger', 'success', 'warning', 'info',
    'purple', 'pink', 'orange', 'teal', 'cyan', 'indigo',
]

export const SIZES: BadgeSize[] = ['sm', 'md', 'lg']
export const DEFAULT_ARGS = {
    label: 'Badge',
    variant: 'outlinedSubtle',
    color: 'primary',
    size: 'md',
    borderRadius: 4,
} satisfies NonNullable<Meta<BadgeProps>['args']>

export const ARG_TYPES = {
    label: { control: 'text', description: 'Visible text. Required; icons do not replace it.' },
    variant: { control: 'select', options: VARIANTS, description: 'Visual treatment.', table: { defaultValue: { summary: 'outlinedSubtle' } } },
    color: { control: 'select', options: COLORS, description: 'Semantic color intent.', table: { defaultValue: { summary: 'primary' } } },
    size: { control: 'select', options: SIZES, description: 'Label and icon size preset.', table: { defaultValue: { summary: 'md' } } },
    borderRadius: { control: 'select', options: [0, 4, 6, 8, 10, 14, 20, 'full'], description: 'Inherited radius token.', table: { defaultValue: { summary: '4' } } },
    width: { control: 'text', description: 'Inherited CSS width; omitted by default.' },
    startIcon: { control: 'select', options: ['None', 'Check'], mapping: { None: undefined, Check: CheckIcon }, description: 'Decorative leading local Iconify data; the control maps a demonstration icon.' },
    endIcon: { control: 'select', options: ['None', 'Chevron'], mapping: { None: undefined, Chevron: ChevronRightIcon }, description: 'Decorative trailing local Iconify data; the control maps a demonstration icon.' },
    className: { control: false, description: 'Consumer class merged with the badge classes.' },
    style: { control: 'object', description: 'Consumer CSS overrides; takes precedence over layout props and recipe colors.' },
    ref: { control: false, description: 'Ref to the outer span; not editable in Controls.' },
    margin: LAYOUT_ARG_TYPES.margin,
    marginTop: LAYOUT_ARG_TYPES.marginTop,
    marginRight: LAYOUT_ARG_TYPES.marginRight,
    marginBottom: LAYOUT_ARG_TYPES.marginBottom,
    marginLeft: LAYOUT_ARG_TYPES.marginLeft,
    alignSelf: LAYOUT_ARG_TYPES.alignSelf,
    display: LAYOUT_ARG_TYPES.display,
    minWidth: LAYOUT_ARG_TYPES.minWidth,
    maxWidth: LAYOUT_ARG_TYPES.maxWidth,
    height: LAYOUT_ARG_TYPES.height,
    minHeight: LAYOUT_ARG_TYPES.minHeight,
    maxHeight: LAYOUT_ARG_TYPES.maxHeight,
    overflow: LAYOUT_ARG_TYPES.overflow,
    overflowX: LAYOUT_ARG_TYPES.overflowX,
    overflowY: LAYOUT_ARG_TYPES.overflowY,
    position: LAYOUT_ARG_TYPES.position,
    flex: LAYOUT_ARG_TYPES.flex,
    flexDirection: LAYOUT_ARG_TYPES.flexDirection,
    flexWrap: LAYOUT_ARG_TYPES.flexWrap,
    alignItems: LAYOUT_ARG_TYPES.alignItems,
    alignContent: LAYOUT_ARG_TYPES.alignContent,
    justifyContent: LAYOUT_ARG_TYPES.justifyContent,
    textAlign: LAYOUT_ARG_TYPES.textAlign,
    borderWidth: LAYOUT_ARG_TYPES.borderWidth,
    borderTopWidth: LAYOUT_ARG_TYPES.borderTopWidth,
    borderRightWidth: LAYOUT_ARG_TYPES.borderRightWidth,
    borderBottomWidth: LAYOUT_ARG_TYPES.borderBottomWidth,
    borderLeftWidth: LAYOUT_ARG_TYPES.borderLeftWidth,
    borderStyle: LAYOUT_ARG_TYPES.borderStyle,
    padding: LAYOUT_ARG_TYPES.padding,
    paddingX: LAYOUT_ARG_TYPES.paddingX,
    paddingY: LAYOUT_ARG_TYPES.paddingY,
    paddingTop: LAYOUT_ARG_TYPES.paddingTop,
    paddingRight: LAYOUT_ARG_TYPES.paddingRight,
    paddingBottom: LAYOUT_ARG_TYPES.paddingBottom,
    paddingLeft: LAYOUT_ARG_TYPES.paddingLeft,
    marginX: LAYOUT_ARG_TYPES.marginX,
    marginY: LAYOUT_ARG_TYPES.marginY,
    gap: LAYOUT_ARG_TYPES.gap,
    columnGap: LAYOUT_ARG_TYPES.columnGap,
    rowGap: LAYOUT_ARG_TYPES.rowGap,
    borderColor: LAYOUT_ARG_TYPES.borderColor,
    backgroundColor: LAYOUT_ARG_TYPES.backgroundColor,
    boxShadow: LAYOUT_ARG_TYPES.boxShadow
} satisfies NonNullable<Meta<BadgeProps>['argTypes']>
