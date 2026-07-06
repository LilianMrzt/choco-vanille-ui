import { describe, expect, it } from 'vitest'
import { isValidElement, type ReactElement } from 'react'

import { createIconChildUtils } from '@utils/createIconChildUtils.ts'

const Icon = () => <span>icon</span>
const { hasIconChild, extractIconChild } = createIconChildUtils(Icon)

const Dummy = () => <span>dummy</span>

describe('hasIconChild', () => {
    it('returns false for empty children', () => {
        expect(hasIconChild(null)).toBe(false)
        expect(hasIconChild(undefined)).toBe(false)
        expect(hasIconChild([])).toBe(false)
    })

    it('returns false for primitive children', () => {
        expect(hasIconChild('text')).toBe(false)
        expect(hasIconChild(42)).toBe(false)
        expect(hasIconChild(true)).toBe(false)
    })

    it('returns false for non-icon React elements', () => {
        expect(hasIconChild(<Dummy />)).toBe(false)
        expect(hasIconChild(<div>content</div>)).toBe(false)
    })

    it('returns true when the icon component is present', () => {
        expect(hasIconChild(<Icon />)).toBe(true)
    })

    it('returns true when the icon component is mixed with other children', () => {
        expect(
            hasIconChild([
                <Icon key="icon" />,
                <span key="text">content</span>,
            ]),
        ).toBe(true)
    })
})

describe('extractIconChild', () => {
    it('returns null node and empty remaining for empty children', () => {
        const { node, remaining } = extractIconChild(null)

        expect(node).toBeNull()
        expect(remaining).toEqual([])
    })

    it('returns null node and original remaining when no icon is present', () => {
        const { node, remaining } = extractIconChild([
            <Dummy key="dummy" />,
            <span key="text">content</span>,
        ])

        expect(node).toBeNull()
        expect(remaining).toHaveLength(2)
    })

    it('extracts the icon and keeps the remaining children', () => {
        const { node, remaining } = extractIconChild([
            <Icon key="icon" />,
            <span key="text">content</span>,
        ])

        expect(isValidElement(node)).toBe(true)
        expect((node as ReactElement).type).toBe(Icon)
        expect(remaining).toHaveLength(1)
    })

    it('only extracts the first icon when multiple are present', () => {
        const { node, remaining } = extractIconChild([
            <Icon key="icon1" />,
            <Icon key="icon2" />,
            <span key="text">content</span>,
        ])

        expect(isValidElement(node)).toBe(true)
        expect((node as ReactElement).type).toBe(Icon)
        expect(remaining).toHaveLength(2)
    })
})
