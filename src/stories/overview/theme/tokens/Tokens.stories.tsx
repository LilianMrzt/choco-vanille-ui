import type { CSSProperties } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    MotionSection,
    RadiusSection,
    ShadowSection,
    SpacingSection,
    TypographySection,
    ZIndexSection,
} from '@stories/overview/theme/tokens/components'
import { md } from '@stories/utils/markdown'

//  Styles de page

const pageStyle: CSSProperties = {
    padding: '40px 32px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: 48,
}

//  Meta

const meta = {
    title: 'Overview/Theme/Tokens',
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
        docs: {
            canvas: { sourceState: 'hidden' },
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
Design tokens are the single source of truth for all visual decisions in this UI kit: spacing, border radii, font sizes, shadows, z-indices, and motion durations.

Each token maps to a CSS custom property and is consumed by component styles through the Vanilla Extract theme contract.
Prefer token values over hard-coded CSS — this ensures visual consistency and makes global theme changes trivial.
Spacing, radii, typography, stacking order, durations, and easing share the same values in light and dark themes. Box shadows and drop shadows are theme-dependent; their token names remain identical.
                `,
            },
        },
    },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>;

//  Story

export const AllTokens: Story = {
    name: 'All tokens',
    parameters: {
        docs: {
            description: {
                story:
          'A complete reference of every non-color design token: spacing scale, border-radius scale, font-size / font-weight / line-height scale, box-shadow levels, z-index layers, and motion (transition duration + easing) presets.',
            },
        },
    },
    render: () => (
        <div style={pageStyle}>
            <SpacingSection />
            <RadiusSection />
            <TypographySection />
            <ShadowSection />
            <ZIndexSection />
            <MotionSection />
        </div>
    ),
}