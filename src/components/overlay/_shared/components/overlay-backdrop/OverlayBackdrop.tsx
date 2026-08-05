import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { OVERLAY_BACKDROP_STYLES } from '@components/overlay/_shared/styles/OverlayBackdrop.css.ts'
import type { OverlayBackdropProps } from '@components/overlay/_shared/components/overlay-backdrop/types/OverlayBackdrop.props.ts'
import { cn } from '@utils/cn.ts'

const OverlayBackdrop: FC<OverlayBackdropProps> = memo(({ className, ...props }) => (
    <BaseDialog.Backdrop
        className={cn(OVERLAY_BACKDROP_STYLES.root, className)}
        {...props}
    />
))

OverlayBackdrop.displayName = 'OverlayBackdrop'

export default OverlayBackdrop
