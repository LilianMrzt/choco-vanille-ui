import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

import legendMeta from '@stories/forms/primitives/legend/Legend.stories'
import LegendPlayground from '@stories/forms/primitives/legend/components/legend-playground/LegendPlayground'

describe('Legend stories', () => {
    it('forwards controls to the first legend and names the fieldset', async () => {
        const user = userEvent.setup()
        const { rerender } = render(<LegendPlayground>Notification preferences</LegendPlayground>)
        const group = screen.getByRole('group', { name: 'Notification preferences' })
        const legend = group.querySelector('legend')

        expect(group.firstElementChild).toBe(legend)
        expect(legend?.textContent).toBe('Notification preferences')
        await user.click(screen.getByRole('checkbox', { name: 'Email' }))
        expect(screen.getByRole<HTMLInputElement>('checkbox', { name: 'Email' }).checked).toBe(true)

        rerender(<LegendPlayground color="rebeccapurple" variant="h3">Delivery options</LegendPlayground>)
        const updatedGroup = screen.getByRole('group', { name: 'Delivery options' })
        expect(updatedGroup.firstElementChild?.tagName).toBe('LEGEND')
        expect(updatedGroup.firstElementChild?.getAttribute('style')).toContain('rebeccapurple')
    })

    it('generates public consumer JSX from the current legend args', () => {
        const source = legendMeta.parameters.docs.source.transform('', {
            args: { children: 'Email "alerts"', color: 'rebeccapurple' },
        })

        expect(source).toContain("import { Fieldset, Legend } from '@choco-vanille/ui'")
        expect(source).toContain('color={"rebeccapurple"}')
        expect(source).toContain('{"Email \\"alerts\\""}')
        expect(source).toContain('value="email"')
        expect(source).toContain('value="sms"')
        const result = ts.transpileModule(source, {
            fileName: 'consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))).toEqual([])
    })
})
