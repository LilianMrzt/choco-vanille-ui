import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import {
    Avatar,
    AVATAR_STYLES,
    type AvatarColor,
    type AvatarShape,
    type AvatarSize,
    type AvatarStatus,
} from '@components/data-display/avatar'
import { AvatarGroup } from '@components/data-display/avatar-group'

beforeAll(() => {
    addIcon('lucide:user', {
        body: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        width: 24,
        height: 24,
    })
})

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('Avatar', () => {
    describe('default rendering', () => {
        it('renders a <span> element by default', () => {
            const { container } = render(<Avatar initials={'JD'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('span')
        })

        it('renders initials fallback', () => {
            render(<Avatar initials={'JD'} />)
            expect(screen.getByText('JD')).toBeTruthy()
        })

        it('truncates initials to two characters', () => {
            render(<Avatar initials={'John'} />)
            expect(screen.getByText('JO')).toBeTruthy()
        })

        it('renders an icon fallback when no initials are provided', () => {
            const { container } = render(<Avatar />)
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })

        it('renders a custom icon fallback', () => {
            const { container } = render(<Avatar icon={'lucide:user'} />)
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })

        it('renders a fallback when the image has not loaded', () => {
            const { container } = render(
                <Avatar src={'/avatar.png'} alt={'User'} initials={'U'} />,
            )
            expect(container.querySelector('img')).toBeFalsy()
            expect(screen.getByText('U')).toBeTruthy()
        })
    })

    describe('variant styling', () => {
        const sizes: AvatarSize[] = ['sm', 'md', 'lg', 'xl']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<Avatar size={size} initials={'A'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => AVATAR_STYLES.recipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })

        const shapes: AvatarShape[] = ['circle', 'square']

        it.each(shapes)('applies a non-empty class for shape="%s"', (shape) => {
            const { container } = render(<Avatar shape={shape} initials={'A'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each shape', () => {
            const classNames = shapes.map((shape) => AVATAR_STYLES.recipe({ shape }))
            expect(new Set(classNames).size).toBe(shapes.length)
        })
    })

    describe('color styling', () => {
        const colors: AvatarColor[] = [
            'primary',
            'secondary',
            'destructive',
            'success',
            'warning',
            'info',
            'purple',
            'pink',
            'orange',
            'teal',
            'cyan',
            'indigo',
        ]

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(<Avatar color={color} initials={'A'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) => AVATAR_STYLES.recipe({ color }))
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('status indicator', () => {
        const statuses: AvatarStatus[] = ['online', 'offline', 'busy', 'away']

        it.each(statuses)(
            'renders a status indicator for status="%s"',
            (status) => {
                const { container } = render(<Avatar status={status} initials={'A'} />)
                expect(
                    container.querySelectorAll('span').length,
                ).toBeGreaterThanOrEqual(2)
            },
        )

        it.each(statuses)(
            'exposes the status value as an accessible label by default for status="%s"',
            (status) => {
                render(<Avatar status={status} initials={'A'} />)
                expect(screen.getByRole('status').getAttribute('aria-label')).toBe(
                    status,
                )
            },
        )

        it('uses a custom accessible status label when provided', () => {
            render(
                <Avatar
                    status={'online'}
                    statusLabel={'En ligne'}
                    initials={'A'}
                />,
            )
            expect(screen.getByRole('status').getAttribute('aria-label')).toBe(
                'En ligne',
            )
        })
    })

    describe('accessible name', () => {
        it('forwards aria-label to the root element', () => {
            const { container } = render(
                <Avatar aria-label={'John Doe'} initials={'JD'} />,
            )
            expect(getFirstChild(container).getAttribute('aria-label')).toBe(
                'John Doe',
            )
        })

        it('forwards role to the root element', () => {
            const { container } = render(
                <Avatar role={'button'} initials={'JD'} />,
            )
            expect(getFirstChild(container).getAttribute('role')).toBe('button')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Avatar className={'my-custom-class'} initials={'A'} />,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<Avatar initials={'A'} />)
            for (const cls of AVATAR_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLSpanElement>()
            render(<Avatar ref={ref} initials={'A'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "Avatar"', () => {
            expect(Avatar.displayName).toBe('Avatar')
        })
    })
})

describe('AvatarGroup', () => {
    it('renders all avatars by default', () => {
        render(
            <AvatarGroup>
                <Avatar initials="A" />
                <Avatar initials="B" />
                <Avatar initials="C" />
            </AvatarGroup>,
        )
        expect(screen.getByText('A')).toBeTruthy()
        expect(screen.getByText('B')).toBeTruthy()
        expect(screen.getByText('C')).toBeTruthy()
    })

    it('truncates avatars when max is provided', () => {
        render(
            <AvatarGroup max={2}>
                <Avatar initials="A" />
                <Avatar initials="B" />
                <Avatar initials="C" />
                <Avatar initials="D" />
            </AvatarGroup>,
        )
        expect(screen.getByText('A')).toBeTruthy()
        expect(screen.getByText('B')).toBeTruthy()
        expect(screen.queryByText('C')).toBeFalsy()
        expect(screen.queryByText('D')).toBeFalsy()
        expect(screen.getByText('+2')).toBeTruthy()
    })

    it('provides an accessible label for the overflow indicator', () => {
        render(
            <AvatarGroup max={2}>
                <Avatar initials="A" />
                <Avatar initials="B" />
                <Avatar initials="C" />
                <Avatar initials="D" />
            </AvatarGroup>,
        )
        expect(screen.getByLabelText('2 more')).toBeTruthy()
    })

    it('supports a custom overflow label for i18n', () => {
        render(
            <AvatarGroup
                max={2}
                overflowLabel={(count) => `${count} de plus`}
            >
                <Avatar initials="A" />
                <Avatar initials="B" />
                <Avatar initials="C" />
                <Avatar initials="D" />
            </AvatarGroup>,
        )
        expect(screen.getByLabelText('2 de plus')).toBeTruthy()
    })

    it('forwards the ref to the underlying DOM node', () => {
        const ref = createRef<HTMLDivElement>()
        render(
            <AvatarGroup ref={ref}>
                <Avatar initials="A" />
            </AvatarGroup>,
        )
        expect(ref.current).toBeTruthy()
        expect(ref.current!.tagName.toLowerCase()).toBe('div')
    })

    it('has displayName set to "AvatarGroup"', () => {
        expect(AvatarGroup.displayName).toBe('AvatarGroup')
    })
})
