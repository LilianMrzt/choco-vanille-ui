import type { FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { TEXT_AREA_START_ICON_STYLES } from '@components/forms/text-area/components/text-area-start-icon/styles/TextAreaStartIcon.css.ts'
import { fieldSizeToIconSize } from '@components/forms/text-area/components/text-area-start-icon/constants'
import type { TextAreaStartIconProps } from '@components/forms/text-area/components/text-area-start-icon/types/TextAreaStartIcon.types.ts'
import { Box } from '@components/layout/box'

const TextAreaStartIcon: FC<TextAreaStartIconProps> = ({ icon, size }) => (
    <Box className={TEXT_AREA_START_ICON_STYLES.root}>
        <Icon
            icon={icon}
            size={fieldSizeToIconSize[size]}
        />
    </Box>
)

TextAreaStartIcon.displayName = 'TextArea.StartIcon'

export default TextAreaStartIcon
