import type { CSSProperties, ReactElement } from 'react'

import { Box } from '@components/layout/box'
import { Button } from '@components/actions/button'
import { vars } from '@theme'
import { TOKEN_PREVIEW_STYLES } from '@stories/docs/tokens/components/token-preview/TokenPreview.css'
import type { TokenPreviewProps } from '@stories/docs/tokens/components/token-preview/types'

/**
 * Displays one raw token value without changing surrounding reference content.
 * @internal Not part of the public package API.
 * @param props - Token category and resolved value from the selected theme.
 * @returns A visual sample; motion samples support pointer and keyboard focus.
 * @example <TokenPreview category="radius" value="0.5rem" />
 */
const TokenPreview = ({ category, value }: TokenPreviewProps): ReactElement => {
    const preview: CSSProperties = {}
    let text = 'Aa'

    switch (category) {
        case 'space':
            preview.width = value
            preview.height = vars.space.md
            preview.backgroundColor = vars.color.primary.main
            text = ''
            break
        case 'radius':
            preview.borderRadius = value
            preview.backgroundColor = vars.color.primary.subtle
            preview.border = `1px solid ${vars.color.primary.border}`
            break
        case 'shadow':
            preview.boxShadow = value
            break
        case 'dropShadow':
            preview.filter = value
            break
        case 'duration':
            preview.transitionDuration = value
            text = 'Focus or hover'
            break
        case 'easing':
            preview.transitionTimingFunction = value
            text = 'Focus or hover'
            break
        case 'zIndex':
            text = `Layer ${value}`
            break
        case 'fontFamily':
            preview.fontFamily = value
            text = 'The quick brown fox'
            break
        case 'fontSize':
            preview.fontSize = value
            break
        case 'fontWeight':
            preview.fontWeight = Number(value)
            break
        case 'lineHeight':
            preview.lineHeight = value
            text = 'A little room to read. A little room to breathe.'
            break
        case 'letterSpacing':
            preview.letterSpacing = value
            text = 'Choco Vanille'
            break
    }

    const isMotion = category === 'duration' || category === 'easing'

    return (
        <Box
            backgroundColor={vars.color.surface.main}
            borderRadius={'md'}
            className={TOKEN_PREVIEW_STYLES.root}
            minHeight={'5rem'}
            overflow={'auto'}
            padding={'md'}
        >
            {isMotion ? (
                <Button
                    aria-label={`Preview ${category}: ${value}`}
                    className={TOKEN_PREVIEW_STYLES.motion}
                    label={text}
                    style={preview}
                    variant={'outlined'}
                />
            ) : (
                <div style={preview}>{text}</div>
            )}
        </Box>
    )
}

export default TokenPreview
