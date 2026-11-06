import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/bottom-navigation/constants'
import sourceParentWidths from '@stories/navigation/bottom-navigation/sources/ParentWidths.source.tsx.txt?raw'
import sourceStates from '@stories/navigation/bottom-navigation/sources/States.source.tsx.txt?raw'
import sourceBordered from '@stories/navigation/bottom-navigation/sources/Bordered.source.tsx.txt?raw'
import sourceIconOnly from '@stories/navigation/bottom-navigation/sources/IconOnly.source.tsx.txt?raw'
import sourceCustomHeights from '@stories/navigation/bottom-navigation/sources/CustomHeights.source.tsx.txt?raw'
import sourceClientSideNavigation from '@stories/navigation/bottom-navigation/sources/ClientSideNavigation.source.tsx.txt?raw'
import BottomNavigationDocsPage from '@stories/navigation/bottom-navigation/components/docs-page/DocsPage'
import BottomNavigationUncontrolled from '@stories/navigation/bottom-navigation/components/uncontrolled/BottomNavigationUncontrolled'
import uncontrolledSource from '@stories/navigation/bottom-navigation/sources/Uncontrolled.source.tsx.txt?raw'
import type { BottomNavigationStoryArgs } from '@stories/navigation/bottom-navigation/types'
import BottomNavigationPlayground from '@stories/navigation/bottom-navigation/components/playground/BottomNavigationPlayground'
import BottomNavigationParentWidths from '@stories/navigation/bottom-navigation/components/parent-widths/BottomNavigationParentWidths'
import BottomNavigationStates from '@stories/navigation/bottom-navigation/components/states/BottomNavigationStates'
import BottomNavigationBordered from '@stories/navigation/bottom-navigation/components/bordered/BottomNavigationBordered'
import BottomNavigationIconOnly from '@stories/navigation/bottom-navigation/components/icon-only/BottomNavigationIconOnly'
import BottomNavigationCustomHeights from '@stories/navigation/bottom-navigation/components/custom-heights/BottomNavigationCustomHeights'
import BottomNavigationClientSideNavigation from '@stories/navigation/bottom-navigation/components/client-side-navigation/BottomNavigationClientSideNavigation'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { expect, userEvent, within } from 'storybook/test'

import { BottomNavigation } from '@components/navigation/bottom-navigation'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createBottomNavigationSource } from '@stories/navigation/bottom-navigation/utils/create-bottom-navigation-source/createBottomNavigationSource.utils'

const meta = {
    title: 'Navigation/BottomNavigation',
    component: BottomNavigation,
    parameters: {
        layout: 'centered',
        docs: {
            page: BottomNavigationDocsPage,
            source: { type: 'dynamic', transform: createBottomNavigationSource },
            description: {
                component: md /* language=markdown */ `
A mobile-first navigation landmark with a full-width, safe-area-aware bottom
surface. Compose it from \`BottomNavigation\`, \`BottomNavigation.List\`, and
\`BottomNavigation.Item\`. The component does not position itself, so place it
inside the fixed or sticky layout owned by the application. Items render as
native links when \`href\` is provided, or as buttons for application-owned
actions. Like \`Link\`, an item with both \`href\` and \`onClick\` prevents the
browser's default navigation, which makes it suitable for React Router's
\`useNavigate\`. The root fills its parent at \`100%\`; use \`width\` and
\`maxWidth\` on \`BottomNavigation.List\` to control the item row, and
\`gap\` to tune spacing between items. Set \`bordered\` when the navigation
needs a subtle top divider.

**Usage**

~~~tsx
import { useLocation, useNavigate } from 'react-router'

function MobileNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const value = location.pathname === '/search' ? 'search' : 'home'

  return (
    <div style={{ position: 'fixed', insetInline: 0, bottom: 0 }}>
      <BottomNavigation aria-label="Primary navigation" value={value}>
        <BottomNavigation.List>
          <BottomNavigation.Item
            value="home"
            label="Home"
            icon={CircleIcon}
            href="/"
            onClick={() => navigate('/')}
          />
          <BottomNavigation.Item
            value="search"
            label="Search"
            icon={SearchIcon}
            href="/search"
            onClick={() => navigate('/search')}
          />
          <BottomNavigation.Item
            value="profile"
            label="Profile"
            icon={UserIcon}
            href="/profile"
            onClick={() => navigate('/profile')}
          />
        </BottomNavigation.List>
      </BottomNavigation>
    </div>
  )
}
~~~
        `,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '100%',
                    minHeight: '12rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    margin: '0 auto',
                }}
            >
                <Story />
            </div>
        ),
    ],
} satisfies Meta<BottomNavigationStoryArgs>

export default meta

type Story = StoryObj<BottomNavigationStoryArgs>;

export const Playground: Story = {
    args: meta.args,
    render: BottomNavigationPlayground,
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use Controls to tune selection, list width and max width, spacing, styling, the first item label or accessible name, destination, height, and disabled state.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const homeItem = canvas.getByRole('link', { name: 'Home' })
        const searchItem = canvas.getByRole('link', { name: 'Search' })

        await expect(homeItem).toHaveAttribute('aria-current', 'page')
        await userEvent.click(searchItem)
        await expect(searchItem).toHaveAttribute('aria-current', 'page')
        await expect(homeItem).not.toHaveAttribute('aria-current')
    },
}

export const Uncontrolled: Story = {
    render: BottomNavigationUncontrolled,
    parameters: { docs: { ...storySource(uncontrolledSource), description: { story: 'The initial selection applies on mount.' } } },
}

export const ParentWidths: Story = {
    args: meta.args,
    render: BottomNavigationParentWidths,
    parameters: {
        docs: {
            description: {
                story:
                    'The navigation surface fills each parent at 100% width. The item row can be given its own width and max width; when the parent is wide, a smaller max width keeps the items centered instead of stretching across the whole viewport. The examples also show two list gap tokens.',
            },
            ...storySource(sourceParentWidths),
        },
    },
}

export const States: Story = {
    args: meta.args,
    render: BottomNavigationStates,
    parameters: {
        docs: {
            ...storySource(sourceStates),
        },
    },
}

export const Bordered: Story = {
    args: meta.args,
    render: BottomNavigationBordered,
    parameters: {
        docs: {
            description: {
                story:
                    'Opt into a subtle top divider when the navigation needs more separation from the content above it.',
            },
            ...storySource(sourceBordered),
        },
    },
}

export const IconOnly: Story = {
    args: meta.args,
    render: BottomNavigationIconOnly,
    parameters: {
        docs: {
            description: {
                story:
                    'Labels are optional. Icon-only items must provide an `aria-label` or `aria-labelledby` so their destination remains accessible.',
            },
            ...storySource(sourceIconOnly),
        },
    },
}

export const CustomHeights: Story = {
    args: meta.args,
    render: BottomNavigationCustomHeights,
    parameters: {
        docs: {
            description: {
                story:
                    'The item height can be adjusted independently for compact or more spacious mobile layouts.',
            },
            ...storySource(sourceCustomHeights),
        },
    },
}

export const ClientSideNavigation: Story = {
    args: meta.args,
    render: BottomNavigationClientSideNavigation,
    parameters: {
        docs: {
            description: {
                story:
                    'Uses href values as native-link fallbacks while an onClick handler owns client-side route changes, matching the React Router integration pattern.',
            },
            ...storySource(sourceClientSideNavigation),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const searchItem = canvas.getByRole('link', { name: 'Search' })

        await userEvent.click(searchItem)
        await expect(searchItem).toHaveAttribute('aria-current', 'page')
        await expect(
            canvas.getByText('Current route: /search'),
        ).toBeInTheDocument()
    },
}
