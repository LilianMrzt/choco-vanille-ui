import { createRef } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest'

import {
    Avatar,
    AVATAR_STYLES,
    type AvatarColor,
    type AvatarShape,
    type AvatarSize,
    type AvatarStatus,
    type AvatarVariant,
    type AvatarProps,
    type AvatarFallbackProps,
    type AvatarImageProps,
    type AvatarRootProps,
    type AvatarStatusProps,
} from '@components/data-display/avatar'
import { AvatarGroup } from '@components/data-display/avatar-group'
import UserIcon from '@resources/asset/UserIcon.svg?react'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Avatar', () => {
    it('exposes typed compound slots through the root namespace', () => {
        expectTypeOf(Avatar.Root).parameter(0).toEqualTypeOf<AvatarRootProps>()
        expectTypeOf(Avatar.Image).parameter(0).toEqualTypeOf<AvatarImageProps>()
        expectTypeOf(Avatar.Fallback).parameter(0).toEqualTypeOf<AvatarFallbackProps>()
        expectTypeOf(Avatar.Status).parameter(0).toEqualTypeOf<AvatarStatusProps>()
        expectTypeOf<AvatarProps['color']>().toEqualTypeOf<AvatarColor | undefined>()
        expectTypeOf<AvatarVariant>().toEqualTypeOf<'contained' | 'subtle' | 'outlined' | 'outlinedSubtle'>()
    })

    it('preserves native events, style precedence and custom prop filtering on its root', () => {
        const onClick = vi.fn()
        const ref = createRef<HTMLSpanElement>()
        render(
            <Avatar
                ref={ref}
                aria-label="Jane Doe"
                initials="JD"
                role="img"
                size="lg"
                shape="square"
                color="success"
                variant="outlined"
                status="online"
                className="consumer"
                data-testid="avatar"
                style={{ width: '50px' }}
                onClick={onClick}
            />,
        )
        const root = screen.getByRole('img', { name: 'Jane Doe' })
        expect(ref.current).toBe(root)
        expect(root.className).toContain('consumer')
        expect(ref.current?.style.width).toBe('50px')
        for (const attribute of ['initials', 'size', 'shape', 'color', 'variant', 'status']) {
            expect(root.hasAttribute(attribute)).toBe(false)
        }
        fireEvent.click(root)
        expect(onClick).toHaveBeenCalledOnce()
        expect(onClick.mock.calls[0][0].target).toBe(root)
    })

    it.each(['contained', 'subtle', 'outlined', 'outlinedSubtle'] as const)(
        'preserves the %s treatment while an image loads, succeeds, or fails',
        async (variant) => {
            const requests: HTMLImageElement[] = []
            const NativeImage = window.Image
            vi.spyOn(window, 'Image').mockImplementation(class extends NativeImage {
                constructor(width?: number, height?: number) {
                    super(width, height)
                    requests.push(this)
                }
            })
            const { container, rerender } = render(
                <Avatar src="/first.png" alt="Portrait" initials="JD" variant={variant} />,
            )
            const expected = AVATAR_STYLES.recipe({ size: 'md', shape: 'circle', color: 'primary', variant }).split(' ')
            const expectTreatment = (): void => {
                for (const className of expected) {
                    expect(getFirstChild(container).classList.contains(className)).toBe(true)
                }
            }

            expect(screen.getByText('JD')).toBeTruthy()
            expectTreatment()
            await act(async () => fireEvent.load(requests[0]))
            expect(screen.getByRole('img', { name: 'Portrait' })).toBeTruthy()
            expectTreatment()
            rerender(<Avatar src="/broken.png" alt="Portrait" initials="JD" variant={variant} />)
            await act(async () => fireEvent.error(requests[1]))
            expect(screen.getByText('JD')).toBeTruthy()
            expectTreatment()
            rerender(<Avatar src="" initials="JD" variant={variant} />)
            expectTreatment()
        },
    )

    it('uses the same default treatment as Badge', () => {
        const { container } = render(<Avatar initials="JD" />)
        const expected = AVATAR_STYLES.recipe({ size: 'md', shape: 'circle', color: 'primary', variant: 'outlinedSubtle' }).split(' ')
        for (const className of expected) {
            expect(getFirstChild(container).classList.contains(className)).toBe(true)
        }
    })

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
            const { container } = render(<Avatar icon={UserIcon} />)
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
            'danger',
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
                <Avatar status={'online'} statusLabel={'En ligne'} initials={'A'} />,
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
            const { container } = render(<Avatar role={'button'} initials={'JD'} />)
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
            <AvatarGroup max={2} overflowLabel={(count) => `${count} de plus`}>
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
