import type { ReactElement } from 'react'

import { IconButton } from '@components/actions/icon-button'
import { Grid } from '@components/layout/grid'
import { Typography } from '@components/foundation/typography'
import { vars } from '@theme/styles/contract/contract.css'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import { useClipboard } from '@stories/_shared/hooks/use-clipboard/useClipboard.hook'
import { formatTokenReference } from '@stories/_shared/utils/token-reference/tokenReference.utils'
import TokenPreview from '@stories/docs/tokens/components/token-preview/TokenPreview'
import { TOKEN_ITEM_STYLES } from '@stories/docs/tokens/components/token-item/TokenItem.css'
import type { TokenItemProps } from '@stories/docs/tokens/components/token-item/types'

/**
 * Presents one token with a comparable preview and a copy-reference action.
 * @internal Not part of the public package API.
 * @param props - Category, key and resolved CSS value in the selected theme.
 * @returns A responsive list item with announced clipboard feedback.
 * @example <TokenItem category="space" name="16" value="1rem" />
 */
const TokenItem = ({ category, name, value }: TokenItemProps): ReactElement => {
    const path = `${category}.${name}`
    const reference = formatTokenReference(path)
    const { copy, status } = useClipboard(reference)

    return (
        <Grid
            as={'li'}
            alignItems={'center'}
            className={TOKEN_ITEM_STYLES.root}
            gap={8}
        >
            <Typography
                as={'code'}
                className={TOKEN_ITEM_STYLES.reference}
                fontSize={12}
                fontWeight={'medium'}
                variant={'span'}
            >
                {reference}
            </Typography>
            <div className={TOKEN_ITEM_STYLES.preview}>
                <TokenPreview
                    category={category}
                    value={value}
                />
            </div>
            <Typography
                as={'code'}
                className={TOKEN_ITEM_STYLES.value}
                color={vars.color.text.secondary}
                fontSize={12}
                variant={'span'}
            >
                {value}
            </Typography>
            <div className={TOKEN_ITEM_STYLES.copy}>
                <IconButton
                    aria-label={status === 'copied' ? `Copied: ${path}` : `Copy ${path}`}
                    color={status === 'copied' ? 'success' : 'primary'}
                    onClick={copy}
                    size={'sm'}
                    title={`Copy ${reference}`}
                    variant={'ghost'}
                >
                    {status === 'copied' ? <CheckIcon aria-hidden={'true'} /> : (
                        <svg
                            aria-hidden={'true'}
                            fill={'none'}
                            height={18}
                            stroke={'currentColor'}
                            strokeLinecap={'round'}
                            strokeLinejoin={'round'}
                            strokeWidth={1.5}
                            viewBox={'0 0 24 24'}
                            width={18}
                        >
                            <rect
                                height={13}
                                rx={2}
                                width={13}
                                x={8}
                                y={8}
                            />
                            <path d={'M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3'} />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Typography
                className={status === 'error' ? TOKEN_ITEM_STYLES.error : TOKEN_ITEM_STYLES.status}
                color={vars.color.danger.subtleForeground}
                fontSize={12}
                role={'status'}
            >
                {status === 'copied' && `Copied ${reference}`}
                {status === 'error' && 'Copy failed. Check clipboard permissions and try again.'}
            </Typography>
        </Grid>
    )
}

export default TokenItem
