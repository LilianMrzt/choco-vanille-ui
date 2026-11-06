import type { FC } from 'react'

import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import ChevronLeftIcon from '@resources/asset/ChevronLeftIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import { Flex } from '@components/layout/flex'
import { usePagination } from '@components/navigation/pagination/hooks/usePagination.hook.ts'
import { PAGINATION_STYLES } from '@components/navigation/pagination/Pagination.css.ts'
import type { PaginationProps } from '@components/navigation/pagination/types'

/**
 * Numbered page navigation rendered as a `<nav>` with Previous/Next icon
 * buttons and page buttons with ellipsis truncation. Requires `currentPage`,
 * `totalPages`, `onPageChange`, `previousLabel`, and `nextLabel`.
 * Native attributes and the ref are forwarded to the navigation landmark.
 *
 * @param props - Pagination options and native navigation attributes.
 * @param props["aria-label"] - Accessible landmark name.
 * @param props.currentPage - Current page, starting at one.
 * @param props.totalPages - Total number of pages, at least one.
 * @param props.onPageChange - Called with the requested page.
 * @param props.siblingCount - Pages around the current page; defaults to `1`.
 * @param props.boundaryCount - Pages at each boundary; defaults to `1`.
 * @param props.previousLabel - Accessible previous button name.
 * @param props.nextLabel - Accessible next button name.
 * @param props.className - Additional navigation class.
 * @param props.ref - Ref to the navigation element.
 * @returns The pagination landmark.
 * @throws {RangeError} When page values are invalid or counts are not finite.
 * @example
 * <Pagination aria-label="Pages" currentPage={1} totalPages={10}
 *   previousLabel="Previous" nextLabel="Next" onPageChange={setPage} />
 */
const Pagination: FC<PaginationProps> = ({
    'aria-label': ariaLabel,
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    previousLabel,
    nextLabel,
    className,
    ref,
    ...props
}) => {
    const {
        pageItems,
        isFirstPage,
        isLastPage,
        goToPreviousPage,
        goToNextPage,
    } = usePagination({
        currentPage,
        totalPages,
        siblingCount,
        boundaryCount,
        onPageChange,
    })

    return (
        <Flex
            as={'nav'}
            justifyContent={'center'}
            ref={ref}
            aria-label={ariaLabel}
            className={className}
            {...props}
        >
            <Flex
                as={'ul'}
                alignItems={'center'}
                gap={4}
                className={PAGINATION_STYLES.list}
            >
                <li>
                    <IconButton
                        variant={'ghost'}
                        color={'tertiary'}
                        size={'sm'}
                        icon={ChevronLeftIcon}
                        disabled={isFirstPage}
                        aria-label={previousLabel}
                        onClick={goToPreviousPage}
                    />
                </li>
                {pageItems.map((item, index) =>
                    item === 'ellipsis' ? (
                        <li
                            key={`ellipsis-${index}`}
                            aria-hidden={'true'}
                        >
                            <Flex
                                as={'span'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                className={PAGINATION_STYLES.ellipsis}
                            >
                                ...
                            </Flex>
                        </li>
                    ) : (
                        <li key={item}>
                            <Button
                                variant={'ghost'}
                                color={'primary'}
                                size={'sm'}
                                label={`${item}`}
                                active={item === currentPage}
                                aria-current={
                                    item === currentPage ? 'page' : undefined
                                }
                                aria-label={`${item}`}
                                onClick={() => onPageChange(item)}
                            />
                        </li>
                    ),
                )}
                <li>
                    <IconButton
                        variant={'ghost'}
                        color={'tertiary'}
                        size={'sm'}
                        icon={ChevronRightIcon}
                        disabled={isLastPage}
                        aria-label={nextLabel}
                        onClick={goToNextPage}
                    />
                </li>
            </Flex>
        </Flex>
    )
}

Pagination.displayName = 'Pagination'

export default Pagination
