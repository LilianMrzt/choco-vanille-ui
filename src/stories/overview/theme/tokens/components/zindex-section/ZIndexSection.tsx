import { zIndex } from '@theme/tokens/zIndex.ts'

import { CopyBadge } from '@stories/overview/theme/tokens/components/copy-badge/CopyBadge.tsx'
import { TokenSection } from '@stories/overview/theme/tokens/components/token-section/TokenSection.tsx'
import {
    barStyle,
    emptyBarStyle,
    listStyle,
    nameStyle,
    numericStyle,
    rowStyle,
} from '@stories/overview/theme/tokens/components/zindex-section/ZIndexSection.styles.ts'

const SORTED_ENTRIES = (Object.entries(zIndex) as [string, string][]).sort(
    (a, b) => Number(a[1]) - Number(b[1])
)

export const ZIndexSection = () => (
    <TokenSection
        title={'Z-Index'}
        subtitle={'Stacking scale to prevent layer conflicts in the interface.'}
    >
        <div style={listStyle}>
            {SORTED_ENTRIES.map(([name, value]) => (
                <div
                    key={name}
                    style={rowStyle}
                >
                    <span style={nameStyle}>{name}</span>
                    <span style={numericStyle}>{value}</span>
                    {Number(value) > 0
                        ? <div style={barStyle(value)} />
                        : <span style={emptyBarStyle}>{'—'}</span>
                    }
                    <CopyBadge value={value} />
                </div>
            ))}
        </div>
    </TokenSection>
)
