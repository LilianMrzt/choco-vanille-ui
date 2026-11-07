import type { Meta } from '@storybook/react-vite'
import type { CssVariableReferenceArgs, VariableSection } from '@stories/docs/css-variables/types'
import {
    buildThemeCSS,
    buildPlainCssScaffold,
    buildTailwindTheme,
    buildVanillaExtractSnippet,
    buildMuiThemeSnippet,
    colorRows,
    editorColorRows,
    shadowRows,
    dropShadowRows,
    spacingRows,
    radiusRows,
    fontFamilyRows,
    fontSizeRows,
    fontWeightRows,
    zIndexRows,
    durationRows,
    easingRows,
} from '@stories/docs/css-variables/utils/theme/theme.utils'

export const exports = [
    { label: 'Copy full theme CSS', build: buildThemeCSS },
    { label: 'Copy CSS override scaffold', build: buildPlainCssScaffold },
    { label: 'Copy typed token references', build: buildVanillaExtractSnippet },
    { label: 'Copy Tailwind scaffold', build: buildTailwindTheme },
    { label: 'Copy MUI bridge', build: buildMuiThemeSnippet },
]
export const sections: readonly VariableSection[] = [
    { key: 'color', title: 'Semantic colors', rows: colorRows, showSwatch: true },
    { key: 'editorColors', title: 'Editor colors', rows: editorColorRows, showSwatch: true },
    { key: 'shadow', title: 'Box shadows', rows: shadowRows },
    { key: 'dropShadow', title: 'Drop shadows', rows: dropShadowRows },
    { key: 'space', title: 'Spacing', rows: spacingRows },
    { key: 'radius', title: 'Radius', rows: radiusRows },
    { key: 'fontFamily', title: 'Font families', rows: fontFamilyRows },
    { key: 'fontSize', title: 'Font sizes', rows: fontSizeRows },
    { key: 'fontWeight', title: 'Font weights', rows: fontWeightRows },
    { key: 'zIndex', title: 'Stacking order', rows: zIndexRows },
    { key: 'duration', title: 'Durations', rows: durationRows },
    { key: 'easing', title: 'Easing', rows: easingRows },
]
export const DEFAULT_ARGS = { theme: 'light', category: 'all', search: '' } satisfies NonNullable<Meta<CssVariableReferenceArgs>['args']>
export const ARG_TYPES = {
    theme: {
        control: 'inline-radio',
        options: ['light', 'dark'],
        description: 'Reading surface only; both resolved values remain visible in themed tables.',
        table: { category: 'Demonstration' },
    },
    category: {
        control: 'select',
        options: ['all', ...sections.map(({ key }) => key)],
        description: 'Filter the reference by token category.',
        table: { category: 'Demonstration' },
    },
    search: {
        control: 'text',
        description: 'Case-insensitive filter on CSS variable names, such as primary or --space-12.',
        table: { category: 'Demonstration' },
    },
} satisfies NonNullable<Meta<CssVariableReferenceArgs>['argTypes']>
