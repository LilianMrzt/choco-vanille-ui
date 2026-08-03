import { createRef } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    EmptyState,
    EMPTY_STATE_STYLES,
} from '@components/feedback/empty-state'

describe('EmptyState', () => {
    it('renders the title and description with semantic elements', () => {
        const { getByRole, getByText } = render(
            <EmptyState
                title={'No results'}
                description={'Try another search.'}
            />,
        )

        expect(getByRole('heading', { level: 2 }).textContent).toBe('No results')
        expect(getByText('Try another search.').tagName.toLowerCase()).toBe('p')
    })

    it('renders the optional action when provided', () => {
        const { getByRole } = render(
            <EmptyState
                title={'No results'}
                description={'Try another search.'}
                action={<button type={'button'}>Clear filters</button>}
            />,
        )

        expect(getByRole('button', { name: 'Clear filters' })).toBeTruthy()
    })

    it('omits the action container when no action is provided', () => {
        const { container } = render(
            <EmptyState title={'No results'} description={'Try another search.'} />,
        )

        expect(
            container.querySelector(`.${EMPTY_STATE_STYLES.action}`),
        ).toBeNull()
    })

    it('forwards className and ref to the root element', () => {
        const ref = createRef<HTMLDivElement>()
        const { container } = render(
            <EmptyState
                ref={ref}
                title={'No results'}
                description={'Try another search.'}
                className={'custom-empty-state'}
            />,
        )

        expect(ref.current).toBe(container.firstElementChild)
        expect(ref.current?.classList.contains('custom-empty-state')).toBe(true)
    })
})
