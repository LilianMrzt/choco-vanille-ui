import { memo, type FC } from 'react'
import { TEXT_AREA_LABEL_STYLES } from '@components/forms/text-area/components/text-area-label/styles/TextAreaLabel.css.ts'
import type { TextAreaLabelProps } from '@components/forms/text-area/components/text-area-label/types/TextAreaLabel.props.ts'
import { vars } from '@theme/contract.css.ts'

const TextAreaLabel: FC<TextAreaLabelProps> = memo(({ htmlFor, disabled, fontSize = 'md', children }) => (
    <label
        htmlFor={htmlFor}
        className={TEXT_AREA_LABEL_STYLES.root}
        style={{ fontSize: vars.fontSize[fontSize] }}
        data-disabled={disabled ? '' : undefined}
    >
        {children}
    </label>
))

TextAreaLabel.displayName = 'TextArea.Label'

export default TextAreaLabel
