import { BottomNavigation } from '@components/navigation/bottom-navigation'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

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
