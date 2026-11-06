import { BottomNavigation } from '@components/navigation/bottom-navigation'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomNavigationBordered />
 */
const BottomNavigationBordered = () => (
    <BottomNavigation
        aria-label={'Bordered navigation'}
        defaultValue={'home'}
        bordered
    >
        <BottomNavigation.List>
            <BottomNavigation.Item
                value={'home'}
                label={'Home'}
                icon={CircleIcon}
                href={'/'}
            />
            <BottomNavigation.Item
                value={'search'}
                label={'Search'}
                icon={SearchIcon}
                href={'/search'}
            />
            <BottomNavigation.Item
                value={'profile'}
                label={'Profile'}
                icon={UserIcon}
                href={'/profile'}
            />
        </BottomNavigation.List>
    </BottomNavigation>
)

export default BottomNavigationBordered
