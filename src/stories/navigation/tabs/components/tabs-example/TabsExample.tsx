import type { ReactElement } from 'react'

import { Tabs } from '@components/navigation/tabs'
import type { TabsStoryArgs } from '@stories/navigation/tabs/constants'

/**
 * Renders the example with root and slot controls.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and demonstration options.
 * @returns The tab example.
 * @example
 * <TabsExample {...args} />
 */
const TabsExample = ({ listVariant, listBordered, activationMode, billingDisabled, billingWidth, ...rootProps }: TabsStoryArgs): ReactElement => (
    <Tabs {...rootProps}>
        <Tabs.List
            aria-label={'User settings'}
            variant={listVariant}
            bordered={listBordered}
            activationMode={activationMode}
        >
            <Tabs.Trigger
                value={'account'}
                label={'Account'}
            />
            <Tabs.Trigger
                value={'password'}
                label={'Password'}
            />
            <Tabs.Trigger
                value={'billing'}
                label={'Billing'}
                disabled={billingDisabled}
                width={billingWidth || undefined}
            />
        </Tabs.List>
        <Tabs.Content value={'account'}>Account settings</Tabs.Content>
        <Tabs.Content value={'password'}>Password settings</Tabs.Content>
        <Tabs.Content value={'billing'}>Billing settings</Tabs.Content>
    </Tabs>
)

export default TabsExample
