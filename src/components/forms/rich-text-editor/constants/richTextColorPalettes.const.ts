import { vars } from '@theme/contract.css.ts'

export const RICH_TEXT_COLOR_PALETTES = [
    {
        name: 'Ocean',
        colors: [vars.editorColors.ocean.dark, vars.editorColors.ocean.base, vars.editorColors.ocean.light],
    },
    {
        name: 'Forest',
        colors: [vars.editorColors.forest.dark, vars.editorColors.forest.base, vars.editorColors.forest.light],
    },
    {
        name: 'Sunset',
        colors: [vars.editorColors.sunset.dark, vars.editorColors.sunset.base, vars.editorColors.sunset.light],
    },
    {
        name: 'Berry',
        colors: [vars.editorColors.berry.dark, vars.editorColors.berry.base, vars.editorColors.berry.light],
    },
    {
        name: 'Grape',
        colors: [vars.editorColors.grape.dark, vars.editorColors.grape.base, vars.editorColors.grape.light],
    },
    {
        name: 'Aqua',
        colors: [vars.editorColors.aqua.dark, vars.editorColors.aqua.base, vars.editorColors.aqua.light],
    },
    {
        name: 'Black',
        colors: [vars.editorColors.neutral.dark, vars.editorColors.neutral.base, vars.editorColors.neutral.light],
    },
] as const
