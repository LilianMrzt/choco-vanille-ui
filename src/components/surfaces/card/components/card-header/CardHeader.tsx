import { type FC } from 'react'

import { vars } from '@theme/contract.css.ts'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { CARD_HEADER_STYLES } from '@components/surfaces/card/components/card-header/CardHeader.css.ts'
import type { CardHeaderProps } from '@components/surfaces/card/components/card-header/types/CardHeader.props.ts'

/**
  * Header section of a `Card`. Renders an optional title, description and
  * an actions slot in the trailing corner — all via props.
  *
  * `children` can be used for fully custom header content alongside or instead
  * of the `title` / `description` props.
  *
  * @example
  * ```tsx
  * <CardHeader
  *   title="Account settings"
  *   description="Manage your profile and preferences."
  *   actions={<IconButton icon="lucide:ellipsis-vertical" aria-label="More" variant="ghost" color="primary" />}
  * />
  * ```
  */
const CardHeader: FC<CardHeaderProps> = ({
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
        gap={'md'}
        padding={'md'}
        paddingBottom={'none'}
        className={className}
        {...props}
    >
        {(title || description) && (
            <Flex
                flexDirection={'column'}
                alignItems={'start'}
                gap={'xs'}
                className={CARD_HEADER_STYLES.content}
            >
                {title && (
                    <Typography
                        as={titleAs ?? 'h3'}
                        fontSize={'lg'}
                        fontWeight={'semibold'}
                        color={'cardForeground'}
                        style={{ lineHeight: vars.lineHeight.tight }}
                        {...titleProps}
                    >
                        {title}
                    </Typography>
                )}
                {description && (
                    <Typography
                        as={'p'}
                        fontSize={'sm'}
                        color={'mutedForeground'}
                        style={{ lineHeight: vars.lineHeight.normal }}
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
                gap={'xs'}
                className={CARD_HEADER_STYLES.actions}
            >
                {actions}
            </Flex>
        )}
    </Flex>
)

CardHeader.displayName = 'Card.Header'

export default CardHeader