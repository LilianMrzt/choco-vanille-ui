import { RADIUS } from '@theme/tokens/radius/radius.const.ts'

import { TokenCard } from '@stories/overview/theme/tokens/components/token-card/TokenCard.tsx'
import { gridStyle } from '@stories/overview/theme/tokens/components/token-card/TokenCard.styles.ts'
import { TokenSection } from '@stories/overview/theme/tokens/components/token-section/TokenSection.tsx'
import { previewStyle } from '@stories/overview/theme/tokens/components/radius-section/RadiusSection.styles.ts'

export const RadiusSection = () => (
    <TokenSection
        title={'Border Radius'}
        subtitle={'Border radius scale for rounded components.'}
    >
        <div style={gridStyle}>
            {(Object.entries(RADIUS) as [string, string][]).map(([name, value]) => (
                <TokenCard
                    key={name}
                    name={`radius.${name}`}
                    value={value}
                    preview={<div style={previewStyle(value)} />}
                />
            ))}
        </div>
    </TokenSection>
)
