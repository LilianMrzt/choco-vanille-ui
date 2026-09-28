import type { SelectContentProps } from '@components/forms/select/components/select-content/types/SelectContent.props.ts'

/**
 * Flips the popup vertically when there is not enough room; alignment
 * collisions are handled by `useViewportShift`.
 */
export const SELECT_CONTENT_DEFAULT_COLLISION_AVOIDANCE: NonNullable<
    SelectContentProps['collisionAvoidance']
> = {
    side: 'flip',
    align: 'none',
}
