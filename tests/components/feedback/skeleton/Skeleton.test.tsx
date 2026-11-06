import { createRef } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton, SKELETON_STYLES, type SkeletonVariant } from '@components/feedback/skeleton'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Skeleton', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Skeleton />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('sets aria-hidden on the placeholder', () => {
            const { container } = render(<Skeleton />)
            expect(getFirstChild(container).getAttribute('aria-hidden')).toBe('true')
        })
    })

    describe('variant styling', () => {
        const variants: SkeletonVariant[] = ['circular', 'rectangular', 'rounded']

        it.each(variants)('applies a non-empty class for variant="%s"', (variant) => {
            const { container } = render(<Skeleton variant={variant} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('falls back to the rounded variant when none is provided', () => {
            const { container } = render(<Skeleton />)
            expect(getFirstChild(container).className).toContain(SKELETON_STYLES.recipe({ variant: 'rounded' }))
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) => SKELETON_STYLES.recipe({ variant }))
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<Skeleton className={'my-custom-class'} />)
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<Skeleton />)
            for (const cls of SKELETON_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Skeleton data-testid={'skeleton'} />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('skeleton')
        })
    })

    describe('dimension props', () => {
        it('applies width and height as inline styles', () => {
            const { container } = render(<Skeleton width={'10rem'} height={'2rem'} />)
            const element = getFirstChild(container)
            expect(element.style.width).toBe('10rem')
            expect(element.style.height).toBe('2rem')
        })

        it('merges width and height with any provided style', () => {
            const { container } = render(
                <Skeleton width={'10rem'} height={'2rem'} style={{ opacity: 0.5 }} />,
            )
            const element = getFirstChild(container)
            expect(element.style.width).toBe('10rem')
            expect(element.style.height).toBe('2rem')
            expect(element.style.opacity).toBe('0.5')
        })

        it('lets consumer styles override dimension props', () => {
            const { container } = render(
                <Skeleton width={'10rem'} height={'2rem'} style={{ width: '5rem', height: '1rem' }} />,
            )
            const element = getFirstChild(container)
            expect(element.style.width).toBe('5rem')
            expect(element.style.height).toBe('1rem')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Skeleton ref={ref} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('displayName', () => {
        it('is set to "Skeleton"', () => {
            expect(Skeleton.displayName).toBe('Skeleton')
        })
    })
})
