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

//  Styles de page

const pageStyle: CSSProperties = {
    padding: '40px 32px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
        docs: { canvas: { sourceState: 'hidden' } },
    },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

//  Story

export const AllTokens: Story = {
    name: 'All tokens',
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
