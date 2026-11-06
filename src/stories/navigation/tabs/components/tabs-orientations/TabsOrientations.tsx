import type { ReactElement } from 'react'

import { Tabs } from '@components/navigation/tabs'

/**
 * Demonstrates keyboard orientations.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Horizontal and vertical tab sets.
 * @example
 * <TabsOrientations />
 */
const TabsOrientations = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
        {(['horizontal', 'vertical'] as const).map((orientation) => (
            <Tabs
                key={orientation}
                orientation={orientation}
                defaultValue={'account'}
            >
                <Tabs.List aria-label={`${orientation} settings`}>
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

export default TabsOrientations
