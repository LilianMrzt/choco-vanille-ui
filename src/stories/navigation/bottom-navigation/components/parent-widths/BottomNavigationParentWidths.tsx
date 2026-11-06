import { BottomNavigation } from '@components/navigation/bottom-navigation'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomNavigationParentWidths />
 */
const BottomNavigationParentWidths = () => (
    <div
        style={{
            display: 'grid',
            gap: '1rem',
            width: '100%',
            maxWidth: '48rem',
        }}
    >
        <div>
            <p
                style={{
                    margin: '0 0 0.5rem',
                    textAlign: 'center',
                }}
            >
                Narrow parent · 20rem
            </p>
            <div
                style={{
                    width: '20rem',
                    maxWidth: '100%',
                    marginInline: 'auto',
                }}
            >
                <BottomNavigation
                    aria-label={'Narrow parent navigation'}
                    defaultValue={'home'}
                >
                    <BottomNavigation.List
                        gap={8}
                        width={'100%'}
                        maxWidth={'100%'}
                    >
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
            </div>
        </div>
        <div>
            <p
                style={{
                    margin: '0 0 0.5rem',
                    textAlign: 'center',
                }}
            >
                Wide parent · 48rem
            </p>
            <div
                style={{
                    width: '48rem',
                    maxWidth: '100%',
                    marginInline: 'auto',
                }}
            >
                <BottomNavigation
                    aria-label={'Wide parent navigation'}
                    defaultValue={'home'}
                >
                    <BottomNavigation.List
                        gap={16}
                        width={'100%'}
                        maxWidth={'40rem'}
                    >
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
            </div>
        </div>
    </div>
)

export default BottomNavigationParentWidths
