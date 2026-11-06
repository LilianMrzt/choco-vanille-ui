import { Toggle, ToggleGroup } from '@components/actions'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import { COLORS, SIZES, VARIANTS } from '@stories/actions/toggle/constants'

/** Comparison of available treatments and their low-emphasis versions. */
export const ToggleVariants = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {VARIANTS.map((variant) => (
            <Toggle
                key={variant}
                label={variant}
                variant={variant}
                defaultPressed
            />
        ))}
    </div>
)

/** Comparison of semantic colors. */
export const ToggleColors = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {COLORS.map((color) => (
            <Toggle
                key={color}
                label={color}
                color={color}
                defaultPressed
            />
        ))}
    </div>
)

/** Comparison of sizes. */
export const ToggleSizes = () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {SIZES.map((size) => (
            <Toggle
                key={size}
                label={size.toUpperCase()}
                size={size}
            />
        ))}
    </div>
)

/** Disabled and initially pressed examples. */
export const ToggleStates = () => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Toggle
            label={'Disabled'}
            disabled
        />
        <Toggle
            label={'Pressed'}
            defaultPressed
        />
    </div>
)

/** Text toggles with decorative icons. */
export const ToggleIcons = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <Toggle
            label={'Bold'}
            startIcon={BoldIcon}
        />
        <Toggle
            label={'Next'}
            endIcon={ChevronRightIcon}
        />
        <Toggle
            label={'Upload'}
            startIcon={UploadIcon}
            endIcon={ChevronRightIcon}
        />
    </div>
)

/** Uncontrolled group that permits multiple selections. */
export const ToggleUncontrolledGroup = () => (
    <ToggleGroup
        aria-label={'Text formatting'}
        multiple
        defaultValue={['bold']}
    >
        <ToggleGroup.Item
            value={'bold'}
            label={'Bold'}
        />
        <ToggleGroup.Item
            value={'italic'}
            label={'Italic'}
        />
        <ToggleGroup.Item
            value={'underline'}
            label={'Underline'}
        />
    </ToggleGroup>
)
