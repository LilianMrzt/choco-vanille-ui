import { RadioGroup } from '@components/forms/radio-group'
import { Fieldset } from '@components/layout/fieldset'
import { Legend } from '@components/forms/legend'
import type { FieldsetPlaygroundArgs } from '@stories/layout/fieldset/types'
import type { ReactElement } from 'react'

/**
 * Demonstrates a named group of radio buttons.
 * @internal Not part of the public package API.
 * @param props - Native fieldset attributes and the demonstration legend.
 * @param props.legend - Text shown in the legend and used as the radio group name.
 * @param props.children - Ignored; this example supplies its own controls.
 * @returns An interactive fieldset.
 * @example
 * <FieldsetPlayground legend="Choose a plan" />
 */
const FieldsetPlayground = ({ legend, children: _children, ...props }: FieldsetPlaygroundArgs): ReactElement => (
    <Fieldset {...props}>
        <Legend>{legend}</Legend>
        <RadioGroup
            aria-label={legend}
            defaultValue={'starter'}
            disabled={props.disabled}
        >
            <RadioGroup.Item
                label={'Starter'}
                value={'starter'}
            />
            <RadioGroup.Item
                label={'Pro'}
                value={'pro'}
            />
            <RadioGroup.Item
                label={'Enterprise'}
                value={'enterprise'}
            />
        </RadioGroup>
    </Fieldset>
)

export default FieldsetPlayground
