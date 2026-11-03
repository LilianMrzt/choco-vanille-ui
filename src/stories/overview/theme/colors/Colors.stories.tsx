import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'
import type { CSSProperties } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { darkColors, lightColors, lightTheme, ThemeProvider } from '@theme'

import type { ColorGroup } from '@stories/overview/theme/colors/components'
import { ColorPaletteSection } from '@stories/overview/theme/colors/components/color-palette-section/ColorPaletteSection'
import { md } from '@stories/utils/markdown'

// Groupes de couleurs

const colorGroups: ReadonlyArray<ColorGroup> = [
    {
        label: 'Surfaces & Text',
        description: 'Main backgrounds, elevated surfaces, base text and scrim.',
        tokens: [
            'background',
            'text.primary',
            'text.secondary',
            'text.tertiary',
            'surface.main',
            'surface.foreground',
            'surface.elevated',
            'surface.elevatedForeground',
            'surface.muted',
            'surface.mutedForeground',
            'overlay',
        ],
    },
    {
        label: 'Primary',
        description:
      'Brand colour. Solid family + subtle family, all states included.',
        tokens: [
            'primary.main',
            'primary.hover',
            'primary.pressed',
            'primary.foreground',
            'primary.subtle',
            'primary.subtleHover',
            'primary.subtlePressed',
            'primary.subtleForeground',
            'primary.border',
            'primary.subtleBorder',
        ],
    },
    {
        label: 'Secondary',
        description: 'Complementary to primary. Same states as other families.',
        tokens: [
            'secondary.main',
            'secondary.hover',
            'secondary.pressed',
            'secondary.foreground',
            'secondary.subtle',
            'secondary.subtleHover',
            'secondary.subtlePressed',
            'secondary.subtleForeground',
            'secondary.border',
            'secondary.subtleBorder',
        ],
    },
    {
        label: 'Neutral',
        description: 'Low-emphasis neutral intent. Same states as other families.',
        tokens: [
            'neutral.main',
            'neutral.hover',
            'neutral.pressed',
            'neutral.foreground',
            'neutral.subtle',
            'neutral.subtleHover',
            'neutral.subtlePressed',
            'neutral.subtleForeground',
            'neutral.border',
            'neutral.subtleBorder',
        ],
    },
    {
        label: 'Success',
        description: 'Positive feedback, confirmations and validated states.',
        tokens: [
            'success.main',
            'success.hover',
            'success.pressed',
            'success.foreground',
            'success.subtle',
            'success.subtleHover',
            'success.subtlePressed',
            'success.subtleForeground',
            'success.border',
            'success.subtleBorder',
        ],
    },
    {
        label: 'Warning',
        description: 'Cautionary feedback, moderate-risk actions.',
        tokens: [
            'warning.main',
            'warning.hover',
            'warning.pressed',
            'warning.foreground',
            'warning.subtle',
            'warning.subtleHover',
            'warning.subtlePressed',
            'warning.subtleForeground',
            'warning.border',
            'warning.subtleBorder',
        ],
    },
    {
        label: 'Info',
        description: 'Informational messages and neutral status indicators.',
        tokens: [
            'info.main',
            'info.hover',
            'info.pressed',
            'info.foreground',
            'info.subtle',
            'info.subtleHover',
            'info.subtlePressed',
            'info.subtleForeground',
            'info.border',
            'info.subtleBorder',
        ],
    },
    {
        label: 'Danger',
        description: 'Irreversible actions, errors and deletions.',
        tokens: [
            'danger.main',
            'danger.hover',
            'danger.pressed',
            'danger.foreground',
            'danger.subtle',
            'danger.subtleHover',
            'danger.subtlePressed',
            'danger.subtleForeground',
            'danger.border',
            'danger.subtleBorder',
        ],
    },
    {
        label: 'Skeleton',
        description: 'Loading placeholder surfaces.',
        tokens: ['skeleton.base', 'skeleton.highlight'],
    },
    ...(['accentPurple', 'accentPink', 'accentOrange', 'accentTeal', 'accentCyan', 'accentIndigo'] as const).map((color) => ({
        label: `${color.slice('accent'.length)} accent`,
        description: 'Accent palette with solid and subtle interaction states.',
        tokens: [
            `${color}.main`,
            `${color}.hover`,
            `${color}.pressed`,
            `${color}.foreground`,
            `${color}.subtle`,
            `${color}.subtleHover`,
            `${color}.subtlePressed`,
            `${color}.subtleForeground`,
            `${color}.border`,
            `${color}.subtleBorder`,
        ] as const,
    })),
    {
        label: 'CSS keywords',
        description: 'Inherited color and transparent surfaces.',
        tokens: ['currentColor', 'transparent'],
    },
    {
        label: 'Links',
        description: 'Link text and interaction states.',
        tokens: ['link.main', 'link.hover', 'link.pressed'],
    },
    {
        label: 'Borders & Focus',
        description: 'Divider lines, field outlines and focus ring.',
        tokens: ['border.subtle', 'border.muted', 'border.main', 'border.strong', 'border.stronger', 'focusRing'],
    },
    {
        label: 'Highlight',
        description: 'Text highlight (mark element).',
        tokens: ['highlight.main', 'highlight.foreground'],
    },
]

// Meta

const meta = {
    title: 'Overview/Theme/Colors',
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
        docs: {
            canvas: { sourceState: 'hidden' },
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
Semantic color tokens form the color system of this UI kit. Each token carries intent rather than a raw hex value, making the palette fully adaptable to light and dark themes without changing component code.

Built-in palettes use in-gamut sRGB values: blue primary, violet secondary, sky information, emerald success, amber warning, and red danger. Dark themes use deeper neutral surfaces and lighter intent fills with dark foregrounds.

**Token families**
| Family | Purpose |
|---|---|
| Surfaces & Text | Backgrounds, elevated surfaces, base foreground text |
| Primary | Main brand color — CTAs, active states |
| Secondary | Complementary accent to primary |
| Neutral | Low-emphasis actions |
| Success | Positive feedback, confirmed states |
| Warning | Cautionary messages, moderate risk |
| Info | Neutral informational messages |
| Danger | Errors, deletions, irreversible actions |
| Borders & Focus | Dividers, field outlines, keyboard focus ring |
| Highlight | Text highlight via the \`<mark>\` element |
| Accents | Purple, pink, orange, teal, cyan, and indigo treatments |
| Skeleton | Loading placeholder surfaces |

Each intent exposes ten direct leaves: \`main\`, \`hover\`, \`pressed\`, \`foreground\`, \`subtle\`, \`subtleHover\`, \`subtlePressed\`, \`subtleForeground\`, \`border\`, and \`subtleBorder\`.
Built-in foregrounds meet 4.5:1 contrast on all three matching states. Field borders and focus rings meet 3:1 on the supported neutral surfaces. These guarantees do not cover custom overrides, disabled opacity, or arbitrary consumer backgrounds.
Use \`family.subtleForeground\` for ghost and outlined text, not the solid foreground. Gray borders are ordered from \`border.subtle\` to \`border.stronger\`; decorative levels do not guarantee 3:1. Isolated tokens such as \`focusRing\` stay strings.
Click any swatch to copy its current value.
                `,
            },
        },
    },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Styles de page

const pageLight: CSSProperties = {
    padding: lightTheme.space.lg,
    backgroundColor: lightColors.background,
    color: lightColors.text.primary,
    minHeight: '100vh',
    fontFamily: lightTheme.fontFamily.sans,
}

const pageDark: CSSProperties = {
    ...pageLight,
    backgroundColor: darkColors.background,
    color: darkColors.text.primary,
}

// Stories

export const LightTheme: Story = {
    name: 'Light theme',
    parameters: {
        docs: {
            description: {
                story:
          'All semantic color tokens resolved in the light theme. Click a swatch to copy its CSS custom property value.',
            },
        },
    },
    render: () => (
        <ThemeProvider
            scope={'subtree'}
            style={pageLight}
            theme={'light'}
        >
            <ColorPaletteSection
                title={'Light Theme'}
                subtitle={
                    'Semantic tokens of the light theme. Click a swatch to copy its value.'
                }
                colors={Object.fromEntries(getColorEntries(lightColors))}
                colorGroups={colorGroups}
                dark={false}
            />
        </ThemeProvider>
    ),
}

export const DarkTheme: Story = {
    name: 'Dark theme',
    parameters: {
        docs: {
            description: {
                story:
          'All semantic color tokens resolved in the dark theme. The same token names are used as in the light theme — only the underlying values change.',
            },
        },
    },
    render: () => (
        <ThemeProvider
            scope={'subtree'}
            style={pageDark}
            theme={'dark'}
        >
            <ColorPaletteSection
                title={'Dark Theme'}
                subtitle={
                    'Semantic tokens of the dark theme. Click a swatch to copy its value.'
                }
                colors={Object.fromEntries(getColorEntries(darkColors))}
                colorGroups={colorGroups}
                dark={true}
            />
        </ThemeProvider>
    ),
}