import { useState } from 'react'
import { Button } from '@components/actions/button'
import { Drawer } from '@components/overlay/drawer'

/**
 * Demonstrates a drawer that owns its open state.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A trigger and an uncontrolled drawer.
 * @example
 * <DrawerUncontrolled />
 */
const DrawerUncontrolled = () => {
    const [mounted, setMounted] = useState(false)

    return (
        <>
            <Button
                label={'Open uncontrolled drawer'}
                onClick={() => setMounted(true)}
            />
            {mounted && (
                <Drawer
                    defaultOpen
                    onOpenChange={(open) => {
                        if (!open) {
                            setMounted(false)
                        }
                    }}
                >
                    <Drawer.Header title={'Navigation'} />
                    <Drawer.Body>Press Escape to close.</Drawer.Body>
                </Drawer>
            )}
        </>
    )
}

export default DrawerUncontrolled
