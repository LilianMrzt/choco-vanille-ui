import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Image from '@components/data-display/image/Image.tsx'
import { IMAGE_STYLES } from '@components/data-display/image/Image.css.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

const IMAGE_SRC = 'https://example.com/image.png'
const IMAGE_ALT = 'A test image'

describe('Image', () => {
    it('supports the complete numeric spacing scale for padding and margins', () => {
        for (const property of ['padding', 'margin'] as const) {
            expect(Object.keys(IMAGE_STYLES.recipe.classNames.variants[property]).filter(key => key !== 'auto'))
                .toEqual(Object.keys(vars.space))
        }
    })

    it('supports every radius token', () => {
        expect(Object.keys(IMAGE_STYLES.recipe.classNames.variants.borderRadius))
            .toEqual(Object.keys(vars.radius))
        render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} borderRadius={32} />)
        expect(screen.getByRole('img').className).toContain(
            IMAGE_STYLES.recipe({ borderRadius: 32 }),
        )
    })

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
        it('accepts external CSS background variables and lets consumer styles win', () => {
            const { rerender } = render(
                <Image src={IMAGE_SRC} alt={IMAGE_ALT} backgroundColor={'var(--app-image)'} />,
            )
            const image = screen.getByRole<HTMLImageElement>('img')
            expect(image.style.backgroundColor).toBe('var(--app-image)')
            expect(image.hasAttribute('backgroundColor')).toBe(false)
            rerender(
                <Image
                    src={IMAGE_SRC}
                    alt={IMAGE_ALT}
                    backgroundColor={'var(--app-image)'}
                    style={{ backgroundColor: 'red' }}
                />,
            )
            expect(image.style.backgroundColor).toBe('red')
        })

        it('applies a non-empty className', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} />)
            expect(screen.getByRole('img').className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} className="my-image" />)
            expect(screen.getByRole('img').className).toContain('my-image')
        })

        it('applies variant classes', () => {
            render(<Image src={IMAGE_SRC} alt={IMAGE_ALT} objectFit="cover" borderRadius={8} />)
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
