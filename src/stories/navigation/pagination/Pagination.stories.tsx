import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Pagination } from '@components/navigation/pagination'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const handlePageChange = (_page: number) => {}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| ---------------- | -------- | ---- | ----- |
| \`aria-label\` | Yes | \`string\` | Names the pagination navigation landmark. |
| \`currentPage\` | Yes | \`number\` | The current page, starting at 1. |
| \`totalPages\` | Yes | \`number\` | The total number of available pages. |
| \`previousLabel\` | Yes | \`string\` | Names the previous-page button. |
| \`nextLabel\` | Yes | \`string\` | Names the next-page button. |
| \`aria-current\` | Automatic | \`"page"\` | Applied to the current page button. |
`

const PaginationDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Navigation/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
        docs: {
            page: PaginationDocsPage,
            description: {
                component: md /* language=markdown */ `
A pagination control for navigating between pages of a collection. It renders
a native navigation landmark with accessible previous, next and page controls.

**Usage**

~~~tsx
<Pagination
  aria-label="Product pages"
  currentPage={2}
  totalPages={10}
  onPageChange={setPage}
  previousLabel="Previous"
  nextLabel="Next"
/>
~~~
                `,
            },
        },
    },
    argTypes: {
        'aria-label': { control: 'text' },
        currentPage: { control: { type: 'number', min: 1, step: 1 } },
        totalPages: { control: { type: 'number', min: 1, step: 1 } },
        siblingCount: { control: { type: 'number', min: 0, step: 1 } },
        boundaryCount: { control: { type: 'number', min: 0, step: 1 } },
        previousLabel: { control: 'text' },
        nextLabel: { control: 'text' },
        onPageChange: { action: 'page changed' },
    },
    args: {
        'aria-label': 'Product pages',
        currentPage: 3,
        totalPages: 10,
        previousLabel: 'Previous',
        nextLabel: 'Next',
        siblingCount: 1,
        boundaryCount: 1,
        onPageChange: handlePageChange,
    },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    args: meta.args,
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage)

        return (
            <Pagination
                {...args}
                currentPage={currentPage}
                onPageChange={(page) => {
                    setCurrentPage(page)
                    args.onPageChange(page)
                }}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to experiment with the pagination contract.',
            },
            ...storySource(/* language=tsx */ `
<Pagination
  aria-label="Product pages"
  currentPage={3}
  totalPages={10}
  onPageChange={setPage}
  previousLabel="Previous"
  nextLabel="Next"
/>`),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('navigation', { name: 'Product pages' }),
        ).toBeInTheDocument()
        await expect(canvas.getByRole('button', { name: '3' })).toHaveAttribute(
            'aria-current',
            'page',
        )
    },
}

export const States: Story = {
    args: meta.args,
    render: () => (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <Pagination
                aria-label={'First page'}
                currentPage={1}
                totalPages={10}
                onPageChange={() => {}}
                previousLabel={'Previous'}
                nextLabel={'Next'}
            />
            <Pagination
                aria-label={'Middle page'}
                currentPage={5}
                totalPages={10}
                onPageChange={() => {}}
                previousLabel={'Previous'}
                nextLabel={'Next'}
            />
            <Pagination
                aria-label={'Last page'}
                currentPage={10}
                totalPages={10}
                onPageChange={() => {}}
                previousLabel={'Previous'}
                nextLabel={'Next'}
            />
        </div>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Pagination aria-label="First page" currentPage={1} totalPages={10} onPageChange={() => {}} previousLabel="Previous" nextLabel="Next" />
<Pagination aria-label="Middle page" currentPage={5} totalPages={10} onPageChange={() => {}} previousLabel="Previous" nextLabel="Next" />
<Pagination aria-label="Last page" currentPage={10} totalPages={10} onPageChange={() => {}} previousLabel="Previous" nextLabel="Next" />`),
        },
    },
}
