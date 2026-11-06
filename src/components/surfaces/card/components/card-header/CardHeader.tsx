import { memo, type FC } from 'react'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { CARD_HEADER_STYLES } from '@components/surfaces/card/components/card-header/CardHeader.css.ts'
import type { CardHeaderProps } from '@components/surfaces/card/components/card-header/types'

/**
  * Header section of a `Card`. Renders an optional title, description and
  * an actions slot in the trailing corner — all via props.
  *
  * `children` can be used for fully custom header content alongside or instead
  * of the `title` / `description` props.
  *
  * Forwarded attributes and ref apply to the header element. Select a heading
  * level appropriate for the page when providing a title.
  * @param props - Header options and forwarded Flex attributes.
  * @param props.as - Header element; defaults to div.
  * @param props.title - Optional heading text.
  * @param props.titleAs - Heading element; defaults to h3.
  * @param props.titleProps - Additional heading typography props.
  * @param props.description - Optional description text.
  * @param props.descriptionProps - Additional description typography props.
  * @param props.actions - Optional trailing actions.
  * @param props.className - Additional header class.
  * @param props.children - Custom content alongside the heading and actions.
  * @returns The card header.
  * @example
  * ```tsx
  * <Card.Header
  *   title="Account settings"
  *   description="Manage your profile and preferences."
  *   actions={<IconButton icon={MoreIcon} aria-label="More" variant="ghost" color="primary" />}
  * />
  * ```
  */
const CardHeader: FC<CardHeaderProps> = memo(({
    as: Element = 'div',
    title,
    titleAs,
    titleProps,
    description,
    descriptionProps,
    actions,
    className,
    children,
    ...props
}) => (
    <Flex
        as={Element}
        flexDirection={'row'}
        alignItems={'start'}
        justifyContent={'between'}
        gap={12}
        padding={12}
        paddingBottom={0}
        className={className}
        {...props}
    >
        {(title || description) && (
            <Flex
                flexDirection={'column'}
                alignItems={'start'}
                gap={4}
                className={CARD_HEADER_STYLES.content}
            >
                {title && (
                    <Typography
                        as={titleAs ?? 'h3'}
                        fontSize={18}
                        fontWeight={'semibold'}
                        color={vars.color.surface.foreground}
                        style={{ lineHeight: '1.25' }}
                        {...titleProps}
                    >
                        {title}
                    </Typography>
                )}
                {description && (
                    <Typography
                        as={'p'}
                        fontSize={14}
                        color={vars.color.surface.mutedForeground}
                        style={{ lineHeight: '1.5' }}
                        {...descriptionProps}
                    >
                        {description}
                    </Typography>
                )}
            </Flex>
        )}

        {children}

        {actions && (
            <Flex
                alignItems={'center'}
                gap={4}
                className={CARD_HEADER_STYLES.actions}
            >
                {actions}
            </Flex>
        )}
    </Flex>
))

CardHeader.displayName = 'Card.Header'

export default CardHeader
