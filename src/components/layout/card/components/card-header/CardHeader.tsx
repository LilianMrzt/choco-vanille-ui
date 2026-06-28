import { type FC } from 'react'

import { cn } from '@utils/cn.ts'
import {
    cardHeaderClass,
    cardHeaderContentClass,
    cardTitleClass,
    cardDescriptionClass,
    cardHeaderActionsClass,
} from '@components/layout/card/components/card-header/CardHeader.css.ts'
import type { CardHeaderProps } from '@components/layout/card/components/card-header/types/CardHeader.props.ts'

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
 *   actions={<IconButton icon="mdi:dots-vertical" aria-label="More" variant="ghost" color="primary" />}
 * />
 * ```
 */
const CardHeader: FC<CardHeaderProps> = ({
    as: Element = 'div',
    title,
    titleAs: TitleElement = 'h3',
    description,
    actions,
    className,
    children,
    ...props
}) => (
    <Element
        className={cn(cardHeaderClass, className)}
        {...props}
    >
        {(title || description) && (
            <div className={cardHeaderContentClass}>
                {title && (
                    <TitleElement className={cardTitleClass}>
                        {title}
                    </TitleElement>
                )}
                {description && (
                    <p className={cardDescriptionClass}>
                        {description}
                    </p>
                )}
            </div>
        )}

        {children}

        {actions && (
            <div className={cardHeaderActionsClass}>
                {actions}
            </div>
        )}
    </Element>
)

CardHeader.displayName = 'CardHeader'

export default CardHeader
