import { createRef, forwardRef, type SVGProps } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SvgImage } from '@components/layout/svg-image'

const TestSvg = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    (props, ref) => (
        <svg ref={ref} viewBox="0 0 24 24" {...props}>
            <circle cx="12" cy="12" r="10" />
        </svg>
    ),
)

TestSvg.displayName = 'TestSvg'

describe('SvgImage', () => {
    describe('default rendering', () => {
        it('renders the provided SVG component', () => {
            const { container } = render(<SvgImage image={TestSvg} />)
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('marks an unnamed SVG as decorative', () => {
            const { container } = render(<SvgImage image={TestSvg} />)
            expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
                'true',
            )
        })
    })

    describe('accessibility', () => {
        it('uses alt text as an accessible image name', () => {
            render(<SvgImage image={TestSvg} alt="A test illustration" />)
            expect(
                screen.getByRole('img', { name: 'A test illustration' }),
            ).toBeTruthy()
        })

        it('uses aria-label as an accessible image name', () => {
            render(<SvgImage image={TestSvg} aria-label="A labeled illustration" />)
            expect(
                screen.getByRole('img', { name: 'A labeled illustration' }),
            ).toBeTruthy()
        })

        it('keeps an empty alt decorative', () => {
            const { container } = render(<SvgImage image={TestSvg} alt="" />)
            expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
                'true',
            )
        })
    })

    describe('styles and attributes', () => {
        it('applies image dimensions as inline styles', () => {
            render(
                <SvgImage
                    image={TestSvg}
                    width="100px"
                    height="200px"
                    data-testid="svg-image"
                />,
            )
            const svg = screen.getByTestId('svg-image')
            expect(svg.style.width).toBe('100px')
            expect(svg.style.height).toBe('200px')
        })

        it('merges a custom className and forwards attributes', () => {
            render(
                <SvgImage
                    image={TestSvg}
                    className="custom-svg-image"
                    data-testid="svg-image"
                />,
            )
            const svg = screen.getByTestId('svg-image')
            expect(svg.getAttribute('class')).toContain('custom-svg-image')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying SVG node', () => {
            const ref = createRef<SVGSVGElement>()
            render(<SvgImage image={TestSvg} ref={ref} />)
            expect(ref.current?.tagName.toLowerCase()).toBe('svg')
        })
    })

    describe('displayName', () => {
        it('is set to "SvgImage"', () => {
            expect(SvgImage.displayName).toBe('SvgImage')
        })
    })
})
