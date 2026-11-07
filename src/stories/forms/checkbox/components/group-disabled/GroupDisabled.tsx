import { CheckboxGroup } from '@components/forms/checkbox-group'

/**
 * Shows a disabled group and its parent checkbox.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A disabled group.
 * @example
 * <GroupDisabled />
 */
const GroupDisabled = () => (
    <CheckboxGroup
        disabled
        aria-label={'Notifications'}
        allValues={['email']}
    >
        <CheckboxGroup.Header label={'All notifications'} />
        <CheckboxGroup.Item
            value={'email'}
            label={'Email'}
        />
    </CheckboxGroup>
)

export default GroupDisabled
