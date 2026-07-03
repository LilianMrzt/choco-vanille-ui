import { CopyBadge } from '@stories/overview/theme/tokens/components/copy-badge/CopyBadge.tsx'
import type { TokenCardProps } from '@stories/overview/theme/tokens/components/token-card/types'
import {
    cardStyle,
    nameStyle,
    valueRowStyle,
    valueStyle,
} from '@stories/overview/theme/tokens/components/token-card/TokenCard.styles.ts'

export const TokenCard = ({ name, value, preview }: TokenCardProps) => (
    <div style={cardStyle}>
        <p style={nameStyle}>{name}</p>
        {preview}
        <div style={valueRowStyle}>
            <p
                style={valueStyle}
                title={value}
            >{value}</p>
            <CopyBadge value={value} />
        </div>
    </div>
)
