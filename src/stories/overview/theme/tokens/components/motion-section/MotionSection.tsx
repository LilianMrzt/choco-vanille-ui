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
            subtitle={'Animation tokens: durations and easing curves for consistent transitions.'}
        >
            <div style={contentStyle}>
                <div style={subGroupStyle}>
                    <h3 style={subGroupTitleStyle}>{'Duration'}</h3>
                    <div style={durationListStyle}>
                        {(Object.entries(duration) as [string, string][]).map(([name, value]) => (
                            <div
                                key={name}
                                style={durationRowStyle}
                            >
                                <span style={durationNameStyle}>{name}</span>
                                <span style={durationValueStyle}>{value}</span>
                                <div style={durationBarStyle(value)} />
                                <CopyBadge value={value} />
                            </div>
                        ))}
                    </div>
                </div>

                <div style={subGroupStyle}>
                    <h3 style={subGroupTitleStyle}>{'Easing — click a card to preview the animation'}</h3>
                    <div style={gridStyle}>
                        {(Object.entries(easing) as [string, string][]).map(([name, value]) => (
                            <div key={name}>
                                <TokenCard
                                    name={`easing.${name}`}
                                    value={value}
                                    preview={
                                        <button
                                            onClick={() => triggerAnimation(name)}
                                            style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer' }}
                                            aria-label={`Preview ${name} easing animation`}
                                        >
                                            <div style={easingTrackStyle}>
                                                <div style={easingDotStyle(animating === name, value)} />
                                            </div>
                                        </button>
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
