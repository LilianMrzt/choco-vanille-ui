import { type RichTextRendererProps } from '@components/data-display/rich-text-renderer'
import { RICH_TEXT_COLOR_PALETTES, type RichTextValue } from '@components/forms/rich-text-editor'
import type { Meta } from '@storybook/react-vite'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

export const VALUE: RichTextValue = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Rendered content' }] },
        {
            type: 'paragraph',
            content: [
                { type: 'text', text: 'This document contains ' },
                { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
                { type: 'text', text: ', italic', marks: [{ type: 'italic' }] },
                { type: 'text', text: ', and underlined', marks: [{ type: 'underline' }] },
                { type: 'text', text: ' text.' },
            ],
        },
        {
            type: 'bulletList',
            content: [
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'First item' }] }] },
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Second item' }] }] },
            ],
        },
    ],
}

export const DEFAULT_ARGS = { value: VALUE } satisfies NonNullable<Meta<RichTextRendererProps>['args']>

export const ARG_TYPES = {
    value: { control: 'object', description: 'Structured RichTextEditor document. Editing JSON replaces the rendered document.' },
    as: { control: 'select', options: ['div', 'article', 'section'], description: 'Inherited container element override. The control demonstrates common document containers.', table: { defaultValue: { summary: 'div' } } },
    width: { control: 'text', description: 'Inherited CSS width for the document container.' },
    color: { control: 'color', description: 'Inherited CSS text color; document marks may specify their own colors.' },
    className: { control: false, description: 'Consumer class for the outer div.' },
    style: { control: 'object', description: 'CSS overrides for the document container.' },
    ref: { control: false, description: 'Ref to the document container; not editable in Controls.' },
    height: LAYOUT_ARG_TYPES.height,
    minWidth: LAYOUT_ARG_TYPES.minWidth,
    maxWidth: LAYOUT_ARG_TYPES.maxWidth,
    minHeight: LAYOUT_ARG_TYPES.minHeight,
    maxHeight: LAYOUT_ARG_TYPES.maxHeight,
    borderRadius: LAYOUT_ARG_TYPES.borderRadius,
    padding: LAYOUT_ARG_TYPES.padding,
    margin: LAYOUT_ARG_TYPES.margin,
    backgroundColor: LAYOUT_ARG_TYPES.backgroundColor,
    display: LAYOUT_ARG_TYPES.display,
    overflow: LAYOUT_ARG_TYPES.overflow,
    overflowX: LAYOUT_ARG_TYPES.overflowX,
    overflowY: LAYOUT_ARG_TYPES.overflowY,
    position: LAYOUT_ARG_TYPES.position,
    flex: LAYOUT_ARG_TYPES.flex,
    flexDirection: LAYOUT_ARG_TYPES.flexDirection,
    flexWrap: LAYOUT_ARG_TYPES.flexWrap,
    alignSelf: LAYOUT_ARG_TYPES.alignSelf,
    alignItems: LAYOUT_ARG_TYPES.alignItems,
    alignContent: LAYOUT_ARG_TYPES.alignContent,
    justifyContent: LAYOUT_ARG_TYPES.justifyContent,
    textAlign: LAYOUT_ARG_TYPES.textAlign,
    borderWidth: LAYOUT_ARG_TYPES.borderWidth,
    borderTopWidth: LAYOUT_ARG_TYPES.borderTopWidth,
    borderRightWidth: LAYOUT_ARG_TYPES.borderRightWidth,
    borderBottomWidth: LAYOUT_ARG_TYPES.borderBottomWidth,
    borderLeftWidth: LAYOUT_ARG_TYPES.borderLeftWidth,
    borderStyle: LAYOUT_ARG_TYPES.borderStyle,
    paddingX: LAYOUT_ARG_TYPES.paddingX,
    paddingY: LAYOUT_ARG_TYPES.paddingY,
    paddingTop: LAYOUT_ARG_TYPES.paddingTop,
    paddingRight: LAYOUT_ARG_TYPES.paddingRight,
    paddingBottom: LAYOUT_ARG_TYPES.paddingBottom,
    paddingLeft: LAYOUT_ARG_TYPES.paddingLeft,
    marginX: LAYOUT_ARG_TYPES.marginX,
    marginY: LAYOUT_ARG_TYPES.marginY,
    marginTop: LAYOUT_ARG_TYPES.marginTop,
    marginRight: LAYOUT_ARG_TYPES.marginRight,
    marginBottom: LAYOUT_ARG_TYPES.marginBottom,
    marginLeft: LAYOUT_ARG_TYPES.marginLeft,
    gap: LAYOUT_ARG_TYPES.gap,
    columnGap: LAYOUT_ARG_TYPES.columnGap,
    rowGap: LAYOUT_ARG_TYPES.rowGap,
    borderColor: LAYOUT_ARG_TYPES.borderColor,
    boxShadow: LAYOUT_ARG_TYPES.boxShadow
} satisfies NonNullable<Meta<RichTextRendererProps>['argTypes']>

export const LINKS_VALUE: RichTextValue = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'Documentation',
                    marks: [{ type: 'link', attrs: { href: 'https://example.com' } }],
                },
                {
                    type: 'text',
                    text: ' | Contact',
                    marks: [
                        { type: 'link', attrs: { href: 'mailto:hello@example.com' } },
                    ],
                },
                {
                    type: 'text',
                    text: ' | Call us',
                    marks: [{ type: 'link', attrs: { href: 'tel:+33123456789' } }],
                },
                {
                    type: 'text',
                    text: ' | Internal page',
                    marks: [{ type: 'link', attrs: { href: '/getting-started' } }],
                },
            ],
        },
    ],
}

export const COLORS_VALUE: RichTextValue = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'Ocean dark',
                    marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[0].colors[0] } }],
                },
                {
                    type: 'text',
                    text: ' Ocean medium',
                    marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[0].colors[1] } }],
                },
                {
                    type: 'text',
                    text: ' Ocean light',
                    marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[0].colors[2] } }],
                },
                {
                    type: 'text',
                    text: ' Black dark',
                    marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[6].colors[0] } }],
                },
                {
                    type: 'text',
                    text: ' Black medium',
                    marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[6].colors[1] } }],
                },
                {
                    type: 'text',
                    text: ' Black light',
                    marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[6].colors[2] } }],
                },
            ],
        },
    ],
}
