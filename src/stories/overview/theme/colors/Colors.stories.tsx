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
            'foreground',
            'foregroundMuted',
            'foregroundSubtle',
            'surface',
            'surfaceForeground',
            'surfaceElevated',
            'surfaceElevatedForeground',
            'surfaceMuted',
            'surfaceMutedForeground',
            'overlay',
        ],
    },
    {
        label: 'Primary',
        description:
      'Brand colour. Solid family + subtle family, all states included.',
        tokens: [
            'primary',
            'primaryHover',
            'primaryActive',
            'primaryForeground',
            'primarySubtle',
            'primarySubtleHover',
            'primarySubtleActive',
            'primarySubtleForeground',
            'primarySubtleBorder',
        ],
    },
    {
        label: 'Secondary',
        description: 'Complementary to primary. Same states as other families.',
        tokens: [
            'secondary',
            'secondaryHover',
            'secondaryActive',
            'secondaryForeground',
            'secondarySubtle',
            'secondarySubtleHover',
            'secondarySubtleActive',
            'secondarySubtleForeground',
            'secondarySubtleBorder',
        ],
    },
    {
        label: 'Neutral',
        description: 'Low-emphasis neutral intent. Same states as other families.',
        tokens: [
            'neutral',
            'neutralHover',
            'neutralActive',
            'neutralForeground',
            'neutralSubtle',
            'neutralSubtleHover',
            'neutralSubtleActive',
            'neutralSubtleForeground',
            'neutralSubtleBorder',
        ],
    },
    {
        label: 'Success',
        description: 'Positive feedback, confirmations and validated states.',
        tokens: [
            'success',
            'successHover',
            'successActive',
            'successForeground',
            'successSubtle',
            'successSubtleHover',
            'successSubtleActive',
            'successSubtleForeground',
            'successSubtleBorder',
        ],
    },
    {
        label: 'Warning',
        description: 'Cautionary feedback, moderate-risk actions.',
        tokens: [
            'warning',
            'warningHover',
            'warningActive',
            'warningForeground',
            'warningSubtle',
            'warningSubtleHover',
            'warningSubtleActive',
            'warningSubtleForeground',
            'warningSubtleBorder',
        ],
    },
    {
        label: 'Info',
        description: 'Informational messages and neutral status indicators.',
        tokens: [
            'info',
            'infoHover',
            'infoActive',
            'infoForeground',
            'infoSubtle',
            'infoSubtleHover',
            'infoSubtleActive',
            'infoSubtleForeground',
            'infoSubtleBorder',
        ],
    },
    {
        label: 'Danger',
        description: 'Irreversible actions, errors and deletions.',
        tokens: [
            'danger',
            'dangerHover',
            'dangerActive',
            'dangerForeground',
            'dangerSubtle',
            'dangerSubtleHover',
            'dangerSubtleActive',
            'dangerSubtleForeground',
            'dangerSubtleBorder',
        ],
    },
    {
        label: 'Skeleton',
        description: 'Loading placeholder surfaces.',
        tokens: ['skeletonBase', 'skeletonHighlight'],
    },
    ...(['accentPurple', 'accentPink', 'accentOrange', 'accentTeal', 'accentCyan', 'accentIndigo'] as const).map((color) => ({
        label: `${color.slice('accent'.length)} accent`,
        description: 'Accent palette with solid and subtle interaction states.',
        tokens: [
            color,
            `${color}Hover`,
            `${color}Active`,
            `${color}Foreground`,
            `${color}Subtle`,
            `${color}SubtleHover`,
            `${color}SubtleActive`,
            `${color}SubtleForeground`,
            `${color}SubtleBorder`,
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
        tokens: ['link', 'linkHover', 'linkActive'],
    },
    {
        label: 'Borders & Focus',
        description: 'Divider lines, field outlines and focus ring.',
        tokens: ['border', 'borderStrong', 'focusRing'],
    },
    {
        label: 'Highlight',
        description: 'Text highlight (mark element).',
        tokens: ['highlight', 'highlightForeground'],
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

Each intent exposes **solid** fill, hover, active, and foreground tokens, plus **subtle** surface, hover, active, foreground, and border tokens.
Built-in foregrounds meet 4.5:1 contrast on all three matching states. Field borders and focus rings meet 3:1 on the supported neutral surfaces. These guarantees do not cover custom overrides, disabled opacity, or arbitrary consumer backgrounds.
Use \`*SubtleForeground\` for ghost and outlined text, not the solid foreground. Use \`danger\`, \`neutral\`, \`accentPurple\` (and other \`accent*\` families), and \`focusRing\` for theme tokens.
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
    color: lightColors.foreground,
    minHeight: '100vh',
    fontFamily: lightTheme.fontFamily.sans,
}

const pageDark: CSSProperties = {
    ...pageLight,
    backgroundColor: darkColors.background,
    color: darkColors.foreground,
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
                colors={lightColors}
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
                colors={darkColors}
                colorGroups={colorGroups}
                dark={true}
            />
        </ThemeProvider>
    ),
}