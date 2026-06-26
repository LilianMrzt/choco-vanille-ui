import { ColorSwatch } from '@stories/overview/theme/colors/components/color-swatch/ColorSwatch.tsx'
import type {ColorGroupCardProps} from "@stories/overview/theme/colors/components/color-group-card/types";
import {
    cardStyle,
    descStyle, swatchesGrid,
    titleStyle
} from "@stories/overview/theme/colors/components/color-group-card/ColorGroupCard.styles.ts";

export function ColorGroupCard({ group, colors, dark = false }: ColorGroupCardProps) {
    return (
        <div style={cardStyle(dark)}>
            <div>
                <h3 style={titleStyle(dark)}>{group.label}</h3>
                {group.description && <p style={descStyle(dark)}>{group.description}</p>}
            </div>
            <div style={swatchesGrid}>
                {group.tokens.map((token) => (
                    <ColorSwatch
                        key={token}
                        name={token}
                        value={colors[token] ?? '#000'}
                        dark={dark}
                    />
                ))}
            </div>
        </div>
    )
}

