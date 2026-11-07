export const categories = [
    { key: 'space', title: 'Spacing', description: 'Padding, margins, and gaps. Rem values follow the root font size.' },
    { key: 'radius', title: 'Radius', description: 'Corner treatments, from square edges to fully rounded shapes.' },
    { key: 'fontFamily', title: 'Font families', description: 'Shared typefaces for interface text and code.' },
    { key: 'fontSize', title: 'Font sizes', description: 'A consistent hierarchy for labels, body text, and headings.' },
    { key: 'fontWeight', title: 'Font weights', description: 'Emphasis without changing the type scale.' },
    { key: 'shadow', title: 'Box shadows', description: 'Elevation treatments that adapt to the selected theme.' },
    { key: 'dropShadow', title: 'Drop shadows', description: 'Theme-aware filters that follow the shape of the content.' },
    { key: 'zIndex', title: 'Stacking order', description: 'Shared layers for floating elements and overlays.' },
    { key: 'duration', title: 'Durations', description: 'Hover or focus a preview to compare timing. Reduced motion is respected.' },
    { key: 'easing', title: 'Easing', description: 'Hover or focus a preview to compare motion curves.' },
] as const
export const DEFAULT_ARGS = { theme: 'light', category: 'all' } satisfies NonNullable<Meta<TokenReferenceArgs>['args']>
export const ARG_TYPES = {
    theme: {
        control: 'inline-radio',
        options: ['light', 'dark'],
        description: 'Preview theme. Shadows change between modes; other non-color scales are shared.',
        table: { category: 'Demonstration' },
    },
    category: {
        control: 'select',
        options: ['all', ...categories.map(({ key }) => key)],
        description: 'Show every scale or focus on a single token category.',
        table: { category: 'Demonstration' },
    },
} satisfies NonNullable<Meta<TokenReferenceArgs>['argTypes']>
import type { Meta } from '@storybook/react-vite'
import type { TokenReferenceArgs } from '@stories/docs/tokens/types'
