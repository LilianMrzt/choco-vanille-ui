import type { CSSProperties } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { darkColors } from '@theme/colors/dark.ts'
import { lightColors } from '@theme/colors/light.ts'

import type { ColorGroup } from '@stories/overview/theme/colors/components'
import { ColorPaletteSection } from '@stories/overview/theme/colors/components/color-palette-section/ColorPaletteSection'

// Groupes de couleurs

const colorGroups: ColorGroup[] = [
    {
        label: 'Surfaces & Text',
        description: 'Main backgrounds, elevated surfaces, base text and scrim.',
        tokens: [
            'background',
            'foreground',
            'card',
            'cardForeground',
            'popover',
            'popoverForeground',
            'muted',
            'mutedForeground',
            'overlay',
        ],
    },
    {
        label: 'Primary',
        description: 'Brand colour. Solid family + subtle family, all states included.',
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
        description: 'Low-emphasis neutral intent. Same states as other families.',
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
        label: 'Destructive',
        description: 'Irreversible actions, errors and deletions.',
        tokens: [
            'destructive',
            'destructiveHover',
            'destructiveActive',
            'destructiveForeground',
            'destructiveSubtle',
            'destructiveSubtleHover',
            'destructiveSubtleActive',
            'destructiveSubtleForeground',
            'destructiveSubtleBorder',
        ],
    },
    {
        label: 'Borders & Focus',
        description: 'Divider lines, field outlines and focus ring.',
        tokens: ['border', 'borderStrong', 'input', 'ring'],
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
                component: `
Semantic color tokens form the color system of this UI kit. Each token carries intent rather than a raw hex value, making the palette fully adaptable to light and dark themes without changing component code.

**Token families**
| Family | Purpose |
|---|---|
| Surfaces & Text | Backgrounds, elevated surfaces, base foreground text |
| Primary | Main brand color — CTAs, active states |
| Secondary | Neutral low-emphasis actions |
| Success | Positive feedback, confirmed states |
| Warning | Cautionary messages, moderate risk |
| Info | Neutral informational messages |
| Destructive | Errors, deletions, irreversible actions |
| Borders & Focus | Dividers, field outlines, keyboard focus ring |
| Highlight | Text highlight via the \`<mark>\` element |

Each family exposes a **solid** family (e.g. \`primary\`) and a **subtle** family (e.g. \`primarySubtle\`) with their own hover, active, foreground, and border tokens.
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
    padding: '40px 32px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

const pageDark: CSSProperties = {
    padding: '40px 32px',
    backgroundColor: '#0f1117',
    minHeight: '100vh',
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

// Stories

export const LightTheme: Story = {
    name: 'Light theme',
    parameters: {
        docs: {
            description: {
                story: 'All semantic color tokens resolved in the light theme. Click a swatch to copy its CSS custom property value.',
            },
        },
    },
    render: () => (
        <div style={pageLight}>
            <ColorPaletteSection
                title={'Light Theme'}
                subtitle={'Semantic tokens of the light theme. Click a swatch to copy its value.'}
                colors={lightColors as unknown as Record<string, string>}
                colorGroups={colorGroups}
                dark={false}
            />
        </div>
    ),
}

export const DarkTheme: Story = {
    name: 'Dark theme',
    parameters: {
        docs: {
            description: {
                story: 'All semantic color tokens resolved in the dark theme. The same token names are used as in the light theme — only the underlying values change.',
            },
        },
    },
    render: () => (
        <div style={pageDark}>
            <ColorPaletteSection
                title={'Dark Theme'}
                subtitle={'Semantic tokens of the dark theme. Click a swatch to copy its value.'}
                colors={darkColors as unknown as Record<string, string>}
                colorGroups={colorGroups}
                dark={true}
            />
        </div>
    ),
}
