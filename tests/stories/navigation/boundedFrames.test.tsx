import { render } from '@testing-library/react'
import { isValidElement } from 'react'
import { describe, expect, it } from 'vitest'

const modules = import.meta.glob<Record<string, unknown>>('/src/stories/{overlay,navigation,surfaces}/**/*.stories.tsx', { eager: true })

describe('Bounded overlay, navigation and surface story frames', () => {
    for (const [filename, module] of Object.entries(modules)) {
        it(`${filename} bounds its desktop frame and permits local scrolling`, () => {
            const meta = module.default
            if (typeof meta !== 'object' || meta === null || !('decorators' in meta) || !Array.isArray(meta.decorators)) {
                throw new TypeError('A bounded story-frame decorator is required')
            }
            const decorator: unknown = meta.decorators[0]
            if (typeof decorator !== 'function') {
                throw new TypeError('The frame decorator must be callable')
            }
            const element: unknown = decorator(() => <span>Example</span>)
            if (!isValidElement(element)) {
                throw new TypeError('The frame must render a React element')
            }
            const { container } = render(element)
            const frame = container.firstElementChild
            if (!(frame instanceof HTMLElement)) {
                throw new TypeError('The story frame must be an HTML element')
            }

            const expected = document.createElement('div')
            const desktopWidth = filename.includes('/bottom-navigation/') ? '48rem' : '40rem'
            expected.style.width = `min(${desktopWidth}, calc(100vw - 2rem))`
            expect(frame.style.width).toBe(expected.style.width)
            expect(frame.style.maxWidth).toBe('100%')
            expect(frame.style.minWidth).toBe('0px')
            expect(frame.style.overflowX).toBe('auto')
        })
    }
})
