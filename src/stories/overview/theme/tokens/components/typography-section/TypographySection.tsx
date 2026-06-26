import type { CSSProperties } from 'react'

import {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
} from '@theme/tokens/typography.ts'

import { TokenCard } from '@stories/overview/theme/tokens/components/token-card/TokenCard.tsx'
import { gridStyle } from '@stories/overview/theme/tokens/components/token-card/TokenCard.styles.ts'
import { TokenSection } from '@stories/overview/theme/tokens/components/token-section/TokenSection.tsx'
import {
    groupStyle,
    groupSubtitleStyle,
    groupTitleStyle,
    groupsWrapperStyle,
    previewTextStyle,
} from '@stories/overview/theme/tokens/components/typography-section/TypographySection.styles.ts'

interface TypographyGroup {
    label: string
    subtitle: string
    prefix: string
    entries: [string, string][]
    getPreviewStyle: (value: string) => CSSProperties
}

const GROUPS: TypographyGroup[] = [
    {
        label: 'Font Family',
        subtitle: 'Familles typographiques disponibles.',
        prefix: 'fontFamily',
        entries: Object.entries(fontFamily) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ fontFamily: value }),
    },
    {
        label: 'Font Size',
        subtitle: 'Échelle de tailles de police.',
        prefix: 'fontSize',
        entries: Object.entries(fontSize) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ fontSize: value }),
    },
    {
        label: 'Font Weight',
        subtitle: 'Graisses de police disponibles.',
        prefix: 'fontWeight',
        entries: Object.entries(fontWeight) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ fontWeight: value }),
    },
    {
        label: 'Line Height',
        subtitle: 'Hauteurs de ligne pour la lisibilité.',
        prefix: 'lineHeight',
        entries: Object.entries(lineHeight) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ lineHeight: value, fontSize: 13 }),
    },
    {
        label: 'Letter Spacing',
        subtitle: 'Espacement entre les caractères.',
        prefix: 'letterSpacing',
        entries: Object.entries(letterSpacing) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ letterSpacing: value }),
    },
]

export const TypographySection = () => (
    <TokenSection
        title={'Typographie'}
        subtitle={'Tokens typographiques : familles, tailles, graisses, hauteurs de ligne et espacements entre caractères.'}
    >
        <div style={groupsWrapperStyle}>
            {GROUPS.map(({ label, subtitle, prefix, entries, getPreviewStyle }) => (
                <div key={label} style={groupStyle}>
                    <div>
                        <h3 style={groupTitleStyle}>{label}</h3>
                        <p style={groupSubtitleStyle}>{subtitle}</p>
                    </div>
                    <div style={gridStyle}>
                        {entries.map(([name, value]) => (
                            <TokenCard
                                key={name}
                                name={`${prefix}.${name}`}
                                value={value}
                                preview={<p style={getPreviewStyle(value)}>{'Aa — The quick brown fox'}</p>}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </TokenSection>
)
