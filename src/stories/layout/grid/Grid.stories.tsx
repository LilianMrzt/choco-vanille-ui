import type { Meta, StoryObj } from '@storybook/react-vite'

import { Grid } from '@components/layout/grid'
import { Box } from '@components/layout/box'

const meta = {
    title: 'Layout/Grid',
    component: Grid,
    parameters: { layout: 'padded' },
    argTypes: {
        columns: { control: 'select', options: [undefined, 'none', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        autoRows: { control: 'select', options: [undefined, 'auto', 'min', 'max', 'fr'] },        flow: { control: 'select', options: [undefined, 'row', 'column', 'dense', 'row-dense', 'column-dense'] },
        align: { control: 'select', options: [undefined, 'start', 'end', 'center', 'stretch', 'baseline'] },
        justifyItems: { control: 'select', options: [undefined, 'start', 'end', 'center', 'stretch'] },
        justifyContent: { control: 'select', options: [undefined, 'start', 'end', 'center', 'stretch', 'between', 'around', 'evenly'] },
        alignContent: { control: 'select', options: [undefined, 'start', 'end', 'center', 'stretch', 'between', 'around', 'evenly'] },
        gap: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        p: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        rounded: { control: 'select', options: [undefined, 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
        bg: { control: 'select', options: [undefined, 'transparent', 'background', 'card', 'muted', 'primary', 'primarySubtle'] },
    },
    args: {
        columns: 3,
        gap: 'md',
    },
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>

const Cell = ({ label }: { label: string }) => (
    <Box
        p={'md'}
        rounded={'sm'}
        bg={'primarySubtle'}
        style={{ fontSize: '0.875rem', textAlign: 'center' }}
    >
        {label}
    </Box>
)

export const Default: Story = {
    render: (args) => (
        <Grid {...args}>
            {Array.from({ length: 9 }, (_, i) => (
                <Cell
                    key={i}
                    label={`Cell ${i + 1}`}
                />
            ))}
        </Grid>
    ),
}

export const ColumnVariants: Story = {
    name: 'Column counts',
    parameters: { controls: { disable: true } },
    render: () => (
        <Box
            display={'flex'}
            gap={'xl'}
            style={{ flexDirection: 'column' }}
        >
            {([1, 2, 3, 4, 6] as const).map(n => (
                <Box key={n}>
                    <Box
                        mb={'xs'}
                        style={{ fontSize: '0.75rem', fontWeight: 600 }}
                    >{`columns={${n}}`}</Box>
                    <Grid
                        columns={n}
                        gap={'sm'}
                    >
                        {Array.from({ length: n * 2 }, (_, i) => (
                            <Cell
                                key={i}
                                label={`${i + 1}`}
                            />
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    ),
}

export const ResponsiveCard: Story = {
    name: 'Card grid',
    parameters: { controls: { disable: true } },
    render: () => (
        <Grid
            columns={3}
            gap={'md'}
            p={'md'}
            rounded={'md'}
            bg={'muted'}
        >
            {Array.from({ length: 6 }, (_, i) => (
                <Box
                    key={i}
                    p={'lg'}
                    rounded={'md'}
                    bg={'card'}
                    style={{ fontSize: '0.875rem' }}
                >
                    <Box
                        mb={'xs'}
                        style={{ fontWeight: 600 }}
                    >{`Card ${i + 1}`}</Box>
                    <Box style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>
                        Some description text for this card.
                    </Box>
                </Box>
            ))}
        </Grid>
    ),
}

export const AutoFlow: Story = {
    name: 'Auto flow — column dense',
    parameters: { controls: { disable: true } },
    render: () => (
        <Grid
            columns={4}
            flow={'column-dense'}
            gap={'sm'}
            p={'md'}
            rounded={'md'}
            bg={'muted'}
        >
            {Array.from({ length: 8 }, (_, i) => (
                <Cell
                    key={i}
                    label={`${i + 1}`}
                />
            ))}
        </Grid>
    ),
}
