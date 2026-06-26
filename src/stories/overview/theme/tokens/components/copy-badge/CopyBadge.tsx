import { useState } from 'react'

import { badgeStyle } from '@stories/overview/theme/tokens/components/copy-badge/CopyBadge.styles.ts'
import type { CopyBadgeProps } from '@stories/overview/theme/tokens/components/copy-badge/types'

export const CopyBadge = ({ value }: CopyBadgeProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        })
    }

    return (
        <span
            role={'button'}
            tabIndex={0}
            onClick={handleCopy}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleCopy() } }}
            title={`Cliquer pour copier : ${value}`}
            style={badgeStyle(copied)}
        >
            {copied ? '✓ copié' : '⎘ copier'}
        </span>
    )
}
