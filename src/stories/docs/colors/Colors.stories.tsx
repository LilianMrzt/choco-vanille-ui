import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { darkColors, lightColors, ThemeProvider } from '@theme'

import type { ColorGroup } from '@stories/docs/colors/components'
import ColorPaletteSection from '@stories/docs/colors/components/color-palette-section/ColorPaletteSection'

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
    title: 'Docs/Colors',
    tags: ['!autodocs'],
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
    },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Stories

export const LightTheme = {
    name: 'Light theme',
    parameters: {
        docs: {
            description: {
                story:
          'All semantic colors in light mode. Activate a swatch to copy its typed vars.color reference.',
            },
        },
    },
    render: () => (
        <ThemeProvider
            scope={'subtree'}
            theme={'light'}
        >
            <ColorPaletteSection
                title={'Light Theme'}
                subtitle={
                    'Semantic colors for light surfaces. Activate a swatch to copy its vars.color reference, not its raw value.'
                }
                colors={Object.fromEntries(getColorEntries(lightColors))}
                colorGroups={colorGroups}
            />
        </ThemeProvider>
    ),
} satisfies Story

export const DarkTheme = {
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
            theme={'dark'}
        >
            <ColorPaletteSection
                title={'Dark Theme'}
                subtitle={
                    'The same semantic names, adapted to dark surfaces. Activate a swatch to copy its vars.color reference.'
                }
                colors={Object.fromEntries(getColorEntries(darkColors))}
                colorGroups={colorGroups}
            />
        </ThemeProvider>
    ),
} satisfies Story