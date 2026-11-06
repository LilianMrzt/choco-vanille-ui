import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, userEvent, within } from 'storybook/test'
import {
    useState,
    type ComponentProps,
    type MouseEventHandler,
} from 'react'

import type { BoxSpace } from '@components/layout/box'
import { BottomNavigation } from '@components/navigation/bottom-navigation'
import CalendarIcon from '@resources/asset/CalendarIcon.svg?react'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'
import ListIcon from '@resources/asset/ListIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

type BottomNavigationStoryArgs = ComponentProps<typeof BottomNavigation> & {
    listClassName?: string
    listGap?: BoxSpace
    listWidth?: string
    listMaxWidth?: string
    itemLabel?: string
    itemShowLabel?: boolean
    itemAriaLabel?: string
    itemHref?: string
    itemHeight?: string
    itemDisabled?: boolean
    itemOnClick?: MouseEventHandler<HTMLAnchorElement>
}

const GAP_OPTIONS: BoxSpace[] = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128]

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| ---------------- | -------- | ---- | ----- |
| \`aria-label\` | Yes | \`string\` | Names the bottom navigation landmark. |
| \`width\` | Default | \`100%\` | The navigation surface fills its parent width. |
| \`bordered\` | No | \`boolean\` | Adds a theme-colored border to the top edge. Defaults to \`false\`. |
| \`value\` / \`defaultValue\` | No | \`string\` | Controlled or uncontrolled selected item value. |
| \`onValueChange\` | No | \`(value: string) => void\` | Called when an enabled item is selected. |
| \`BottomNavigation.List\` | Yes | Compound slot | Groups the navigation items in a list. |
| \`BottomNavigation.Item\` | Yes | Compound slot | Renders a link or button with an icon and optional label. |
| List \`width\` | No | \`CSSProperties['width']\` | Controls the item row width. Defaults to \`100%\`. |
| List \`maxWidth\` | No | \`CSSProperties['maxWidth']\` | Caps the item row width. Defaults to \`32rem\` and keeps it centered in wider parents. |
| List \`gap\` | No | \`BoxSpace\` | Controls the spacing between navigation items. Defaults to \`xxs\`. |
| \`href\` | Conditional | \`string\` | Renders an item as a native link. |
| \`onClick\` | No | Native mouse handler | Preserves the event and prevents native navigation when \`href\` is present, enabling client-side routers. |
| \`label\` | No | \`string\` | Visible label. Omit it for icon-only items. |
| Item \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required on icon-only items to provide an accessible name. |
| \`icon\` | Yes | \`IconComponent\` | Decorative icon shown in the navigation item. |
| \`height\` | No | \`CSSProperties['height']\` | Overrides the height of an individual item control. |
| \`aria-current\` | Automatic | \`"page"\` | Applied to the selected item. |
| \`disabled\` | No | \`boolean\` | Removes an item from interaction while keeping it visible. |

**Sub-components**

| Sub-component           | Description                                  |
| ----------------------- | -------------------------------------------- |
| \`BottomNavigation.List\` | Layout container for the items.              |
| \`BottomNavigation.Item\` | Link or button representing one destination. |
`

const BottomNavigationDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Navigation/BottomNavigation',
    component: BottomNavigation,
    parameters: {
        layout: 'centered',
        docs: {
            page: BottomNavigationDocsPage,
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
    argTypes: {
        'aria-label': { control: 'text' },
        'aria-labelledby': { control: 'text' },
        className: { control: 'text' },
        bordered: { control: 'boolean' },
        defaultValue: { control: 'text' },
        value: { control: 'text' },
        onValueChange: { action: 'value changed' },
        children: { control: false, table: { disable: true } },
        listClassName: {
            control: 'text',
            table: { category: 'Compound: List' },
        },
        listGap: {
            control: 'select',
            options: GAP_OPTIONS,
            table: { category: 'Compound: List' },
        },
        listWidth: {
            control: 'text',
            table: { category: 'Compound: List' },
        },
        listMaxWidth: {
            control: 'text',
            table: { category: 'Compound: List' },
        },
        itemLabel: {
            control: 'text',
            table: { category: 'Compound: Item' },
        },
        itemShowLabel: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
        itemAriaLabel: {
            control: 'text',
            table: { category: 'Compound: Item' },
        },
        itemHref: {
            control: 'text',
            table: { category: 'Compound: Item' },
        },
        itemHeight: {
            control: 'text',
            table: { category: 'Compound: Item' },
        },
        itemDisabled: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
        itemOnClick: {
            action: 'item clicked',
            table: { category: 'Compound: Item' },
        },
    },
    args: {
        'aria-label': 'Primary navigation',
        bordered: false,
        defaultValue: 'home',
        value: undefined,
        listClassName: '',
        listGap: 2,
        listWidth: '100%',
        listMaxWidth: '32rem',
        itemLabel: 'Home',
        itemShowLabel: true,
        itemAriaLabel: 'Home',
        itemHref: '/',
        itemHeight: '',
        itemDisabled: false,
    },
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
    render: ({
        listClassName,
        listGap,
        listWidth,
        listMaxWidth,
        itemLabel = 'Home',
        itemShowLabel = true,
        itemAriaLabel = 'Home',
        itemHref,
        itemHeight,
        itemDisabled,
        itemOnClick,
        value: controlledValue,
        defaultValue,
        onValueChange,
        ...args
    }) => {
        const [uncontrolledValue, setUncontrolledValue] = useState(
            defaultValue ?? 'home',
        )
        const selectedValue = controlledValue ?? uncontrolledValue
        const itemNameProps = itemShowLabel
            ? { label: itemLabel }
            : { 'aria-label': itemAriaLabel }
        const handleItemClick: MouseEventHandler<HTMLAnchorElement> = (
            event,
        ) => {
            itemOnClick?.(event)
        }

        return (
            <BottomNavigation
                {...args}
                value={selectedValue}
                onValueChange={(nextValue) => {
                    if (controlledValue === undefined) {
                        setUncontrolledValue(nextValue)
                    }
                    onValueChange?.(nextValue)
                }}
            >
                <BottomNavigation.List
                    className={listClassName || undefined}
                    gap={listGap}
                    width={listWidth || undefined}
                    maxWidth={listMaxWidth || undefined}
                >
                    <BottomNavigation.Item
                        {...itemNameProps}
                        value={'home'}
                        icon={CircleIcon}
                        href={itemHref || '/'}
                        height={itemHeight || undefined}
                        disabled={itemDisabled}
                        onClick={handleItemClick}
                    />
                    <BottomNavigation.Item
                        value={'search'}
                        label={'Search'}
                        icon={SearchIcon}
                        href={'/search'}
                        height={itemHeight || undefined}
                        onClick={handleItemClick}
                    />
                    <BottomNavigation.Item
                        value={'calendar'}
                        label={'Calendar'}
                        icon={CalendarIcon}
                        href={'/calendar'}
                        height={itemHeight || undefined}
                        onClick={handleItemClick}
                    />
                    <BottomNavigation.Item
                        value={'profile'}
                        label={'Profile'}
                        icon={UserIcon}
                        href={'/profile'}
                        height={itemHeight || undefined}
                        onClick={handleItemClick}
                    />
                </BottomNavigation.List>
            </BottomNavigation>
        )
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use Controls to tune selection, list width and max width, spacing, styling, the first item label or accessible name, destination, height, and disabled state.',
            },
            ...storySource(/* language=tsx */ `
<BottomNavigation aria-label="Primary navigation" defaultValue="home">
  <BottomNavigation.List gap={2} width="100%" maxWidth="32rem">
    <BottomNavigation.Item value="home" label="Home" icon={CircleIcon} href="/" />
    <BottomNavigation.Item value="search" label="Search" icon={SearchIcon} href="/search" />
    <BottomNavigation.Item value="calendar" label="Calendar" icon={CalendarIcon} href="/calendar" />
    <BottomNavigation.Item value="profile" label="Profile" icon={UserIcon} href="/profile" />
  </BottomNavigation.List>
</BottomNavigation>`),
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

export const ParentWidths: Story = {
    args: meta.args,
    render: () => (
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
    ),
    parameters: {
        docs: {
            description: {
                story:
                    'The navigation surface fills each parent at 100% width. The item row can be given its own width and max width; when the parent is wide, a smaller max width keeps the items centered instead of stretching across the whole viewport. The examples also show two list gap tokens.',
            },
            ...storySource(/* language=tsx */ `
<div style={{ width: '20rem', maxWidth: '100%', marginInline: 'auto' }}>
  <BottomNavigation aria-label="Narrow parent navigation" defaultValue="home">
    <BottomNavigation.List gap={8} width="100%" maxWidth="100%">
      <BottomNavigation.Item value="home" label="Home" icon={CircleIcon} href="/" />
      <BottomNavigation.Item value="search" label="Search" icon={SearchIcon} href="/search" />
      <BottomNavigation.Item value="profile" label="Profile" icon={UserIcon} href="/profile" />
    </BottomNavigation.List>
  </BottomNavigation>
</div>
<div style={{ width: '48rem', maxWidth: '100%', marginInline: 'auto' }}>
  <BottomNavigation aria-label="Wide parent navigation" defaultValue="home">
    <BottomNavigation.List gap={16} width="100%" maxWidth="40rem">
      <BottomNavigation.Item value="home" label="Home" icon={CircleIcon} href="/" />
      <BottomNavigation.Item value="search" label="Search" icon={SearchIcon} href="/search" />
      <BottomNavigation.Item value="profile" label="Profile" icon={UserIcon} href="/profile" />
    </BottomNavigation.List>
  </BottomNavigation>
</div>`),
        },
    },
}

export const States: Story = {
    args: meta.args,
    render: () => (
        <BottomNavigation
            aria-label={'Account navigation'}
            defaultValue={'home'}
        >
            <BottomNavigation.List>
                <BottomNavigation.Item
                    value={'home'}
                    label={'Home'}
                    icon={CircleIcon}
                    href={'/'}
                />
                <BottomNavigation.Item
                    value={'activity'}
                    label={'Activity'}
                    icon={ListIcon}
                    href={'/activity'}
                    disabled
                />
                <BottomNavigation.Item
                    value={'profile'}
                    label={'Profile'}
                    icon={UserIcon}
                />
            </BottomNavigation.List>
        </BottomNavigation>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<BottomNavigation aria-label={'Account navigation'} defaultValue={'home'}>
  <BottomNavigation.List>
    <BottomNavigation.Item value={'home'} label={'Home'} icon={CircleIcon} href={'/'} />
    <BottomNavigation.Item value={'activity'} label={'Activity'} icon={ListIcon} href={'/activity'} disabled />
    <BottomNavigation.Item value={'profile'} label={'Profile'} icon={UserIcon} />
  </BottomNavigation.List>
</BottomNavigation>`),
        },
    },
}

export const Bordered: Story = {
    args: meta.args,
    render: () => (
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
    ),
    parameters: {
        docs: {
            description: {
                story:
                    'Opt into a subtle top divider when the navigation needs more separation from the content above it.',
            },
            ...storySource(/* language=tsx */ `
<BottomNavigation aria-label="Bordered navigation" defaultValue="home" bordered>
  <BottomNavigation.List>
    <BottomNavigation.Item value="home" label="Home" icon={CircleIcon} href="/" />
    <BottomNavigation.Item value="search" label="Search" icon={SearchIcon} href="/search" />
    <BottomNavigation.Item value="profile" label="Profile" icon={UserIcon} href="/profile" />
  </BottomNavigation.List>
</BottomNavigation>`),
        },
    },
}

export const IconOnly: Story = {
    args: meta.args,
    render: () => (
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
    ),
    parameters: {
        docs: {
            description: {
                story:
                    'Labels are optional. Icon-only items must provide an `aria-label` or `aria-labelledby` so their destination remains accessible.',
            },
            ...storySource(/* language=tsx */ `
<BottomNavigation aria-label={'Icon-only navigation'} defaultValue={'home'}>
  <BottomNavigation.List>
    <BottomNavigation.Item value={'home'} aria-label={'Home'} icon={CircleIcon} href={'/'} />
    <BottomNavigation.Item value={'search'} aria-label={'Search'} icon={SearchIcon} href={'/search'} />
    <BottomNavigation.Item value={'profile'} aria-label={'Profile'} icon={UserIcon} href={'/profile'} />
  </BottomNavigation.List>
</BottomNavigation>`),
        },
    },
}

export const CustomHeights: Story = {
    args: meta.args,
    render: () => (
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
    ),
    parameters: {
        docs: {
            description: {
                story:
                    'The item height can be adjusted independently for compact or more spacious mobile layouts.',
            },
            ...storySource(/* language=tsx */ `
<BottomNavigation aria-label="Compact navigation" defaultValue="home">
  <BottomNavigation.List>
    <BottomNavigation.Item value="home" label="Home" icon={CircleIcon} href="/" height="3rem" />
    <BottomNavigation.Item value="search" label="Search" icon={SearchIcon} href="/search" height="3rem" />
    <BottomNavigation.Item value="profile" label="Profile" icon={UserIcon} href="/profile" height="3rem" />
  </BottomNavigation.List>
</BottomNavigation>
<BottomNavigation aria-label="Roomy navigation" defaultValue="home">
  <BottomNavigation.List>
    <BottomNavigation.Item value="home" label="Home" icon={CircleIcon} href="/" height="4.5rem" />
    <BottomNavigation.Item value="search" label="Search" icon={SearchIcon} href="/search" height="4.5rem" />
    <BottomNavigation.Item value="profile" label="Profile" icon={UserIcon} href="/profile" height="4.5rem" />
  </BottomNavigation.List>
</BottomNavigation>`),
        },
    },
}

export const ClientSideNavigation: Story = {
    args: meta.args,
    render: () => {
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
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Uses href values as native-link fallbacks while an onClick handler owns client-side route changes, matching the React Router integration pattern.',
            },
            ...storySource(/* language=tsx */ `
<BottomNavigation aria-label="Application navigation" value={activeValue}>
  <BottomNavigation.List>
    <BottomNavigation.Item value="home" label="Home" icon={CircleIcon} href="/" onClick={() => navigate('/')} />
    <BottomNavigation.Item value="search" label="Search" icon={SearchIcon} href="/search" onClick={() => navigate('/search')} />
    <BottomNavigation.Item value="profile" label="Profile" icon={UserIcon} href="/profile" onClick={() => navigate('/profile')} />
  </BottomNavigation.List>
</BottomNavigation>`),
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
