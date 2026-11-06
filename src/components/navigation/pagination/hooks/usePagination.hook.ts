import { useCallback, useMemo } from 'react'

import {
    getPaginationPageItems,
    type PaginationPageItem,
} from '@components/navigation/pagination/utils/pagination.utils.ts'

type UsePaginationOptions = Readonly<{
    currentPage: number
    totalPages: number
    siblingCount: number
    boundaryCount: number
    onPageChange: (page: number) => void
}>

type UsePaginationReturn = Readonly<{
    pageItems: PaginationPageItem[]
    isFirstPage: boolean
    isLastPage: boolean
    goToPreviousPage: () => void
    goToNextPage: () => void
}>

/**
 * Resolves visible pages and previous/next actions.
 * @param options - Current page, total, display counts and change callback.
 * @param options.currentPage - Current page, starting at one.
 * @param options.totalPages - Total pages, at least one.
 * @param options.siblingCount - Pages shown around the current page.
 * @param options.boundaryCount - Pages shown at each boundary.
 * @param options.onPageChange - Callback receiving the requested page.
 * @returns Page items, boundary state and navigation actions.
 * @throws {RangeError} When pages are invalid or display counts are not finite.
 * @example
 * usePagination({ currentPage: 1, totalPages: 5, siblingCount: 1, boundaryCount: 1, onPageChange })
 */
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

    if (!Number.isFinite(siblingCount) || !Number.isFinite(boundaryCount)) {
        throw new RangeError('Pagination requires finite siblingCount and boundaryCount.')
    }

    const pageItems = useMemo(
        () =>
            getPaginationPageItems(
                totalPages,
                currentPage,
                Math.min(totalPages, Math.max(0, Math.floor(siblingCount))),
                Math.min(totalPages, Math.max(0, Math.floor(boundaryCount))),
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
