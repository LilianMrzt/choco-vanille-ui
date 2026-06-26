import type { CSSProperties } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { darkColors } from '@theme/colors/dark.ts'
import { lightColors } from '@theme/colors/light.ts'

import type { ColorGroup, ColorPaletteSection } from '@stories/overview/theme/colors/components'

// Groupes de couleurs

const colorGroups: ColorGroup[] = [
    {
        label: 'Surfaces & Texte',
        description: 'Arrière-plans principaux et couleurs de texte de base.',
        tokens: ['background', 'foreground', 'card', 'cardForeground', 'popover', 'popoverForeground'],
    },
    {
        label: 'Primary',
        description: 'Couleur de marque principale, états interactifs inclus.',
        tokens: ['primary', 'primaryForeground', 'primaryHover', 'primaryActive', 'primarySubtle', 'primarySubtleForeground'],
    },
    {
        label: 'Secondary',
        description: 'Remplissage neutre de faible emphase.',
        tokens: ['secondary', 'secondaryForeground', 'secondaryHover', 'secondaryActive'],
    },
    {
        label: 'Muted',
        description: 'Arrière-plans discrets et texte secondaire.',
        tokens: ['muted', 'mutedForeground'],
    },
    {
        label: 'Accent',
        description: 'Lavage sur les contrôles ghost / outline au survol.',
        tokens: ['accent', 'accentForeground'],
    },
    {
        label: 'Succès',
        description: 'Feedback positif, confirmations et états validés.',
        tokens: ['success', 'successForeground', 'successSubtle', 'successSubtleForeground'],
    },
    {
        label: 'Avertissement',
        description: 'Feedback de mise en garde, actions à risque modéré.',
        tokens: ['warning', 'warningForeground', 'warningSubtle', 'warningSubtleForeground'],
    },
    {
        label: 'Information',
        description: 'Messages informatifs et indicateurs de statut neutre.',
        tokens: ['info', 'infoForeground', 'infoSubtle', 'infoSubtleForeground'],
    },
    {
        label: 'Destructif',
        description: 'Actions irréversibles, erreurs et suppressions.',
        tokens: [
            'destructive',
            'destructiveForeground',
            'destructiveHover',
            'destructiveActive',
            'destructiveSubtle',
            'destructiveSubtleForeground',
        ],
    },
    {
        label: 'Bordures & Focus',
        description: 'Lignes de séparation, contours de champs et anneau de focus.',
        tokens: ['border', 'input', 'ring'],
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
