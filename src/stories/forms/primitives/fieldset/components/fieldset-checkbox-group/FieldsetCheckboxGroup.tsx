import { Checkbox } from '@components/forms/checkbox'
import { Fieldset } from '@components/forms/primitives/fieldset'
import { Flex } from '@components/layout/flex'
import { Legend } from '@components/forms/primitives/legend'
import type { ReactElement } from 'react'

/**
 * Demonstrates a fieldset containing independently selectable checkboxes.
 * @internal Not part of the public package API.
 * @returns A named checkbox group.
 * @example
 * <FieldsetCheckboxGroup />
 */
const FieldsetCheckboxGroup = (): ReactElement => (
    <Fieldset>
        <Legend>Notification preferences</Legend>
        <Flex
            alignItems={'start'}
            flexDirection={'column'}
            gap={8}
        >
            <Checkbox
                defaultChecked
                label={'Email'}
            />
            <Checkbox label={'Push'} />
            <Checkbox label={'SMS'} />
        </Flex>
    </Fieldset>
)

export default FieldsetCheckboxGroup
