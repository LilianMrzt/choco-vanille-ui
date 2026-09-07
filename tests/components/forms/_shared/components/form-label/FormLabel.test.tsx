import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import { FORM_LABEL_STYLES } from '@components/forms/_shared/components/form-label/styles/FormLabel.css.ts'
import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/styles/Typography.css.ts'

describe('FormLabel', () => {
    it('renders selectable text with the shared label style', () => {
        render(<FormLabel id={'field-label'}>Name</FormLabel>)

        const label = screen.getByText('Name')

        expect(label.tagName.toLowerCase()).toBe('span')
        expect(label.id).toBe('field-label')
        expect(label.className).toContain(FORM_LABEL_STYLES.root)
        expect(FORM_LABEL_STYLES.root).toBe(TYPOGRAPHY_STYLES.recipe({ variant: 'label' }))
    })

    it('renders the disabled state and required indicator', () => {
        render(
            <FormLabel disabled required>
                Name
            </FormLabel>,
        )

        const label = screen.getByText('Name')

        expect(label.getAttribute('data-disabled')).toBe('')
        expect(label.querySelector('[aria-hidden="true"]')).toBeTruthy()
    })
})
