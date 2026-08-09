import { useState } from 'react'

import { Button } from '@components/actions/button'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

import { buildThemeCSS } from '@stories/overview/theme/css-variables/utils/theme.utils.ts'

// Component

export const CopyThemeButton = () => {
    const [copied, setCopied] = useState(false)

    const handleClick = () => {
        void navigator.clipboard.writeText(buildThemeCSS()).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <Button
            variant={'outlined'}
            color={copied ? 'success' : 'secondary'}
            label={copied ? 'Copied!' : 'Copy full theme CSS'}
            startIcon={copied ? CheckIcon : SearchIcon}
            onClick={handleClick}
        />
    )
}