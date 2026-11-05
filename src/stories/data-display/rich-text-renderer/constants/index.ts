import { type RichTextRendererProps } from '@components/data-display/rich-text-renderer'
import { RICH_TEXT_COLOR_PALETTES, type RichTextValue } from '@components/forms/rich-text-editor'
import type { Meta } from '@storybook/react-vite'

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
