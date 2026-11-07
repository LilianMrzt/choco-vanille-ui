import ImagePickerDimensionsExample from '@stories/forms/image-picker/components/image-picker-dimensions-example/ImagePickerDimensionsExample'
import ImagePickerShapesExample from '@stories/forms/image-picker/components/image-picker-shapes-example/ImagePickerShapesExample'
import ImagePickerObjectFitsExample from '@stories/forms/image-picker/components/image-picker-object-fits-example/ImagePickerObjectFitsExample'
import type { ReactElement } from 'react'

/**
 * Compares each appearance axis independently, without a Cartesian matrix.
 * @internal Not part of the public package API.
 * @returns Labeled appearance sections.
 * @example
 * <ImagePickerAppearance />
 */
const ImagePickerAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', width: 'min(100%, 48rem)' }}>
        <section aria-label={'Dimensions'}>
            <h3>Dimensions</h3>
            <ImagePickerDimensionsExample />
        </section>
        <section aria-label={'Shapes'}>
            <h3>Shapes</h3>
            <ImagePickerShapesExample />
        </section>
        <section aria-label={'ObjectFits'}>
            <h3>ObjectFits</h3>
            <ImagePickerObjectFitsExample />
        </section>
    </div>
)

export default ImagePickerAppearance
