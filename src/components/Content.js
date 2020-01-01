import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import config from '../../gatsby-config';
import NextPrevious from './NextPrevious';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

const forcedNavOrder = config.siteMetadata.sidebar.forcedNavOrder;

const Content = props => {
    const {
        data: {
            allMdx,
            mdx,
            site: {
                siteMetadata: { docsLocation }
            }
        }
    } = props;

    const navItems = allMdx.edges
        .map(({ node }) => node.fields.slug)
        .filter(slug => slug !== '/')
        .sort()
        .reduce(
            (acc, cur) => {
                if (forcedNavOrder.find(url => url === cur)) {
                    return { ...acc, [cur]: [cur] };
                }

                const prefix = cur.split('/')[1];

                if (
                    prefix &&
                    forcedNavOrder.find(url => url === `/${prefix}`)
                ) {
                    return {
                        ...acc,
                        [`/${prefix}`]: [...acc[`/${prefix}`], cur]
                    };
                } else {
                    return { ...acc, items: [...acc.items, cur] };
                }
            },
            { items: [] }
        );

    const nav = forcedNavOrder
        .reduce((acc, cur) => {
            return acc.concat(navItems[cur]);
        }, [])
        .concat(navItems.items)
        .map(slug => {
            if (slug) {
                const { node } = allMdx.edges.find(
                    ({ node }) => node.fields.slug === slug
                );

                return { title: node.fields.title, url: node.fields.slug };
            }
        });

    return (
        <Fragment>
            <h1>{mdx.fields.title}</h1>

            <Link
                className={'gitBtn'}
                to={`${docsLocation}/${mdx.parent.relativePath}`}
            >
                <img src="" alt={'Github logo'} /> Edit on GitHub
            </Link>
            <div>
                <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
            <div>
                <NextPrevious mdx={mdx} nav={nav} />
            </div>
        </Fragment>
    );
};

export default Content;
