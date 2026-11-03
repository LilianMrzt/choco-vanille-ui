import type { CSSProperties, ReactElement } from 'react'

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
    if (category === 'duration' || category === 'easing') {
        const transition: CSSProperties = category === 'duration'
            ? { transitionDuration: value }
            : { transitionTimingFunction: value }

        return (
            <button
                aria-label={`Preview ${category}: ${value}`}
                className={TOKEN_PREVIEW_STYLES.motion}
                type={'button'}
            >
                <span>Hover / focus</span>
                <span
                    aria-hidden={'true'}
                    className={TOKEN_PREVIEW_STYLES.track}
                >
                    <span
                        className={TOKEN_PREVIEW_STYLES.indicator}
                        style={transition}
                    />
                </span>
            </button>
        )
    }

    if (category === 'space') {
        return (
            <div
                aria-hidden={'true'}
                className={TOKEN_PREVIEW_STYLES.ruler}
            >
                <div
                    className={TOKEN_PREVIEW_STYLES.bar}
                    style={{ width: value }}
                />
            </div>
        )
    }

    if (category === 'zIndex') {
        return (
            <div
                aria-hidden={'true'}
                className={TOKEN_PREVIEW_STYLES.stack}
            >
                <span className={TOKEN_PREVIEW_STYLES.backLayer} />
                <span
                    className={TOKEN_PREVIEW_STYLES.frontLayer}
                    style={{ zIndex: Number(value) }}
                />
            </div>
        )
    }

    const preview: CSSProperties = {}
    let text = 'Aa 0123'
    let className = TOKEN_PREVIEW_STYLES.text

    switch (category) {
        case 'radius':
            preview.borderRadius = value
            className = TOKEN_PREVIEW_STYLES.radius
            text = ''
            break
        case 'shadow':
            preview.boxShadow = value
            className = TOKEN_PREVIEW_STYLES.surface
            text = ''
            break
        case 'dropShadow':
            preview.filter = value
            className = TOKEN_PREVIEW_STYLES.surface
            text = ''
            break
        case 'fontFamily':
            preview.fontFamily = value
            text = 'The quick brown fox'
            break
        case 'fontSize':
            preview.fontSize = value
            text = 'Aa'
            break
        case 'fontWeight':
            preview.fontWeight = Number(value)
            break
    }

    return (
        <div
            aria-hidden={'true'}
            className={className}
            style={preview}
        >
            {text}
        </div>
    )
}

export default TokenPreview
