import { CIRCLE_ICON as CircleIcon, SEARCH_ICON as SearchIcon, USER_ICON as UserIcon } from '@constants/icon-registry'
import { BottomNavigation } from '@components/navigation/bottom-navigation'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomNavigationCustomHeights />
 */
const BottomNavigationCustomHeights = () => (
    <div
        style={{
            display: 'grid',
            gap: '1rem',
            width: '100%',
        }}
    >
        <BottomNavigation
            aria-label={'Compact navigation'}
            defaultValue={'home'}
        >
            <BottomNavigation.List>
                <BottomNavigation.Item
                    value={'home'}
                    label={'Home'}
                    icon={CircleIcon}
                    href={'/'}
                    height={'3rem'}
                />
                <BottomNavigation.Item
                    value={'search'}
                    label={'Search'}
                    icon={SearchIcon}
                    href={'/search'}
                    height={'3rem'}
                />
                <BottomNavigation.Item
                    value={'profile'}
                    label={'Profile'}
                    icon={UserIcon}
                    href={'/profile'}
                    height={'3rem'}
                />
            </BottomNavigation.List>
        </BottomNavigation>
        <BottomNavigation
            aria-label={'Roomy navigation'}
            defaultValue={'home'}
        >
            <BottomNavigation.List>
                <BottomNavigation.Item
                    value={'home'}
                    label={'Home'}
                    icon={CircleIcon}
                    href={'/'}
                    height={'4.5rem'}
                />
                <BottomNavigation.Item
                    value={'search'}
                    label={'Search'}
                    icon={SearchIcon}
                    href={'/search'}
                    height={'4.5rem'}
                />
                <BottomNavigation.Item
                    value={'profile'}
                    label={'Profile'}
                    icon={UserIcon}
                    href={'/profile'}
                    height={'4.5rem'}
                />
            </BottomNavigation.List>
        </BottomNavigation>
    </div>
)

export default BottomNavigationCustomHeights
