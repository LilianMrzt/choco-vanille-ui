import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { vars } from '@theme'
import { useClipboard } from '@stories/_shared/hooks/use-clipboard/useClipboard.hook'
import type { CopyButtonProps } from '@stories/_shared/components/copy-button/types'

/**
 * Renders a keyboard-accessible copy action with persistent result feedback.
 * @internal Not part of the public package API.
 * @param props - Copy label and literal clipboard text.
 * @returns A copy button and an announced failure when copying is unavailable.
 * @example <CopyButton label="Copy token" value="vars.space.md" />
 */
const CopyButton = ({ label, value }: CopyButtonProps): ReactElement => {
    const { copy, status } = useClipboard(value)

    return (
        <Flex
            alignItems={'flex-start'}
            flexDirection={'column'}
            gap={'xs'}
        >
            <Button
                color={'secondary'}
                label={status === 'copied' ? `Copied: ${label}` : label}
                onClick={copy}
                variant={'outlined'}
            />
            <Typography
                color={vars.color.danger.subtleForeground}
                fontSize={'xs'}
                role={'status'}
            >
                {status === 'error' && 'Copy failed. Check clipboard permissions and try again.'}
            </Typography>
        </Flex>
    )
}

export default CopyButton
