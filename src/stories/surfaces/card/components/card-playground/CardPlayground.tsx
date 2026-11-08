import type { FC } from 'react'

import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { Typography } from '@components/foundation/typography'
import { Card } from '@components/surfaces/card'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import type { CardStoryArgs } from '@stories/surfaces/card/types'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Renders card props and assigns demonstration controls to compound slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Card props and demonstration controls.
 * @param props.headerAs - Header element.
 * @param props.title - Header title.
 * @param props.titleAs - Heading level.
 * @param props.titleFontSize - Title font size.
 * @param props.titleFontWeight - Title font weight.
 * @param props.description - Header description.
 * @param props.descriptionFontSize - Description font size.
 * @param props.bodyAs - Body element.
 * @param props.bodyPadding - Body padding.
 * @param props.footerAs - Footer element.
 * @param props.showFooter - Whether to render the footer.
 * @param props.footerActionLabel - Primary action label.
 * @returns The interactive composition.
 * @example
 * <CardPlayground title="Account" showFooter />
 */
const CardPlayground: FC<CardStoryArgs> = ({
    headerAs,
    title,
    titleAs,
    titleFontSize,
    titleFontWeight,
    description,
    descriptionFontSize,
    bodyAs,
    bodyPadding,
    footerAs,
    showFooter,
    footerActionLabel,
    ...cardProps
}) => (
    <div style={{ width: '22rem', maxWidth: '100%' }}>
        <Card
            {...cardProps}
            as={cardProps.as ?? 'div'}
        >
            <Card.Header
                actions={
                    <IconButton
                        aria-label={'More options'}
                        color={'primary'}
                        icon={SearchIcon}
                        size={'sm'}
                        variant={'ghost'}
                    />
                }
                as={headerAs}
                description={description}
                descriptionProps={
                    descriptionFontSize === undefined
                        ? undefined
                        : { fontSize: descriptionFontSize }
                }
                title={title}
                titleAs={titleAs}
                titleProps={
                    titleFontSize === undefined && titleFontWeight === undefined
                        ? undefined
                        : {
                            fontSize: titleFontSize,
                            fontWeight: titleFontWeight,
                        }
                }
            />
            <Card.Body
                as={bodyAs}
                padding={bodyPadding}
            >
                <Typography
                    color={vars.color.text.primary}
                    fontSize={14}
                    variant={'p'}
                >
                    Your content goes here.
                </Typography>
            </Card.Body>
            {showFooter && (
                <Card.Footer as={footerAs}>
                    <Button
                        color={'primary'}
                        label={footerActionLabel ?? 'Save changes'}
                        size={'sm'}
                        variant={'contained'}
                    />
                    <Button
                        color={'primary'}
                        label={'Cancel'}
                        size={'sm'}
                        variant={'outlined'}
                    />
                </Card.Footer>
            )}
        </Card>
    </div>
)

export default CardPlayground
