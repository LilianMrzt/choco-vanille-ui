import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TextFieldStartIcon from '@components/forms/text-field/components/text-field-start-icon/TextFieldStartIcon.tsx'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

describe('TextFieldStartIcon', () => {
    it('renders an icon', () => {
        render(<TextFieldStartIcon icon={SearchIcon} size={'md'} />)
        expect(document.querySelector('svg')).toBeTruthy()
    })

    it('has the expected displayName', () => {
        expect(TextFieldStartIcon.displayName).toBe('TextField.StartIcon')
    })
})
