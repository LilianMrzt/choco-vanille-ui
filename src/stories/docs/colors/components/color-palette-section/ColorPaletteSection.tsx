import type { ReactElement } from 'react'

import ColorGroupCard from '@stories/docs/colors/components/color-group-card/ColorGroupCard.tsx'
import type { ColorPaletteSectionProps } from '@stories/docs/colors/components/color-palette-section/types'
import { COLOR_PALETTE_SECTION_STYLES } from '@stories/docs/colors/components/color-palette-section/ColorPaletteSection.css'
import ReferencePage from '@stories/_shared/components/reference-page/ReferencePage'

/**
 * Presents the semantic palette in a responsive reference page.
 * @internal Not part of the public package API.
 * @param props - Heading, resolved colors, and semantic groups.
 * @returns Grouped, keyboard-accessible color references.
 * @example <ColorPaletteSection title="Colors" colors={colors} colorGroups={groups} />
 */
const ColorPaletteSection = ({ title, subtitle, colors, colorGroups }: ColorPaletteSectionProps): ReactElement => (
    <ReferencePage
        description={subtitle ?? 'Explore semantic color roles and copy their typed references.'}
        title={title}
    >
        <div className={COLOR_PALETTE_SECTION_STYLES.grid}>
            {colorGroups.map((group) => (
                <ColorGroupCard
                    key={group.label}
                    group={group}
                    colors={colors}
                />
            ))}
        </div>
    </ReferencePage>
)

export default ColorPaletteSection
