import { useState } from 'react'

import { duration, easing } from '@theme/tokens/motion.ts'

import { CopyBadge } from '@stories/overview/theme/tokens/components/copy-badge/CopyBadge.tsx'
import { TokenCard } from '@stories/overview/theme/tokens/components/token-card/TokenCard.tsx'
import { gridStyle } from '@stories/overview/theme/tokens/components/token-card/TokenCard.styles.ts'
import { TokenSection } from '@stories/overview/theme/tokens/components/token-section/TokenSection.tsx'
import {
    contentStyle,
    durationBarStyle,
    durationListStyle,
    durationNameStyle,
    durationRowStyle,
    durationValueStyle,
    easingDotStyle,
    easingTrackStyle,
    subGroupStyle,
    subGroupTitleStyle,
} from '@stories/overview/theme/tokens/components/motion-section/MotionSection.styles.ts'

export const MotionSection = () => {
    const [animating, setAnimating] = useState<string | null>(null)

    const triggerAnimation = (key: string) => {
        setAnimating(null)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setAnimating(key))
        })
    }

    return (
        <TokenSection
            title={'Motion'}
            subtitle={"Tokens d'animation : durées et courbes d'accélération pour des transitions cohérentes."}
        >
            <div style={contentStyle}>
                <div style={subGroupStyle}>
                    <h3 style={subGroupTitleStyle}>{'Duration'}</h3>
                    <div style={durationListStyle}>
                        {(Object.entries(duration) as [string, string][]).map(([name, value]) => (
                            <div key={name} style={durationRowStyle}>
                                <span style={durationNameStyle}>{name}</span>
                                <span style={durationValueStyle}>{value}</span>
                                <div style={durationBarStyle(value)} />
                                <CopyBadge value={value} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={subGroupStyle}>
                    <h3 style={subGroupTitleStyle}>{'Easing — cliquez sur une carte pour animer'}</h3>
                    <div style={gridStyle}>
                        {(Object.entries(easing) as [string, string][]).map(([name, value]) => (
                            <div
                                key={name}
                                role={'button'}
                                tabIndex={0}
                                onClick={() => triggerAnimation(name)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { triggerAnimation(name) } }}
                                style={{ cursor: 'pointer' }}
                            >
                                <TokenCard
                                    name={`easing.${name}`}
                                    value={value}
                                    preview={
                                        <div style={easingTrackStyle}>
                                            <div style={easingDotStyle(animating === name, value)} />
                                        </div>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TokenSection>
    )
}
