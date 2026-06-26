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
        subtitle: 'Available type families.',
        prefix: 'fontFamily',
        entries: Object.entries(fontFamily) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ fontFamily: value }),
    },
    {
        label: 'Font Size',
        subtitle: 'Font size scale.',
        prefix: 'fontSize',
        entries: Object.entries(fontSize) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ fontSize: value }),
    },
    {
        label: 'Font Weight',
        subtitle: 'Available font weights.',
        prefix: 'fontWeight',
        entries: Object.entries(fontWeight) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ fontWeight: value }),
    },
    {
        label: 'Line Height',
        subtitle: 'Line heights for readability.',
        prefix: 'lineHeight',
        entries: Object.entries(lineHeight) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ lineHeight: value, fontSize: 13 }),
    },
    {
        label: 'Letter Spacing',
        subtitle: 'Letter spacing values.',
        prefix: 'letterSpacing',
        entries: Object.entries(letterSpacing) as [string, string][],
        getPreviewStyle: (value) => previewTextStyle({ letterSpacing: value }),
    },
]

export const TypographySection = () => (
    <TokenSection
        title={'Typography'}
        subtitle={'Typography tokens: families, sizes, weights, line heights and letter spacing.'}
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
