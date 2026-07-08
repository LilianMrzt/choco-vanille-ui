import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Image from '@components/layout/image/Image.tsx'

const IMAGE_SRC = 'https://example.com/image.png'
const IMAGE_ALT = 'A test image'

describe('Image', () => {
    describe('default rendering', () => {
        it('renders an <img> element', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} />)
            expect(screen.getByRole('img')).toBeTruthy()
        })

        it('forwards src and alt attributes', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} />)
            const img = screen.getByRole('img')
            expect(img.getAttribute('src')).toBe(IMAGE_SRC)
            expect(img.getAttribute('alt')).toBe(IMAGE_ALT)
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} />)
            expect(screen.getByRole('img').className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} className="my-image" />)
            expect(screen.getByRole('img').className).toContain('my-image')
        })

        it('applies variant classes', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} objectFit="cover" borderRadius="md" />)
            expect(screen.getByRole('img').className.length).toBeGreaterThan(0)
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} data-testid="image" />)
            expect(screen.getByTestId('image')).toBeTruthy()
        })

        it('forwards loading attribute', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} loading="lazy" />)
            expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy')
        })

        it('forwards id attribute', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} id="my-image" />)
            expect(screen.getByRole('img').getAttribute('id')).toBe('my-image')
        })
    })

    describe('inline styles', () => {
        it('applies width and height styles', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} width="100px" height="200px" />)
            const img = screen.getByRole('img')
            expect(img.style.width).toBe('100px')
            expect(img.style.height).toBe('200px')
        })

        it('applies aspectRatio style', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} aspectRatio="16 / 9" />)
            expect(screen.getByRole('img').style.aspectRatio).toBe('16 / 9')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying <img> node', () => {
            const ref = createRef<HTMLImageElement>()
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} ref={ref} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('img')
        })
    })

    describe('displayName', () => {
        it('is set to "Image"', () => {
            expect(Image.displayName).toBe('Image')
        })
    })
})
