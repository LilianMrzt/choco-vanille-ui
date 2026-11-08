import { CALENDAR_ICON as CalendarIcon, CIRCLE_ICON as CircleIcon, SEARCH_ICON as SearchIcon, USER_ICON as UserIcon } from '@constants/icon-registry'
import { type MouseEventHandler } from 'react'
import { useArgs } from 'storybook/preview-api'
import { BottomNavigation } from '@components/navigation/bottom-navigation'
import type { BottomNavigationStoryArgs } from '@stories/navigation/bottom-navigation/types'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomNavigationPlayground />
 */
const BottomNavigationPlayground = () => {
    const [storyArgs, updateArgs] = useArgs<BottomNavigationStoryArgs>()
    const {
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
        value,
        defaultValue,
        onValueChange,
        ...args
    } = storyArgs
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
            value={value}
            defaultValue={defaultValue}
            onValueChange={(nextValue) => {
                onValueChange?.(nextValue)
                updateArgs({ value: nextValue })
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
}

export default BottomNavigationPlayground
