import { lightShadows, darkShadows, lightDropShadows, darkDropShadows } from '@theme/tokens/shadows.ts'

import { TokenCard } from '@stories/overview/theme/tokens/components/token-card/TokenCard.tsx'
import { gridStyle } from '@stories/overview/theme/tokens/components/token-card/TokenCard.styles.ts'
import { TokenSection } from '@stories/overview/theme/tokens/components/token-section/TokenSection.tsx'
import {
    boxShadowPreviewStyle,
    dropShadowPreviewStyle,
    dropShadowWrapperStyle,
    subGroupStyle,
    subGroupTitleStyle,
    variantsWrapperStyle,
} from '@stories/overview/theme/tokens/components/shadow-section/ShadowSection.styles.ts'

const SHADOW_VARIANTS = [
    { label: 'Box Shadow — Light', tokens: lightShadows, prefix: 'shadow' },
    { label: 'Box Shadow — Dark', tokens: darkShadows, prefix: 'shadow' },
] as const

const DROP_SHADOW_VARIANTS = [
    { label: 'Drop Shadow — Light', tokens: lightDropShadows, prefix: 'dropShadow' },
    { label: 'Drop Shadow — Dark', tokens: darkDropShadows, prefix: 'dropShadow' },
] as const

export const ShadowSection = () => (
    <TokenSection
        title={'Shadows'}
        subtitle={'Box-shadow elevations and drop-shadow filters. Light and dark variants are displayed side by side.'}
    >
        <div style={variantsWrapperStyle}>
            {SHADOW_VARIANTS.map(({ label, tokens, prefix }) => (
                <div key={label} style={subGroupStyle}>
                    <h3 style={subGroupTitleStyle}>{label}</h3>
                    <div style={gridStyle}>
                        {(Object.entries(tokens) as [string, string][]).map(([name, value]) => (
                            <TokenCard
                                key={name}
                                name={`${prefix}.${name}`}
                                value={value}
                                preview={<div style={boxShadowPreviewStyle(value)} />}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {DROP_SHADOW_VARIANTS.map(({ label, tokens, prefix }) => (
                <div key={label} style={subGroupStyle}>
                    <h3 style={subGroupTitleStyle}>{label}</h3>
                    <div style={gridStyle}>
                        {(Object.entries(tokens) as [string, string][]).map(([name, value]) => (
                            <TokenCard
                                key={name}
                                name={`${prefix}.${name}`}
                                value={value}
                                preview={
                                    <div style={dropShadowWrapperStyle}>
                                        <div style={dropShadowPreviewStyle(value)} />
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </TokenSection>
)
