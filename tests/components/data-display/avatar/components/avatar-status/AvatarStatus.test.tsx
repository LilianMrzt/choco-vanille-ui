import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import AvatarStatus from '@components/data-display/avatar/components/avatar-status/AvatarStatus.tsx'
import { AVATAR_STATUS_STYLES } from '@components/data-display/avatar/components/avatar-status/styles/AvatarStatus.css.ts'
import type {
    AvatarSize,
    AvatarStatus as AvatarStatusType,
} from '@components/data-display/avatar/types/Avatar.types.ts'

const STATUSES: AvatarStatusType[] = ['online', 'offline', 'busy', 'away']
const SIZES: AvatarSize[] = ['sm', 'md', 'lg', 'xl']

describe('AvatarStatus', () => {
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
