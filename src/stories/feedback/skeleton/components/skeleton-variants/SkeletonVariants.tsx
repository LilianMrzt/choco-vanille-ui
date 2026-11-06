import type { ReactElement } from 'react'

import { Skeleton } from '@components/feedback/skeleton'
import { Flex } from '@components/layout/flex'

/**
 * Displays placeholder shapes with representative dimensions.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The shape examples.
 * @example
 * <SkeletonVariants />
 */
const SkeletonVariants = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={16}
    >
        <Skeleton
            height={'2.5rem'}
            variant={'circular'}
            width={'2.5rem'}
        />
        <Skeleton
            height={'8rem'}
            variant={'rectangular'}
            width={'16rem'}
        />
        <Skeleton
            height={'2.5rem'}
            variant={'rounded'}
            width={'12rem'}
        />
    </Flex>
)

export default SkeletonVariants
