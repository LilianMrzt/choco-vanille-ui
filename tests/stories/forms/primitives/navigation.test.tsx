import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import fieldsetMeta from '@stories/forms/primitives/fieldset/Fieldset.stories'
import formMeta from '@stories/forms/primitives/form/Form.stories'
import formLabelMeta from '@stories/forms/primitives/form-label/FormLabel.stories'
import helperTextMeta from '@stories/forms/primitives/helper-text/HelperText.stories'
import legendMeta from '@stories/forms/primitives/legend/Legend.stories'
import Introduction from '@stories/overview/introduction/components/introduction/Introduction'

describe('Form primitives Storybook navigation', () => {
    it('groups primitive stories and links to their documentation', () => {
        render(<Introduction />)

        for (const [name, meta] of [
            ['Fieldset', fieldsetMeta],
            ['Form', formMeta],
            ['FormLabel', formLabelMeta],
            ['HelperText', helperTextMeta],
            ['Legend', legendMeta],
        ] as const) {
            expect(meta.title).toBe(`Forms/Primitives/${name}`)
            expect(screen.getByRole('link', { name }).getAttribute('href'))
                .toBe(`./?path=/docs/forms-primitives-${name.toLowerCase()}--docs`)
        }
    })
})
