import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box, type BoxVariant } from '@components/layout/box'

const BOX_VARIANTS: BoxVariant[] = [
    'div', 'section', 'article', 'aside', 'main',
    'header', 'footer', 'nav', 'ul', 'ol', 'li',
    'form', 'fieldset', 'figure', 'figcaption',
    'details', 'summary', 'dialog', 'address', 'span',
]

const meta = {
    title: 'Layout/Box',
    component: Box,
    parameters: { layout: 'padded' },
    argTypes: {
        as: { control: 'select', options: BOX_VARIANTS },
        display: { control: 'select', options: ['block', 'flex', 'inline-flex', 'inline', 'inline-block', 'grid', 'inline-grid', 'none', 'contents', 'flow-root'] },
        p: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        px: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        py: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        m: { control: 'select', options: [undefined, 'auto', 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        gap: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        rounded: { control: 'select', options: [undefined, 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
        bg: { control: 'select', options: [undefined, 'transparent', 'background', 'card', 'muted', 'primary', 'primarySubtle', 'secondary', 'secondarySubtle'] },
        w: { control: 'select', options: [undefined, 'full', 'screen', 'fit', 'min', 'max', 'auto'] },
        h: { control: 'select', options: [undefined, 'full', 'screen', 'fit', 'min', 'max', 'auto'] },
        overflow: { control: 'select', options: [undefined, 'visible', 'hidden', 'auto', 'scroll', 'clip'] },
        position: { control: 'select', options: [undefined, 'static', 'relative', 'absolute', 'fixed', 'sticky'] },
    },
    args: {
        children: 'Box content',
        as: 'div',
        p: 'lg',
        bg: 'muted',
        rounded: 'md',
    },
} satisfies Meta<typeof Box>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AsSemantic: Story = {
    name: 'Semantic HTML elements',
    parameters: { controls: { disable: true } },
    render: () => (
        <Box
            display={'flex'}
            gap={'md'}
            p={'lg'}
        >
            {(['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav'] as BoxVariant[]).map(tag => (
                <Box
                    key={tag}
                    as={tag}
                    p={'md'}
                    rounded={'sm'}
                    bg={'muted'}
                    style={{ minWidth: '6rem', textAlign: 'center', fontSize: '0.75rem' }}
                >
                    {`<${tag}>`}
                </Box>
            ))}
        </Box>
    ),
}

export const Spacing: Story = {
    name: 'Spacing scale',
    parameters: { controls: { disable: true } },
    render: () => (
        <Box
            display={'flex'}
            gap={'md'}
            p={'lg'}
            overflow={'auto'}
        >
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map(size => (
                <Box
                    key={size}
                    p={size}
                    bg={'primarySubtle'}
                    rounded={'sm'}
                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                >
                    {`p="${size}"`}
                </Box>
            ))}
        </Box>
    ),
}

export const BackgroundColors: Story = {
    name: 'Background colors',
    parameters: { controls: { disable: true } },
    render: () => (
        <Box
            display={'grid'}
            gap={'sm'}
            p={'lg'}
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
            {(['background', 'card', 'muted', 'primary', 'primarySubtle', 'secondary', 'secondarySubtle', 'successSubtle', 'warningSubtle', 'infoSubtle', 'destructiveSubtle'] as const).map(bg => (
                <Box
                    key={bg}
                    bg={bg}
                    p={'md'}
                    rounded={'md'}
                    style={{ fontSize: '0.75rem', textAlign: 'center' }}
                >
                    {bg}
                </Box>
            ))}
        </Box>
    ),
}
