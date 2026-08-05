import { Toggle } from '@components/actions/toggle'
import type { ToolbarButtonProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-button/types/ToolbarButton.props.ts'

const ToolbarButton = ({
    icon,
    label,
    pressed,
    disabled,
    onPressedChange,
}: ToolbarButtonProps) => (
    <Toggle
        icon={icon}
        aria-label={label}
        pressed={pressed}
        variant={'ghost'}
        color={'primary'}
        size={'sm'}
        disabled={disabled}
        onMouseDown={(event) => event.preventDefault()}
        onPressedChange={onPressedChange}
    />
)

export default ToolbarButton
