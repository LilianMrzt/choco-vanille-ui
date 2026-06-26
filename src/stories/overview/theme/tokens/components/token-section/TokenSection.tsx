import type { TokenSectionProps } from '@stories/overview/theme/tokens/components/token-section/types'
import {
    headerStyle,
    sectionStyle,
    subtitleStyle,
    titleStyle,
} from '@stories/overview/theme/tokens/components/token-section/TokenSection.styles.ts'

export const TokenSection = ({ title, subtitle, children }: TokenSectionProps) => (
    <section style={sectionStyle}>
        <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>
        {children}
    </section>
)
