import type { FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { TEXT_FIELD_START_ICON_STYLES } from '@components/forms/text-field/components/text-field-start-icon/styles/TextFieldStartIcon.css.ts'
import type {
    TextFieldStartIconProps
} from '@components/forms/text-field/components/text-field-start-icon/types/TextFieldStartIcon.types.ts'
import {
    fieldSizeToIconSize
} from '@components/forms/text-field/components/text-field-start-icon/types/TextFieldStartIcon.props.ts'

const TextFieldStartIcon: FC<TextFieldStartIconProps> = ({ icon, size }) => (
    <span className={TEXT_FIELD_START_ICON_STYLES.root}>
        <Icon
            icon={icon}
            size={fieldSizeToIconSize[size]}
        />
    </span>
)

TextFieldStartIcon.displayName = 'TextField.StartIcon'

export default TextFieldStartIcon
