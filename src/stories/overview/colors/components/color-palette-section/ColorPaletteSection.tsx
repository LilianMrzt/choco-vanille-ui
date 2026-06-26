import { ColorGroupCard } from '../color-group-card/ColorGroupCard.tsx'
import {
    type ColorPaletteSectionProps,
    sectionStyle
} from "@stories/overview/colors/components/color-palette-section/types";
import {
    gridStyle,
    headerStyle, subtitleStyle,
    titleStyle
} from "@stories/overview/colors/components/color-palette-section/ColorPaletteSection.styles.ts";

export function ColorPaletteSection({ title, subtitle, colors, colorGroups, dark = false }: ColorPaletteSectionProps) {
    return (
        <section style={sectionStyle}>
            <div style={headerStyle(dark)}>
                <h2 style={titleStyle(dark)}>{title}</h2>
                {subtitle && <p style={subtitleStyle(dark)}>{subtitle}</p>}
            </div>
            <div style={gridStyle}>
                {colorGroups.map((group) => (
                    <ColorGroupCard
                        key={group.label}
                        group={group}
                        colors={colors}
                        dark={dark}
                    />
                ))}
            </div>
        </section>
    )
}

