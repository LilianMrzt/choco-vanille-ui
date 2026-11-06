import { useState } from 'react'
import { Button } from '@components/actions/button'
import { Drawer, type DrawerSize } from '@components/overlay/drawer'

/**
 * Demonstrates a drawer width.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Example options.
 * @param props.size - Width preset.
 * @returns An independently controlled drawer.
 * @example
 * <DrawerSizeSample size="md" />
 */
const DrawerSizeSample = ({ size }: { size: DrawerSize }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Drawer
                open={open}
                onOpenChange={setOpen}
                mode={'portal'}
                size={size}
            >
                <Drawer.Body>
                    <div style={{ padding: '1rem' }}>
                        <strong>size: {size}</strong>
                    </div>
                </Drawer.Body>
            </Drawer>
            <Button
                label={size}
                variant={'outlined'}
                onClick={() => setOpen(true)}
            />
        </>
    )
}

export default DrawerSizeSample
