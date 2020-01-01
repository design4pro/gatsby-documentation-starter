const themeOptions = require('gatsby-theme-documentation-material-ui/theme-options');

module.exports = {
    pathPrefix: '/',
    siteMetadata: {
        title: `Gatsby Documentation Starter`,
        author: `DESIGN4PRO`,
        description: `A starter documentation.`,
        siteUrl: `https://docs.design4.io/`,
        docsLocation: `https://github.com/design4pro/gatsby-documentation-starter/tree/master/content`,
        social: {
            twitter: `design4pro`
        },
        header: {
            title: `Gatsby Documentation`,
            links: [{ text: 'Test', link: '/test' }]
        },
        sidebar: {
            forcedNavOrder: ['/introduction', '/codeblock'],
            collapsedNav: ['/codeblock'],
            links: [{ text: 'DESIGN4PRO', link: 'https://design4.io' }],
            frontline: false,
            ignoreIndex: true
        }
    },
    plugins: [
        {
            resolve: 'gatsby-theme-documentation-material-ui',
            options: {
                ...themeOptions,
                siteName: 'Gatsby Documentation Starter',
                root: __dirname,
                defaultVersion: 0.0
            }
        }
    ]
};
