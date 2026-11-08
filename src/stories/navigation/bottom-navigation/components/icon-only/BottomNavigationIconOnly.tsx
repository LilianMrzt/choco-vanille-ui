import { CIRCLE_ICON as CircleIcon, SEARCH_ICON as SearchIcon, USER_ICON as UserIcon } from '@constants/icon-registry'
import { BottomNavigation } from '@components/navigation/bottom-navigation'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomNavigationIconOnly />
 */
const BottomNavigationIconOnly = () => (
    <BottomNavigation
        aria-label={'Icon-only navigation'}
        defaultValue={'home'}
    >
        <BottomNavigation.List>
            <BottomNavigation.Item
                value={'home'}
                aria-label={'Home'}
                icon={CircleIcon}
                href={'/'}
            />
            <BottomNavigation.Item
                value={'search'}
                aria-label={'Search'}
                icon={SearchIcon}
                href={'/search'}
            />
            <BottomNavigation.Item
                value={'profile'}
                aria-label={'Profile'}
                icon={UserIcon}
                href={'/profile'}
            />
        </BottomNavigation.List>
    </BottomNavigation>
)

export default BottomNavigationIconOnly
