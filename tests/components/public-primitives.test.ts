import { describe, expect, expectTypeOf, it } from 'vitest'

import {
    Box, BOX_STYLES, Fieldset, FIELDSET_STYLES, Flex, FLEX_STYLES, Form, FORM_STYLES,
    Grid, GRID_STYLES, Icon, ICON_STYLES, Image, IMAGE_STYLES, Inset, INSET_STYLES,
    Legend, LEGEND_STYLES, Separator, SEPARATOR_STYLES, SvgImage, SVG_IMAGE_STYLES,
    Typography, TYPOGRAPHY_STYLES,
    type BoxProps, type FieldsetProps, type FormProps, type GridProps, type IconProps,
    type ImageProps, type LegendProps, type SvgImageProps, type TypographyProps,
} from '@/index'
import {
    Fieldset as FormsFieldset, Form as FormsForm, Legend as FormsLegend,
    LEGEND_STYLES as FORMS_LEGEND_STYLES,
    type FieldsetProps as FormsFieldsetProps, type FormProps as FormsFormProps,
    type LegendProps as FormsLegendProps,
} from '@components/forms'
import {
    Image as DataDisplayImage, SvgImage as DataDisplaySvgImage,
    type ImageProps as DataDisplayImageProps, type SvgImageProps as DataDisplaySvgImageProps,
} from '@components/data-display'
import type { BoxProps as BoxLocalProps } from '@components/layout/box'
import type { GridProps as GridLocalProps } from '@components/layout/grid'
import type { IconProps as IconLocalProps } from '@components/foundation/icon'
import type { TypographyProps as TypographyLocalProps } from '@components/foundation/typography'

describe('Foundation and layout public API', () => {
    it('exposes every primitive and its public styling map from the package entry', () => {
        for (const component of [Box, Fieldset, Flex, Form, Grid, Icon, Image, Inset, Legend, Separator, SvgImage, Typography]) {
            expect(component).toBeTruthy()
        }
        for (const recipe of [
            BOX_STYLES.recipe, FLEX_STYLES.recipe, GRID_STYLES.recipe, ICON_STYLES.recipe,
            IMAGE_STYLES.recipe, INSET_STYLES.recipe, SEPARATOR_STYLES.recipe,
            SVG_IMAGE_STYLES.recipe, TYPOGRAPHY_STYLES.recipe,
        ]) {
            expect(recipe).toBeTypeOf('function')
        }
        for (const root of [FIELDSET_STYLES.root, FORM_STYLES.root, LEGEND_STYLES.root]) {
            expect(root).toBeTypeOf('string')
        }
    })

    it('exports the same public prop types as the component entries', () => {
        expectTypeOf<BoxProps>().toEqualTypeOf<BoxLocalProps>()
        expectTypeOf<FieldsetProps>().toEqualTypeOf<FormsFieldsetProps>()
        expectTypeOf<FormProps>().toEqualTypeOf<FormsFormProps>()
        expectTypeOf<GridProps>().toEqualTypeOf<GridLocalProps>()
        expectTypeOf<IconProps>().toEqualTypeOf<IconLocalProps>()
        expectTypeOf<ImageProps>().toEqualTypeOf<DataDisplayImageProps>()
        expectTypeOf<LegendProps>().toEqualTypeOf<FormsLegendProps>()
        expectTypeOf<SvgImageProps>().toEqualTypeOf<DataDisplaySvgImageProps>()
        expectTypeOf<TypographyProps>().toEqualTypeOf<TypographyLocalProps>()
    })

    it('exposes Legend and its style map through Forms and the package entry', () => {
        expect(Legend).toBe(FormsLegend)
        expect(LEGEND_STYLES).toBe(FORMS_LEGEND_STYLES)
    })

    it('exposes relocated components through their categories and the package entry', () => {
        expect(Fieldset).toBe(FormsFieldset)
        expect(Form).toBe(FormsForm)
        expect(Image).toBe(DataDisplayImage)
        expect(SvgImage).toBe(DataDisplaySvgImage)
    })
})
