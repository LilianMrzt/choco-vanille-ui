import type { ReactElement } from 'react'

import { useClipboard } from '@stories/_shared/hooks/use-clipboard/useClipboard.hook'
import { COLOR_SWATCH_STYLES } from '@stories/docs/colors/components/color-swatch/ColorSwatch.css'
import type { ColorSwatchProps } from '@stories/docs/colors/components/color-swatch/types'

/**
 * Copies a typed semantic color reference using a native button.
 * @internal Not part of the public package API.
 * @param props - Token path and its resolved CSS color.
 * @returns A swatch, readable value, and announced clipboard feedback.
 * @example <ColorSwatch name="primary.main" value="#2563eb" />
 */
const ColorSwatch = ({ name, value }: ColorSwatchProps): ReactElement => {
    const colorReference = `vars.color.${name}`
    const { copy, status } = useClipboard(colorReference)
    const className = name.endsWith('.main')
        ? `${COLOR_SWATCH_STYLES.root} ${COLOR_SWATCH_STYLES.main}`
        : COLOR_SWATCH_STYLES.root

    return (
        <button
            aria-label={`Copy ${colorReference}`}
            className={className}
            onClick={copy}
            title={`Click to copy: ${colorReference}`}
            type={'button'}
        >
            <span
                aria-hidden={true}
                className={COLOR_SWATCH_STYLES.swatch}
                style={{ backgroundColor: value }}
            />
            <span>{name}</span>
            <span className={COLOR_SWATCH_STYLES.value}>{value}</span>
            <span
                className={COLOR_SWATCH_STYLES.feedback}
                role={'status'}
            >
                {status === 'copied' && 'Copied'}
                {status === 'error' && 'Copy failed. Check clipboard permissions and try again.'}
            </span>
        </button>
    )
}

export default ColorSwatch
