import type { ReactElement } from 'react'

import { name as packageName, version } from '../../../../../../package.json'
import { Badge } from '@components/data-display/badge'
import { INTRODUCTION_STYLES } from './Introduction.css'
import { componentCategories, referenceCategories } from '../../constants'

const Introduction = (): ReactElement => (
    <main className={INTRODUCTION_STYLES.root}>
        <header className={INTRODUCTION_STYLES.header}>
            <div className={INTRODUCTION_STYLES.titleRow}>
                <h1 className={INTRODUCTION_STYLES.title}>{packageName}</h1>
                <Badge label={`Version ${version}`} />
            </div>
            <p className={INTRODUCTION_STYLES.description}>
                {'A React library of typed components and theme tokens for building consistent interfaces.'}
            </p>
        </header>

        <section
            aria-labelledby={'components-heading'}
            className={INTRODUCTION_STYLES.section}
        >
            <h2
                className={INTRODUCTION_STYLES.sectionTitle}
                id={'components-heading'}
            >
                Components
            </h2>
            <div>
                {componentCategories.map(({ name, items }) => (
                    <section
                        className={INTRODUCTION_STYLES.category}
                        key={name}
                    >
                        <h3 className={INTRODUCTION_STYLES.categoryTitle}>{name}</h3>
                        <ul className={INTRODUCTION_STYLES.links}>
                            {items.map((item) => (
                                <li
                                    className={INTRODUCTION_STYLES.item}
                                    key={item}
                                >
                                    <a
                                        className={INTRODUCTION_STYLES.link}
                                        href={`./?path=/docs/${name.toLowerCase().replaceAll(' ', '-')}-${item.toLowerCase()}--docs`}
                                        target={'_top'}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </section>

        <section aria-labelledby={'references-heading'}>
            <h2
                className={INTRODUCTION_STYLES.sectionTitle}
                id={'references-heading'}
            >
                Guides &amp; references
            </h2>
            <div>
                {referenceCategories.map(({ name, items }) => (
                    <section
                        className={INTRODUCTION_STYLES.category}
                        key={name}
                    >
                        <h3 className={INTRODUCTION_STYLES.categoryTitle}>{name}</h3>
                        <ul className={INTRODUCTION_STYLES.links}>
                            {items.map((item) => (
                                <li
                                    className={INTRODUCTION_STYLES.item}
                                    key={item.path}
                                >
                                    <a
                                        className={INTRODUCTION_STYLES.link}
                                        href={`./?path=${item.path}`}
                                        target={'_top'}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </section>
    </main>
)

export default Introduction
