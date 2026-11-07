import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NotificationCard, type NotificationCardVariant } from '@components/feedback/notification-card'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import { ICON_STYLES } from '@components/foundation/icon/Icon.css'
import { BOX_STYLES } from '@components/layout/box/Box.css'
import { VARIANT_TO_BORDER_COLOR } from '@components/feedback/notification-card/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

// Suites

describe('NotificationCardIcon', () => {
    describe('default rendering', () => {
        it('uses a small SVG and compact padding by default', () => {
            const { container } = render(<NotificationCard.Icon />)
            const svg = container.querySelector('svg')
            for (const className of ICON_STYLES.recipe({ size: 'sm' }).split(' ')) {
                expect(svg?.getAttribute('class')).toContain(className)
            }
            for (const className of BOX_STYLES.recipe({ padding: 6, borderRadius: 6 }).split(' ')) {
                expect(svg?.parentElement?.parentElement?.className).toContain(className)
            }
        })

        it('preserves explicit size overrides', () => {
            const { container } = render(<NotificationCard.Icon size={'lg'} />)
            for (const className of ICON_STYLES.recipe({ size: 'lg' }).split(' ')) {
                expect(container.querySelector('svg')?.getAttribute('class')).toContain(className)
            }
        })

        it('renders an SVG icon using the default info variant', () => {
            const { container } = render(<NotificationCard.Icon />)
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders an SVG when a custom icon is supplied', () => {
            const { container } = render(<NotificationCard.Icon icon={CheckIcon} />)
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('variant context', () => {
        const variants: NotificationCardVariant[] = ['info', 'success', 'warning', 'danger']
        const borderColors = {
            info: vars.color.info.subtleHover,
            success: vars.color.success.subtleHover,
            warning: vars.color.warning.subtleHover,
            danger: vars.color.danger.subtleHover,
        }

        it.each(variants)('matches the outlined-subtle badge border for %s', (variant) => {
            const { container } = render(
                <NotificationCard variant={variant}>
                    <NotificationCard.Icon />
                </NotificationCard>,
            )
            const wrapper = container.querySelector('svg')?.parentElement?.parentElement
            expect(VARIANT_TO_BORDER_COLOR[variant]).toBe(borderColors[variant])
            expect(wrapper?.style.borderColor).toBe(borderColors[variant])
            expect(wrapper?.style.borderStyle).toBe('solid')
            expect(wrapper?.style.borderTopWidth).toBe('1px')
            expect(wrapper?.style.borderRightWidth).toBe('1px')
            expect(wrapper?.style.borderBottomWidth).toBe('1px')
            expect(wrapper?.style.borderLeftWidth).toBe('1px')
        })

        it.each(variants)(
            'renders an SVG for the "%s" variant via the NotificationCard root',
            (variant) => {
                const { container } = render(
                    <NotificationCard variant={variant}>
                        <NotificationCard.Icon />
                    </NotificationCard>,
                )
                expect(container.querySelector('svg')).toBeTruthy()
            },
        )
    })

    describe('wrapper appearance', () => {
        it('preserves explicit border and surface overrides on the same wrapper', () => {
            const { container } = render(
                <NotificationCard.Icon
                    backgroundColor={'#f3e8ff'}
                    borderColor={'#7c3aed'}
                    borderRadius={10}
                    borderStyle={'dashed'}
                    borderWidth={'2px'}
                    padding={4}
                />,
            )
            const wrapper = container.querySelector('svg')?.parentElement?.parentElement
            expect(wrapper?.style.backgroundColor).toBe('rgb(243, 232, 255)')
            expect(wrapper?.style.borderColor).toBe('rgb(124, 58, 237)')
            expect(wrapper?.style.borderStyle).toBe('dashed')
            expect(wrapper?.style.borderTopWidth).toBe('2px')
            expect(wrapper?.style.borderRightWidth).toBe('2px')
            expect(wrapper?.style.borderBottomWidth).toBe('2px')
            expect(wrapper?.style.borderLeftWidth).toBe('2px')
            for (const className of BOX_STYLES.recipe({ padding: 4, borderRadius: 10 }).split(' ')) {
                expect(wrapper?.className).toContain(className)
            }
        })

        it('allows the decorative border to be removed', () => {
            const { container } = render(<NotificationCard.Icon borderWidth={0} />)
            const wrapper = container.querySelector('svg')?.parentElement?.parentElement
            expect(wrapper?.style.borderTopWidth).toBe('0px')
            expect(wrapper?.style.borderRightWidth).toBe('0px')
            expect(wrapper?.style.borderBottomWidth).toBe('0px')
            expect(wrapper?.style.borderLeftWidth).toBe('0px')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className onto the SVG element', () => {
            const { container } = render(<NotificationCard.Icon className={'my-icon'} />)
            // className is applied to the SVG.
            // SVGElement.className is SVGAnimatedString — use getAttribute.
            expect(container.querySelector('svg')!.getAttribute('class')).toContain(
                'my-icon',
            )
        })
    })

    describe('displayName', () => {
        it('is set to "NotificationCard.Icon"', () => {
            expect(NotificationCard.Icon.displayName).toBe('NotificationCard.Icon')
        })
    })
})
