import { CIRCLE_ICON as CircleIcon, LIST_ICON as ListIcon, USER_ICON as UserIcon } from '@constants/icon-registry'
import { BottomNavigation } from '@components/navigation/bottom-navigation'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomNavigationStates />
 */
const BottomNavigationStates = () => (
    <BottomNavigation
        aria-label={'Account navigation'}
        defaultValue={'home'}
    >
        <BottomNavigation.List>
            <BottomNavigation.Item
                value={'home'}
                label={'Home'}
                icon={CircleIcon}
                href={'/'}
            />
            <BottomNavigation.Item
                value={'activity'}
                label={'Activity'}
                icon={ListIcon}
                href={'/activity'}
                disabled
            />
            <BottomNavigation.Item
                value={'profile'}
                label={'Profile'}
                icon={UserIcon}
            />
        </BottomNavigation.List>
    </BottomNavigation>
)

export default BottomNavigationStates
