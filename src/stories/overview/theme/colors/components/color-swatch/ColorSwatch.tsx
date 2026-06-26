import { useState } from 'react'
import {colorSwatchStyles} from "@stories/overview/theme/colors/components/color-swatch/ColorSwatch.styles.ts";
import type {ColorSwatchProps} from "@stories/overview/theme/colors/components/color-swatch/types";


export function ColorSwatch({ name, value, dark = false }: ColorSwatchProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        })
    }

    return (
        <div
            style={colorSwatchStyles.wrapper()}
            onClick={handleCopy}
            title={`Cliquer pour copier : ${value}`}
        >
            <div
                style={colorSwatchStyles.swatch(value, dark)}
                onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = dark
                        ? '0 4px 12px rgba(0,0,0,0.5)'
                        : '0 4px 12px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = dark
                        ? '0 1px 3px rgba(0,0,0,0.4)'
                        : '0 1px 3px rgba(0,0,0,0.08)'
                }}
            />
            <p style={colorSwatchStyles.tokenLabel(dark)}>{name}</p>
            <p style={colorSwatchStyles.valueLabel(dark)}>{value}</p>
            <span style={colorSwatchStyles.badge(copied)}>{copied ? '✓ copié' : ''}</span>
        </div>
    )
}

