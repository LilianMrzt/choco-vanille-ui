import { useCallback, useMemo } from 'react'

import {
    getPaginationPageItems,
    type PaginationPageItem,
} from '@components/navigation/pagination/utils/pagination.utils.ts'

type UsePaginationOptions = {
    currentPage: number
    totalPages: number
    siblingCount: number
    boundaryCount: number
    onPageChange: (page: number) => void
}

type UsePaginationReturn = {
    pageItems: PaginationPageItem[]
    isFirstPage: boolean
    isLastPage: boolean
    goToPreviousPage: () => void
    goToNextPage: () => void
}

export const usePagination = ({
    currentPage,
    totalPages,
    siblingCount,
    boundaryCount,
    onPageChange,
}: UsePaginationOptions): UsePaginationReturn => {
    if (
        totalPages < 1 ||
        currentPage < 1 ||
        currentPage > totalPages ||
        !Number.isInteger(currentPage) ||
        !Number.isInteger(totalPages)
    ) {
        throw new RangeError(
            'Pagination requires an integer currentPage within totalPages.',
        )
    }

    const pageItems = useMemo(
        () =>
            getPaginationPageItems(
                totalPages,
                currentPage,
                Math.max(0, Math.floor(siblingCount)),
                Math.max(0, Math.floor(boundaryCount)),
            ),
        [boundaryCount, currentPage, siblingCount, totalPages],
    )
    const goToPreviousPage = useCallback(
        () => onPageChange(currentPage - 1),
        [currentPage, onPageChange],
    )
    const goToNextPage = useCallback(
        () => onPageChange(currentPage + 1),
        [currentPage, onPageChange],
    )

    return {
        pageItems,
        isFirstPage: currentPage === 1,
        isLastPage: currentPage === totalPages,
        goToPreviousPage,
        goToNextPage,
    }
}
