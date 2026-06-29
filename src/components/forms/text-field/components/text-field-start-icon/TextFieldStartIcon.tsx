import type { FC } from 'react'

import { Icon } from '@components/foundation/icon'
import {
    textFieldStartIconClass
} from '@components/forms/text-field/components/text-field-start-icon/TextFieldStartIcon.css.ts'
import type {
    TextFieldStartIconProps
} from '@components/forms/text-field/components/text-field-start-icon/types/TextFieldStartIcon.types.ts'
import {
    fieldSizeToIconSize
} from '@components/forms/text-field/components/text-field-start-icon/types/TextFieldStartIcon.props.ts'

const TextFieldStartIcon: FC<TextFieldStartIconProps> = ({ icon, size }) => (
    <span className={textFieldStartIconClass}>
        <Icon
            icon={icon}
            size={fieldSizeToIconSize[size]}
        />
    </span>
)

TextFieldStartIcon.displayName = 'TextFieldStartIcon'

export default TextFieldStartIcon
