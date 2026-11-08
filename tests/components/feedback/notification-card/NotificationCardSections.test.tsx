import { CHECK_ICON as CheckIcon } from '@constants/icon-registry'
import { createRef } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { NotificationCard } from '@components/feedback/notification-card'

describe('NotificationCard sections', () => {
    it('does not inject an icon into compound headers, even when the root has an icon prop', () => {
        render(
            <NotificationCard icon={CheckIcon}>
                <NotificationCard.Header>
                    <NotificationCard.Title>Text only</NotificationCard.Title>
                </NotificationCard.Header>
            </NotificationCard>,
        )
        expect(screen.getByRole('status').querySelector('svg')).toBeNull()
    })

    it('keeps the manually composed icon in the chosen header position', () => {
        render(
            <NotificationCard>
                <NotificationCard.Header data-testid={'header'}>
                    <NotificationCard.Title>Saved</NotificationCard.Title>
                    <NotificationCard.Icon icon={CheckIcon} />
                </NotificationCard.Header>
            </NotificationCard>,
        )
        const header = screen.getByTestId('header')
        expect(header.children).toHaveLength(2)
        expect(header.children[0]).toBe(screen.getByText('Saved'))
        expect(header.children[1].querySelector('svg')).toBeTruthy()
    })

    it('keeps icon, title and close in Header, description in Body, and actions in Footer', async () => {
        const onClose = vi.fn()
        const onAction = vi.fn()
        render(
            <NotificationCard>
                <NotificationCard.Header data-testid={'header'}>
                    <NotificationCard.Icon />
                    <NotificationCard.Title>Saved</NotificationCard.Title>
                    <NotificationCard.Close
                        aria-label={'Dismiss'}
                        onClick={onClose}
                    />
                </NotificationCard.Header>
                <NotificationCard.Body data-testid={'body'}>
                    <NotificationCard.Description>Changes are up to date.</NotificationCard.Description>
                </NotificationCard.Body>
                <NotificationCard.Footer data-testid={'footer'}>
                    <NotificationCard.Actions><button onClick={onAction}>Undo</button></NotificationCard.Actions>
                </NotificationCard.Footer>
            </NotificationCard>,
        )

        const header = screen.getByTestId('header')
        const body = screen.getByTestId('body')
        const footer = screen.getByTestId('footer')
        expect(Array.from(screen.getByRole('status').children)).toEqual([header, body, footer])
        expect(within(header).getByText('Saved')).toBeTruthy()
        expect(header.querySelectorAll('svg')).toHaveLength(2)
        expect(within(body).getByText('Changes are up to date.')).toBeTruthy()
        await userEvent.click(within(header).getByRole('button', { name: 'Dismiss' }))
        await userEvent.click(within(footer).getByRole('button', { name: 'Undo' }))
        expect(onClose).toHaveBeenCalledTimes(1)
        expect(onAction).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('banner')).toBeNull()
        expect(screen.queryByRole('contentinfo')).toBeNull()
    })

    it.each([
        ['Header', NotificationCard.Header],
        ['Body', NotificationCard.Body],
        ['Footer', NotificationCard.Footer],
    ] as const)('forwards native attributes, events, styles and refs for %s', async (_name, Section) => {
        const ref = createRef<HTMLDivElement>()
        const onClick = vi.fn()
        render(
            <Section
                aria-label={'Section'}
                className={'custom-section'}
                data-testid={'section'}
                onClick={onClick}
                ref={ref}
                style={{ padding: 3 }}
            >
                <button>Content</button>
            </Section>,
        )
        const section = screen.getByTestId('section')
        expect(ref.current).toBe(section)
        expect(section.tagName).toBe('DIV')
        expect(section.className).toContain('custom-section')
        expect(section.getAttribute('aria-label')).toBe('Section')
        expect(section.style.padding).toBe('3px')
        await userEvent.click(screen.getByRole('button', { name: 'Content' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('uses the same sections for the convenience layout', () => {
        render(<NotificationCard
            description={'Details'}
            onClose={vi.fn()}
            title={'Saved'}
        />)
        const root = screen.getByRole('status')
        expect(root.children).toHaveLength(2)
        expect(root.children[0].contains(screen.getByText('Saved'))).toBe(true)
        expect(root.children[0].contains(screen.getByRole('button', { name: 'Close notification' }))).toBe(true)
        expect(root.children[0].querySelectorAll('svg')).toHaveLength(2)
        expect(root.children[1].contains(screen.getByText('Details'))).toBe(true)
    })
})
