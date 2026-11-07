import { Fieldset } from '@components/forms/primitives/fieldset'
import { Legend } from '@components/forms/primitives/legend'
import type { ReactElement } from 'react'

/**
 * Compares typography axes independently while preserving native legend semantics.
 * @internal Not part of the public package API.
 * @returns Three labeled fieldsets.
 * @example
 * <LegendAppearance />
 */
const LegendAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem' }}>
        <section aria-label={'Variants'}>
            <h3>Variants</h3>
            <Fieldset><Legend variant={'h3'}>Delivery preferences</Legend></Fieldset>
        </section>
        <section aria-label={'Font weights'}>
            <h3>Font weights</h3>
            <Fieldset><Legend fontWeight={'bold'}>Delivery preferences</Legend></Fieldset>
        </section>
        <section aria-label={'Colors'}>
            <h3>Colors</h3>
            <Fieldset><Legend color={'var(--color-primary-main)'}>Delivery preferences</Legend></Fieldset>
        </section>
    </div>
)

export default LegendAppearance
