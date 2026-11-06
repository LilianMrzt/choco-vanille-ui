import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { EmptyState } from '@components/feedback/empty-state'
import type { EmptyStateStoryArgs } from '@stories/feedback/empty-state/types'

/**
 * Renders the empty-state controls with an optional example action.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Component props and demonstration controls.
 * @param props.showAction - Whether to display the example action.
 * @returns The empty-state example.
 * @example
 * <EmptyStatePlayground title="No results" description="Try again." showAction />
 */
const EmptyStatePlayground = ({ showAction, ...props }: EmptyStateStoryArgs): ReactElement => (
    <EmptyState
        {...props}
        action={showAction ? (
            <Button
                color={'primary'}
                label={'Clear filters'}
                variant={'outlined'}
            />
        ) : undefined}
    />
)

export default EmptyStatePlayground
