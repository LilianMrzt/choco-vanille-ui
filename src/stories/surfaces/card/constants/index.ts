import type { Meta } from '@storybook/react-vite'

import type { BoxVariant } from '@components/layout/box'
import type { CardStoryArgs } from '@stories/surfaces/card/types'

const ELEMENTS: BoxVariant[] = [
    'div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav',
    'ul', 'ol', 'li', 'form', 'fieldset', 'figure', 'figcaption', 'details',
    'summary', 'dialog', 'address', 'span',
]
const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128]
const FONT_SIZES = [undefined, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]

export const DEFAULT_ARGS = {
    as: 'div',
    borderRadius: 10,
    headerAs: 'div',
    title: 'Account settings',
    titleAs: 'h3',
    description: 'Manage your profile and preferences.',
    bodyAs: 'div',
    footerAs: 'div',
    showFooter: true,
    footerActionLabel: 'Save changes',
} satisfies NonNullable<Meta<CardStoryArgs>['args']>

export const ARG_TYPES = {
    as: { control: 'select', options: ELEMENTS, description: 'Semantic root element.', table: { defaultValue: { summary: 'div' } } },
    borderRadius: { control: 'select', options: [0, 4, 6, 8, 10, 14, 20, 'full'], description: 'Radius token.', table: { defaultValue: { summary: '6' } } },
    borderWidth: { control: 'text', description: 'CSS border width.', table: { defaultValue: { summary: '1px' } } },
    borderStyle: { control: 'select', options: ['solid', 'dashed', 'dotted', 'double'], description: 'CSS border style.', table: { defaultValue: { summary: 'solid' } } },
    borderColor: { control: 'text', description: 'CSS border color; defaults to the theme border.' },
    backgroundColor: { control: 'text', description: 'CSS background color; defaults to the theme surface.' },
    color: { control: 'text', description: 'CSS text color; defaults to the theme surface foreground.' },
    boxShadow: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], description: 'Shadow token.', table: { defaultValue: { summary: 'none' } } },
    overflow: { control: 'select', options: ['visible', 'hidden', 'clip', 'scroll', 'auto'], description: 'CSS overflow.', table: { defaultValue: { summary: 'hidden' } } },
    padding: { control: 'select', options: SPACING, description: 'Root padding token.' },
    className: { control: false, description: 'Additional root class.' },
    style: { control: false, description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref to the root element.' },
    children: { control: false, description: 'Card content; the playground uses composition controls.' },
    headerAs: { control: 'select', options: ['div', 'header'], description: 'Demonstration control for the header element.', table: { category: 'Compound: Header' } },
    title: { control: 'text', description: 'Demonstration control for the header title.', table: { category: 'Compound: Header' } },
    titleAs: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], description: 'Demonstration control for the heading level.', table: { category: 'Compound: Header' } },
    titleFontSize: { control: 'select', options: FONT_SIZES, description: 'Demonstration control for title typography.', table: { category: 'Compound: Header' } },
    titleFontWeight: { control: 'select', options: [undefined, 'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'], description: 'Demonstration control for title weight.', table: { category: 'Compound: Header' } },
    description: { control: 'text', description: 'Demonstration control for the header description.', table: { category: 'Compound: Header' } },
    descriptionFontSize: { control: 'select', options: FONT_SIZES, description: 'Demonstration control for description typography.', table: { category: 'Compound: Header' } },
    bodyAs: { control: 'select', options: ['div', 'section'], description: 'Demonstration control for the body element.', table: { category: 'Compound: Body' } },
    bodyPadding: { control: 'select', options: SPACING, description: 'Demonstration control for body padding.', table: { category: 'Compound: Body' } },
    footerAs: { control: 'select', options: ['div', 'footer'], description: 'Demonstration control for the footer element.', table: { category: 'Compound: Footer' } },
    showFooter: { control: 'boolean', description: 'Demonstration control for showing the footer.', table: { category: 'Compound: Footer' } },
    footerActionLabel: { control: 'text', description: 'Demonstration control for the primary action label.', table: { category: 'Compound: Footer' } },
} satisfies NonNullable<Meta<CardStoryArgs>['argTypes']>
