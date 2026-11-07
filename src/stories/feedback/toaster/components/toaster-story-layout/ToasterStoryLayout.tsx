import type { FC } from 'react'
import { createPortal } from 'react-dom'

import { ToasterProvider, type ToasterProviderProps } from '@components/feedback/toaster-provider'

/**
 * Wraps the Toaster story and mounts its viewports in the preview document body,
 * outside the Docs canvas's transformed and clipping containers.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Provider viewport configuration and story content.
 * @param props.children - Trigger controls displayed in the story canvas.
 * @returns The story and document-level notification viewports.
 * @example
 * <ToasterStoryLayout><Story /></ToasterStoryLayout>
 */
const ToasterStoryLayout: FC<ToasterProviderProps> = ({ children, ...props }) => (
    <>
        {children}
        {createPortal(<ToasterProvider {...props} />, document.body)}
    </>
)

export default ToasterStoryLayout
