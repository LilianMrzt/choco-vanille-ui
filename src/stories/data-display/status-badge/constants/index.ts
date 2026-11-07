import { Avatar } from '@components/data-display/avatar'
import type { BadgeColor } from '@components/data-display/badge'
import {
    type StatusBadgePosition,
    type StatusBadgeProps,
    type StatusBadgeSize
} from '@components/data-display/status-badge'
import type { Meta } from '@storybook/react-vite'
import { createElement } from 'react'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

export const COLORS: BadgeColor[] = [
    'primary',
    'secondary',
    'neutral',
    'danger',
    'success',
    'warning',
    'info',
    'purple',
    'pink',
    'orange',
    'teal',
    'cyan',
    'indigo',
]

export const POSITIONS: StatusBadgePosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
]

export const SIZES: StatusBadgeSize[] = ['sm', 'md', 'lg']

export const DEFAULT_ARGS = {
    color: 'primary',
    position: 'top-right',
    size: 'md',
    number: 3,
    label: 'Notifications',
    children: createElement(Avatar, { initials: 'JD' }),
} satisfies NonNullable<Meta<StatusBadgeProps>['args']>

export const ARG_TYPES = {
    children: { control: false, description: 'A single element beneath the indicator; composed in JSX rather than edited in Controls.' },
    color: { control: 'select', options: COLORS, description: 'Semantic indicator color.', table: { defaultValue: { summary: 'primary' } } },
    position: { control: 'select', options: POSITIONS, description: 'Indicator corner.', table: { defaultValue: { summary: 'top-right' } } },
    size: { control: 'select', options: SIZES, description: 'Indicator size preset.', table: { defaultValue: { summary: 'md' } } },
    number: { control: 'number', description: 'Optional numeric content; zero is displayed and long values grow horizontally.' },
    label: { control: 'text', description: 'Accessible status name. Omitted numbered indicators use their numeric value; unnamed dots are decorative.' },
    display: { control: 'select', options: ['inline-block', 'block', 'inline-flex'], description: 'Inherited wrapper display.', table: { defaultValue: { summary: 'inline-block' } } },
    className: { control: false, description: 'Consumer class applied to the outer span.' },
    style: { control: 'object', description: 'CSS overrides for the wrapper; takes precedence over its layout props.' },
    ref: { control: false, description: 'Ref to the outer span; not editable in Controls.' },
    width: LAYOUT_ARG_TYPES.width,
    minWidth: LAYOUT_ARG_TYPES.minWidth,
    maxWidth: LAYOUT_ARG_TYPES.maxWidth,
    height: LAYOUT_ARG_TYPES.height,
    minHeight: LAYOUT_ARG_TYPES.minHeight,
    maxHeight: LAYOUT_ARG_TYPES.maxHeight,
    overflow: LAYOUT_ARG_TYPES.overflow,
    overflowX: LAYOUT_ARG_TYPES.overflowX,
    overflowY: LAYOUT_ARG_TYPES.overflowY,
    flex: LAYOUT_ARG_TYPES.flex,
    flexDirection: LAYOUT_ARG_TYPES.flexDirection,
    flexWrap: LAYOUT_ARG_TYPES.flexWrap,
    alignSelf: LAYOUT_ARG_TYPES.alignSelf,
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
    borderRadius: LAYOUT_ARG_TYPES.borderRadius,
    padding: LAYOUT_ARG_TYPES.padding,
    paddingX: LAYOUT_ARG_TYPES.paddingX,
    paddingY: LAYOUT_ARG_TYPES.paddingY,
    paddingTop: LAYOUT_ARG_TYPES.paddingTop,
    paddingRight: LAYOUT_ARG_TYPES.paddingRight,
    paddingBottom: LAYOUT_ARG_TYPES.paddingBottom,
    paddingLeft: LAYOUT_ARG_TYPES.paddingLeft,
    margin: LAYOUT_ARG_TYPES.margin,
    marginX: LAYOUT_ARG_TYPES.marginX,
    marginY: LAYOUT_ARG_TYPES.marginY,
    marginTop: LAYOUT_ARG_TYPES.marginTop,
    marginRight: LAYOUT_ARG_TYPES.marginRight,
    marginBottom: LAYOUT_ARG_TYPES.marginBottom,
    marginLeft: LAYOUT_ARG_TYPES.marginLeft,
    gap: LAYOUT_ARG_TYPES.gap,
    columnGap: LAYOUT_ARG_TYPES.columnGap,
    rowGap: LAYOUT_ARG_TYPES.rowGap,
    borderColor: LAYOUT_ARG_TYPES.borderColor,
    backgroundColor: LAYOUT_ARG_TYPES.backgroundColor,
    boxShadow: LAYOUT_ARG_TYPES.boxShadow
} satisfies NonNullable<Meta<StatusBadgeProps>['argTypes']>
