import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AvatarGroup } from '@components/data-display/avatar-group'

describe('AvatarGroup.Item', () => {
    it('works independently, forwarding its ref and accessible name', () => {
        const ref = createRef<HTMLSpanElement>()
        render(<AvatarGroup.Item ref={ref} aria-label="Jane Doe" initials="JD" />)
        expect(ref.current).toBe(screen.getByLabelText('Jane Doe'))
        expect(screen.getByText('JD')).toBeTruthy()
    })
})
