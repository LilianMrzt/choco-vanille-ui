import { SvgImage } from '@components/layout/svg-image'
import ImageIcon from '@resources/asset/ImageIcon.svg?react'
import { COLORS } from '@stories/layout/svg-image/constants'
import type { ReactElement } from 'react'

/**
 * Renders the SvgImage Colors story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <SvgImageColors />
 */
const SvgImageColors = (): ReactElement => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {COLORS.map((color) => (
            <SvgImage
                key={color}
                image={ImageIcon}
                alt={color}
                color={color}
                width={'96px'}
                height={'96px'}
            />
        ))}
    </div>
)

export default SvgImageColors
