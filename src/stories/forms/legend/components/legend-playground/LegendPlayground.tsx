import { Fieldset } from '@components/layout/fieldset'
import { Legend } from '@components/forms/legend'
import type { ComponentProps, ReactElement } from 'react'

/**
 * Shows a legend naming a group of native checkboxes.
 * @internal Not part of the public package API.
 * @param props - Props forwarded to the legend.
 * @returns A named fieldset.
 * @example
 * <LegendPlayground>Notifications</LegendPlayground>
 */
const LegendPlayground = (props: ComponentProps<typeof Legend>): ReactElement => (
    <Fieldset>
        <Legend {...props} />
        <label>
            <input
                name={'notifications'}
                type={'checkbox'}
                value={'email'}
            /> Email
        </label>
        {' '}
        <label>
            <input
                name={'notifications'}
                type={'checkbox'}
                value={'sms'}
            /> SMS
        </label>
    </Fieldset>
)

export default LegendPlayground
