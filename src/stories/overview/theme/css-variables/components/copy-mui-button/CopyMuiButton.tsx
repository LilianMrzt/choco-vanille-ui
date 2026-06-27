import { useState } from 'react'

import { Button } from '@components/actions/button'

import { buildMuiThemeSnippet } from '@stories/overview/theme/css-variables/utils/theme.utils.ts'

// Component

export const CopyMuiButton = () => {
    const [copied, setCopied] = useState(false)

    const handleClick = () => {
        void navigator.clipboard.writeText(buildMuiThemeSnippet()).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <Button
            variant={'outlined'}
            color={copied ? 'success' : 'secondary'}
            label={copied ? 'Copied!' : 'Copy MUI createTheme snippet'}
            startIcon={copied ? 'lucide:check' : 'lucide:clipboard-list'}
            onClick={handleClick}
        />
    )
}
