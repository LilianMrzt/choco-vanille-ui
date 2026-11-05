import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Avatar, AVATAR_STATUS_STYLES, type AvatarSize, type AvatarStatus as AvatarStatusType, type AvatarStatusProps } from '@components/data-display/avatar'

const { Root: AvatarRoot, Status: AvatarStatus } = Avatar

const STATUSES: AvatarStatusType[] = ['online', 'offline', 'busy', 'away']
const SIZES: AvatarSize[] = ['sm', 'md', 'lg', 'xl']

describe('AvatarStatus', () => {
    it('forwards the status span ref, native events, consumer overrides and explicit ARIA', () => {
        const ref = createRef<HTMLSpanElement>()
        const onClick = vi.fn()
        const props: AvatarStatusProps = { ref, onClick, label: 'Generated label', status: 'busy', size: 'lg', style: { width: '24px', backgroundColor: 'pink' } }
        render(<Avatar.Root><Avatar.Status {...props} aria-label="Custom presence" data-testid="presence" /></Avatar.Root>)
        const presence = screen.getByRole('status', { name: 'Custom presence' })
        expect(ref.current).toBe(presence)
        expect(presence.tagName).toBe('SPAN')
        expect(presence.style.position).toBe('absolute')
        expect(presence.style.width).toBe('24px')
        expect(presence.style.height).toBe('0.75rem')
        expect(presence.style.backgroundColor).toBe('pink')
        expect(presence.hasAttribute('label')).toBe(false)
        expect(presence.hasAttribute('status')).toBe(false)
        expect(presence.hasAttribute('size')).toBe(false)
        fireEvent.click(presence)
        expect(onClick.mock.calls[0][0].target).toBe(presence)
    })

    describe('default rendering', () => {
        it('renders a <span> with role="status"', () => {
            render(<AvatarRoot><AvatarStatus /></AvatarRoot>)
            expect(screen.getByRole('status')).toBeTruthy()
        })

        it('defaults aria-label to the status value', () => {
            render(<AvatarRoot><AvatarStatus status="online" /></AvatarRoot>)
            expect(screen.getByRole('status').getAttribute('aria-label')).toBe('online')
        })
    })

    describe('status prop', () => {
        it.each(STATUSES)('renders for status="%s"', (status) => {
            render(<AvatarRoot><AvatarStatus status={status} /></AvatarRoot>)
            const el = screen.getByRole('status')
            expect(el.getAttribute('aria-label')).toBe(status)
        })

        it('produces distinct class names for each status', () => {
            const classes = STATUSES.map((status) => AVATAR_STATUS_STYLES.recipe({ status }))
            expect(new Set(classes).size).toBe(STATUSES.length)
        })
    })

    describe('size prop', () => {
        it.each(SIZES)('renders for size="%s"', (size) => {
            const { container } = render(<AvatarRoot><AvatarStatus size={size} /></AvatarRoot>)
            expect(container.querySelector('[role="status"]')).toBeTruthy()
        })

        it('produces distinct class names for each size', () => {
            const classes = SIZES.map((size) => AVATAR_STATUS_STYLES.recipe({ size }))
            expect(new Set(classes).size).toBe(SIZES.length)
        })
    })

    describe('label prop', () => {
        it('uses the custom label as aria-label', () => {
            render(<AvatarRoot><AvatarStatus status="online" label="En ligne" /></AvatarRoot>)
            expect(screen.getByRole('status').getAttribute('aria-label')).toBe('En ligne')
        })

        it('falls back to the status value when no label is given', () => {
            render(<AvatarRoot><AvatarStatus status="busy" /></AvatarRoot>)
            expect(screen.getByRole('status').getAttribute('aria-label')).toBe('busy')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <AvatarRoot><AvatarStatus className="my-status" /></AvatarRoot>,
            )
            expect(container.querySelector('.my-status')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <AvatarRoot><AvatarStatus data-testid="status-indicator" /></AvatarRoot>,
            )
            expect(container.querySelector('[data-testid="status-indicator"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Avatar.Status"', () => {
            expect(AvatarStatus.displayName).toBe('Avatar.Status')
        })
    })
})
