import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Pagination, type PaginationProps } from '@components/navigation/pagination'
import PaginationDocsPage from '@stories/navigation/pagination/components/pagination-docs-page/PaginationDocsPage'
import PaginationStates from '@stories/navigation/pagination/components/pagination-states/PaginationStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/pagination/constants'
import statesSource from '@stories/navigation/pagination/sources/PaginationStates.source.txt?raw'
import { createPaginationSource } from '@stories/navigation/pagination/utils/create-pagination-source/createPaginationSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A controlled page navigator with a native navigation landmark and accessible previous, next and page controls.',
            },
            page: PaginationDocsPage,
            source: {
                type: 'dynamic',
                transform: createPaginationSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Synchronizes the selected page with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @param _args - Storybook render args; current values come from useArgs.
 * @returns The controlled pagination or an explanation of invalid controls.
 * @example
 * ControlledPagination(args)
 */
const ControlledPagination = (_args: PaginationProps) => {
    const [args, updateArgs] = useArgs<PaginationProps>()

    /**
     * Forwards page selection and updates Storybook Controls.
     * @internal Storybook-only handler; not part of the public package API.
     * @param currentPage - Requested page number.
     * @returns Nothing.
     * @example
     * handlePageChange(2)
     */
    const handlePageChange = (currentPage: number): void => {
        args.onPageChange(currentPage)
        updateArgs({ currentPage })
    }

    if (!Number.isInteger(args.currentPage) || !Number.isInteger(args.totalPages) ||
        args.currentPage < 1 || args.totalPages < args.currentPage) {
        return <p role={'alert'}>Choose integer page values with 1 ≤ currentPage ≤ totalPages.</p>
    }

    if ((args.siblingCount !== undefined && !Number.isFinite(args.siblingCount)) ||
        (args.boundaryCount !== undefined && !Number.isFinite(args.boundaryCount))) {
        return <p role={'alert'}>Choose finite sibling and boundary counts.</p>
    }

    return (
        <Pagination
            {...args}
            onPageChange={handlePageChange}
        />
    )
}

export const Playground: Story = {
    render: ControlledPagination,
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: PaginationStates,
}
