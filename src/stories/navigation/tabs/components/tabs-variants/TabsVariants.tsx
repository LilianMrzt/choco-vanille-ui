import type { ReactElement } from 'react'

import { Tabs } from '@components/navigation/tabs'

/**
 * Demonstrates tab list variants.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Tab examples.
 * @example
 * <TabsVariants />
 */
const TabsVariants = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
        {(['default', 'pills'] as const).map((variant) => (
            <Tabs
                key={variant}
                defaultValue={'account'}
            >
                <Tabs.List
                    aria-label={`${variant} settings`}
                    variant={variant}
                >
                    <Tabs.Trigger
                        value={'account'}
                        label={'Account'}
                    />
                    <Tabs.Trigger
                        value={'password'}
                        label={'Password'}
                    />
                </Tabs.List>
                <Tabs.Content value={'account'}>Account settings</Tabs.Content>
                <Tabs.Content value={'password'}>Password settings</Tabs.Content>
            </Tabs>
        ))}
    </div>
)

export default TabsVariants
