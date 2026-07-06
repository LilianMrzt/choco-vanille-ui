import { render } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import TextFieldStartIcon from '@components/forms/text-field/components/text-field-start-icon/TextFieldStartIcon.tsx'

beforeAll(() => {
    addIcon('lucide:mail', {
        body: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
        width: 24,
        height: 24,
    })
})

describe('TextFieldStartIcon', () => {
    it('renders an icon', () => {
        render(<TextFieldStartIcon icon={'lucide:mail'} size={'md'} />)
        expect(document.querySelector('svg')).toBeTruthy()
    })

    it('has the expected displayName', () => {
        expect(TextFieldStartIcon.displayName).toBe('TextFieldStartIcon')
    })
})