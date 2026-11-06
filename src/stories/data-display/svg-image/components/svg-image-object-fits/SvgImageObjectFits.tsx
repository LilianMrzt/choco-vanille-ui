import { SvgImage } from '@components/data-display/svg-image'
import ImageIcon from '@resources/asset/ImageIcon.svg?react'
import { OBJECT_FIT } from '@stories/data-display/svg-image/constants'
import type { ReactElement } from 'react'

/**
 * Renders the SvgImage ObjectFits story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <SvgImageObjectFits />
 */
const SvgImageObjectFits = (): ReactElement => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {OBJECT_FIT.slice(1).map((objectFit) => (
            <SvgImage
                key={objectFit}
                image={ImageIcon}
                alt={objectFit}
                objectFit={objectFit}
                width={'120px'}
                height={'120px'}
            />
        ))}
    </div>
)

export default SvgImageObjectFits
