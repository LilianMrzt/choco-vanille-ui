import { CIRCLE_ICON as CircleIcon, SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { BottomNavigation } from '@components/navigation/bottom-navigation'

/**
 * Demonstrates uncontrolled navigation selection.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A navigation landmark.
 * @example
 * <BottomNavigationUncontrolled />
 */
const BottomNavigationUncontrolled = () => (
    <BottomNavigation
        aria-label={'Primary navigation'}
        defaultValue={'home'}
    >
        <BottomNavigation.List>
            <BottomNavigation.Item
                value={'home'}
                label={'Home'}
                icon={CircleIcon}
            />
            <BottomNavigation.Item
                value={'search'}
                label={'Search'}
                icon={SearchIcon}
            />
        </BottomNavigation.List>
    </BottomNavigation>
)

export default BottomNavigationUncontrolled
