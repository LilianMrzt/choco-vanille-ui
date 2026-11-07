import type { ReactElement } from 'react'
import { CircularProgress, Progress, type ProgressBaseProps } from '@components/feedback/progress'
import { Flex } from '@components/layout/flex'

/**
 * Applies the same controls to both public progress presentations.
 * @param props - Shared progress value, appearance and accessible name.
 * @returns Linear and circular indicators.
 * @example <ProgressPlayground value={50} label="Loading progress" />
 */
const ProgressPlayground = (props: ProgressBaseProps): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={16}
        width={'100%'}
        maxWidth={'28rem'}
    >
        <Progress {...props} />
        <CircularProgress {...props} />
    </Flex>
)

export default ProgressPlayground
