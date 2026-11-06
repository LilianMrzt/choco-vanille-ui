export type PaginationPageItem = number | 'ellipsis'

/**
 * Builds the visible, ordered page numbers and ellipses.
 * @param totalPages - Total number of pages.
 * @param currentPage - Current page number.
 * @param siblingCount - Pages shown on either side of the current page.
 * @param boundaryCount - Pages shown at each boundary.
 * @returns Ordered page numbers and ellipsis markers.
 * @example
 * getPaginationPageItems(10, 5, 1, 1)
 */
export const getPaginationPageItems = (
    totalPages: number,
    currentPage: number,
    siblingCount: number,
    boundaryCount: number,
): PaginationPageItem[] => {
    const visiblePages = new Set<number>()

    for (let page = 1; page <= boundaryCount; page += 1) {
        visiblePages.add(page)
        visiblePages.add(totalPages - page + 1)
    }

    for (
        let page = currentPage - siblingCount;
        page <= currentPage + siblingCount;
        page += 1
    ) {
        visiblePages.add(page)
    }

    const pages = [...visiblePages]
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b)
    const items: PaginationPageItem[] = []

    pages.forEach((page, index) => {
        const previousPage = pages[index - 1]

        if (previousPage !== undefined && page - previousPage > 1) {
            items.push('ellipsis')
        }
        items.push(page)
    })

    return items
}
