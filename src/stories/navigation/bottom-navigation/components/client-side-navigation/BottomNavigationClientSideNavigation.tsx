import { useState } from 'react'
import { BottomNavigation } from '@components/navigation/bottom-navigation'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomNavigationClientSideNavigation />
 */
const BottomNavigationClientSideNavigation = () => {
    const [route, setRoute] = useState('home')

    return (
        <div style={{ width: '100%' }}>
            <BottomNavigation
                aria-label={'Application navigation'}
                value={route}
            >
                <BottomNavigation.List>
                    <BottomNavigation.Item
                        value={'home'}
                        label={'Home'}
                        icon={CircleIcon}
                        href={'/'}
                        onClick={() => setRoute('home')}
                    />
                    <BottomNavigation.Item
                        value={'search'}
                        label={'Search'}
                        icon={SearchIcon}
                        href={'/search'}
                        onClick={() => setRoute('search')}
                    />
                    <BottomNavigation.Item
                        value={'profile'}
                        label={'Profile'}
                        icon={UserIcon}
                        href={'/profile'}
                        onClick={() => setRoute('profile')}
                    />
                </BottomNavigation.List>
            </BottomNavigation>
            <p
                style={{
                    margin: '0.75rem 0 0',
                    textAlign: 'center',
                }}
            >
                Current route: /{route}
            </p>
        </div>
    )
}

export default BottomNavigationClientSideNavigation
