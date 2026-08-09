import { useState } from 'react'

import { Button } from '@components/actions/button'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

import { buildTailwindTheme } from '@stories/overview/theme/css-variables/utils/theme.utils.ts'

// Component

export const CopyTailwindButton = () => {
    const [copied, setCopied] = useState(false)

    const handleClick = () => {
        void navigator.clipboard.writeText(buildTailwindTheme()).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <Button
            variant={'outlined'}
            color={copied ? 'success' : 'secondary'}
            label={copied ? 'Copied!' : 'Copy Tailwind @theme snippet'}
            startIcon={copied ? CheckIcon : SearchIcon}
            onClick={handleClick}
        />
    )
}