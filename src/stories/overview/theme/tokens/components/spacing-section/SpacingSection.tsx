import { space } from '@theme/tokens/spacing.ts'

import { CopyBadge } from '@stories/overview/theme/tokens/components/copy-badge/CopyBadge.tsx'
import { TokenSection } from '@stories/overview/theme/tokens/components/token-section/TokenSection.tsx'
import {
    barStyle,
    emptyBarStyle,
    listStyle,
    nameStyle,
    pxValueStyle,
    remValueStyle,
    rowStyle,
    valueCellStyle,
} from '@stories/overview/theme/tokens/components/spacing-section/SpacingSection.styles.ts'
import { toPx } from '@stories/overview/theme/tokens/components/spacing-section/utils/toPx.ts'

export const SpacingSection = () => (
    <TokenSection
        title={'Spacing'}
        subtitle={"Spacing scale based on a 4 px grid, used for padding, margin and gap."}
    >
        <div style={listStyle}>
            {(Object.entries(space) as [string, string][]).map(([name, value]) => {
                const px = toPx(value)
                return (
                    <div key={name} style={rowStyle}>
                        <span style={nameStyle}>{name}</span>
                        {value !== '0'
                            ? <div style={barStyle(value)} />
                            : <span style={emptyBarStyle}>{'—'}</span>
                        }
                        <div style={valueCellStyle}>
                            <p style={remValueStyle}>{value}</p>
                            {px !== null && <p style={pxValueStyle}>{px}</p>}
                        </div>
                        <CopyBadge value={value} />
                    </div>
                )
            })}
        </div>
    </TokenSection>
)
