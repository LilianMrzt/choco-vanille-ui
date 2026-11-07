import type { Meta } from '@storybook/react-vite'
import { IconButton } from '@/components/actions/icon-button'
import type {
    IconButtonColor,
    IconButtonSize,
    IconButtonVariant,
} from '@components/actions/icon-button'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type      | Notes                                                                                      |
| ---------------- | -------- | --------- | ------------------------------------------------------------------------------------------ |
| \`aria-label\`     | ✅ Yes   | \`string\`  | Sole accessible name — must describe the action (e.g. \`"Delete item"\`), not the icon name. |
| \`disabled\`       | No       | \`boolean\` | Keeps the button visible and announced by screen readers.                                  |
| \`aria-*\`         | No       | —         | All native \`<button>\` ARIA attributes are forwarded to the underlying element.             |

- The component renders a native \`<button>\`, so it is keyboard-operable (Space / Enter) and has the correct ARIA role by default.
- When combining an \`IconButton\` with a \`Tooltip\`, the tooltip content should match the \`aria-label\` so sighted and non-sighted users receive the same information.

## Sizes

| Size | Width and height | Icon |
| --- | --- | --- |
| \`xs\` | 24px | 12px |
| \`sm\` | 28px | 14px |
| \`md\` (default) | 36px | 16px |
| \`lg\` | 44px | 20px |

Values use rem units and are shown at a 16px root font size. Sizes do not change
with viewport or pointer type. Prefer lg for touch-oriented actions.
`
export const ALIGN_SELF = [
    undefined,
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
] as const
export const WIDTHS = [undefined, '100%', 'fit-content'] as const
export const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128, 'auto'] as const
export const SIZES: IconButtonSize[] = ['xs', 'sm', 'md', 'lg']
export const COLORS: IconButtonColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
export const VARIANTS: IconButtonVariant[] = ['contained', 'outlined', 'ghost']
export const ARG_TYPES = {
    icon: { control: false, description: 'Consumer-owned SVG component; this example uses SearchIcon.' },
    'aria-label': { control: 'text' },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES, description: 'Square size at a 16px root: xs 24px, sm 28px, md 36px (default), lg 44px.' },
    margin: { control: 'select', options: SPACING },
    marginTop: { control: 'select', options: SPACING },
    marginRight: { control: 'select', options: SPACING },
    marginBottom: { control: 'select', options: SPACING },
    marginLeft: { control: 'select', options: SPACING },
    width: { control: 'select', options: WIDTHS },
    alignSelf: { control: 'select', options: ALIGN_SELF },
    disabled: { control: 'boolean' },
    active: { control: 'boolean' },
    children: { control: false, description: 'Content is generated from icon; supply a visible label through Button instead.' },
    onClick: { control: false, description: 'Native click callback, observable in Actions.' },
    className: { control: 'text', description: 'Additional button class.' },
    style: { control: 'object', description: 'Inline CSS overrides.' },
    ref: LAYOUT_ARG_TYPES.ref,
} satisfies NonNullable<Meta<typeof IconButton>['argTypes']>
export const DEFAULT_ARGS = {
    icon: SearchIcon,
    'aria-label': 'Edit item',
} satisfies NonNullable<Meta<typeof IconButton>['args']>
