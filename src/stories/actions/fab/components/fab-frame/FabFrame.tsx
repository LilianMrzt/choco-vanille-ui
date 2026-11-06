import type { CSSProperties, FC, ReactNode } from 'react'

const FRAME_STYLE: CSSProperties = {
    position: 'relative',
    transform: 'translateZ(0)',
    height: '8rem',
    minWidth: '10rem',
    flex: '1 1 10rem',
    border: '1px dashed currentColor',
    borderRadius: '0.5rem',
}

/**
 * Contains fixed-position examples within a preview frame.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Frame contents.
 * @param props.children - Example to display.
 * @returns The example frame.
 * @example
 * <FabFrame><Fab icon={SearchIcon} aria-label="Search" /></FabFrame>
 */
const FabFrame: FC<Readonly<{ children: ReactNode }>> = ({ children }) => (
    <div style={FRAME_STYLE}>{children}</div>
)

export default FabFrame
