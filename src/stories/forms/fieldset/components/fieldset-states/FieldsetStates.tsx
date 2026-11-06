import { Checkbox } from '@components/forms/checkbox'
import { Fieldset } from '@components/forms/fieldset'
import { Flex } from '@components/layout/flex'
import { Legend } from '@components/forms/legend'
import type { ReactElement } from 'react'

/**
 * Compares enabled and disabled fieldsets.
 * @internal Not part of the public package API.
 * @returns Two named fieldsets.
 * @example
 * <FieldsetStates />
 */
const FieldsetStates = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={12}
    >
        <Fieldset>
            <Legend>Enabled group</Legend>
            <Checkbox label={'Email'} />
        </Fieldset>
        <Fieldset disabled>
            <Legend>Disabled group</Legend>
            <Checkbox
                disabled
                label={'Push'}
            />
        </Fieldset>
    </Flex>
)

export default FieldsetStates
