import type { ReactElement } from 'react'
import { Drawer } from '@components/overlay/drawer'
import UserIcon from '@resources/asset/UserIcon.svg?react'
import { APPEARANCE_COLORS, APPEARANCE_VARIANTS } from '@stories/overlay/drawer/constants'

/**
 * Compares every item variant and color at one consistent drawer size.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Navigation and action comparisons grouped by variant.
 * @example <DrawerAppearance />
 */
const DrawerAppearance = (): ReactElement => (
    <section style={{ width: '100%', minWidth: 0 }}>
        <h3>Variants and colors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1rem' }}>
            {APPEARANCE_VARIANTS.map((variant) => (
                <Drawer
                    key={variant}
                    defaultOpen
                    mode={'inline'}
                    size={'full'}
                >
                    <Drawer.Header title={`${variant} items`} />
                    <Drawer.Body>
                        <Drawer.Section title={'Navigation'}>
                            {APPEARANCE_COLORS.map((color) => (
                                <Drawer.NavItem
                                    key={color}
                                    color={color}
                                    href={'#'}
                                    label={`Navigate ${variant} ${color}`}
                                    startIcon={UserIcon}
                                    variant={variant}
                                    onClick={(event) => event.preventDefault()}
                                />
                            ))}
                        </Drawer.Section>
                        <Drawer.Section title={'Actions'}>
                            {APPEARANCE_COLORS.map((color) => (
                                <Drawer.ActionItem
                                    key={color}
                                    color={color}
                                    label={`Run ${variant} ${color}`}
                                    startIcon={UserIcon}
                                    variant={variant}
                                />
                            ))}
                        </Drawer.Section>
                    </Drawer.Body>
                </Drawer>
            ))}
        </div>
    </section>
)

export default DrawerAppearance
