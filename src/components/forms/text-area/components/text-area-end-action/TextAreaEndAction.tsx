import { memo, type FC } from 'react'
import { TEXT_AREA_END_ACTION_STYLES } from '@components/forms/text-area/components/text-area-end-action/styles/TextAreaEndAction.css.ts'
import { Box } from '@components/layout/box'
import type {
    TextAreaEndActionProps
} from '@components/forms/text-area/components/text-area-end-action/types/TextAreaEndAction.props.ts'

const TextAreaEndAction: FC<TextAreaEndActionProps> = memo(({ children }) => (
    <Box className={TEXT_AREA_END_ACTION_STYLES.root}>
        {children}
    </Box>
))

TextAreaEndAction.displayName = 'TextArea.EndAction'

export default TextAreaEndAction
