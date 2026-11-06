import type { ReactElement } from 'react'

import { Grid } from '@components/layout/grid'
import { Pagination } from '@components/navigation/pagination'

/**
 * Displays first, middle and last page states.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The page state examples.
 * @example
 * <PaginationStates />
 */
const PaginationStates = (): ReactElement => (
    <Grid gap={16}>
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
    </Grid>
)

export default PaginationStates
