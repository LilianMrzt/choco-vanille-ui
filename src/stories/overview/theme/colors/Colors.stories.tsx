import type { CSSProperties } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { darkColors } from '@theme/colors/dark.ts'
import { lightColors } from '@theme/colors/light.ts'

import type { ColorGroup } from '@stories/overview/theme/colors/components'
import { ColorPaletteSection } from '@stories/overview/theme/colors/components/color-palette-section/ColorPaletteSection'

// Groupes de couleurs

const colorGroups: ColorGroup[] = [
    {
        label: 'Surfaces & Texte',
        description: 'Arrière-plans principaux, surfaces élevées, texte de base et scrim.',
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
        description: 'Couleur de marque. Famille solide + famille subtile, états inclus.',
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
        description: 'Intent neutre de faible emphase. Mêmes états que les autres familles.',
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
        label: 'Succès',
        description: 'Feedback positif, confirmations et états validés.',
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
        label: 'Avertissement',
        description: 'Feedback de mise en garde, actions à risque modéré.',
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
        label: 'Information',
        description: 'Messages informatifs et indicateurs de statut neutre.',
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
        label: 'Destructif',
        description: 'Actions irréversibles, erreurs et suppressions.',
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
        label: 'Bordures & Focus',
        description: 'Lignes de séparation, contours de champs et anneau de focus.',
        tokens: ['border', 'borderStrong', 'input', 'ring'],
    },
    {
        label: 'Highlight',
        description: 'Mise en évidence de texte (balise <mark>).',
        tokens: ['highlight', 'highlightForeground'],
    },
]

// Meta

const meta = {
    title: 'Overview/Theme/Colors',
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
        docs: { canvas: { sourceState: 'hidden' } },
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
    render: () => (
        <div style={pageLight}>
            <ColorPaletteSection
                title={'Thème Clair'}
                subtitle={'Tokens sémantiques du thème clair. Cliquez sur un swatch pour copier la valeur.'}
                colors={lightColors as unknown as Record<string, string>}
                colorGroups={colorGroups}
                dark={false}
            />
        </div>
    ),
}

export const DarkTheme: Story = {
    name: 'Dark theme',
    render: () => (
        <div style={pageDark}>
            <ColorPaletteSection
                title={'Thème Sombre'}
                subtitle={'Tokens sémantiques du thème sombre. Cliquez sur un swatch pour copier la valeur.'}
                colors={darkColors as unknown as Record<string, string>}
                colorGroups={colorGroups}
                dark={true}
            />
        </div>
    ),
}
