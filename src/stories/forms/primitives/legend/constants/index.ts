import { type Meta } from '@storybook/react-vite'
import { Legend } from '@components/forms/primitives/legend'
import { ARG_TYPES as TYPOGRAPHY_ARG_TYPES } from '@stories/foundation/typography/constants'
import { md } from '@stories/_shared/utils/markdown'

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type              | Notes                                                    |
| ---------------- | -------- | ----------------- | -------------------------------------------------------- |
| \`children\`       | Yes      | ReactNode         | Provide meaningful text to name the fieldset.            |
| \`variant\`        | No       | TypographyVariant | Changes presentation only; the element remains a legend. |

Place the Legend as the first child of its Fieldset. Label the individual controls separately.
`

export const ARG_TYPES = {
    variant: {
        ...TYPOGRAPHY_ARG_TYPES.variant,
        description:
            'Typography style only; Legend always renders a legend element. Defaults to label.',
        table: { defaultValue: { summary: 'label' } },
    },
    fontWeight: TYPOGRAPHY_ARG_TYPES.fontWeight,
    color: TYPOGRAPHY_ARG_TYPES.color,
    margin: TYPOGRAPHY_ARG_TYPES.margin,
    ellipsis: TYPOGRAPHY_ARG_TYPES.ellipsis,
    maxLines: TYPOGRAPHY_ARG_TYPES.maxLines,
    textTransform: TYPOGRAPHY_ARG_TYPES.textTransform,
    display: TYPOGRAPHY_ARG_TYPES.display,
    width: TYPOGRAPHY_ARG_TYPES.width,
    minWidth: TYPOGRAPHY_ARG_TYPES.minWidth,
    maxWidth: TYPOGRAPHY_ARG_TYPES.maxWidth,
    opacity: TYPOGRAPHY_ARG_TYPES.opacity,
    flex: TYPOGRAPHY_ARG_TYPES.flex,
    flexGrow: TYPOGRAPHY_ARG_TYPES.flexGrow,
    flexShrink: TYPOGRAPHY_ARG_TYPES.flexShrink,
    letterSpacing: TYPOGRAPHY_ARG_TYPES.letterSpacing,
    children: { control: 'text', description: 'Text naming the fieldset.' },
    id: { control: 'text', description: 'Native legend ID.' },
    title: { control: 'text', description: 'Native legend title.' },
    className: TYPOGRAPHY_ARG_TYPES.className,
    style: TYPOGRAPHY_ARG_TYPES.style,
    ref: {
        control: false,
        description: 'Ref forwarded to the native legend element.',
    },
} satisfies NonNullable<Meta<typeof Legend>['argTypes']>

export const DEFAULT_ARGS = {
    children: 'Notification preferences',
} satisfies NonNullable<Meta<typeof Legend>['args']>
export const DESCRIPTION =
    'Names a fieldset using a native legend. Typography props customize its presentation without changing its semantics.'
