import { darken, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles } from '@material-ui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Link from './Link';
import { useTheme } from '../utils/theme';
import { SwitchTheme } from './SwitchTheme';

const drawerWidth = 299;
const useStyles = makeStyles(theme => {
    console.log({ theme });

    return createStyles({
        title: {
            width: drawerWidth - theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth - theme.spacing(3)
            },
            position: `relative`,
            '&:after': {
                top: '50%',
                right: 0,
                height: '40px',
                content: `" "`,
                position: `absolute`,
                transform: 'translateY(-50%)',
                borderLeft: `1px solid ${theme.palette.divider}`
            }
        },
        titleLink: {
            textDecoration: `none`,
            color: theme.palette.text.primary
        },
        inner: {
            flexGrow: 1,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3)
            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: theme.spacing(4),
                paddingRight: theme.spacing(4)
            }
        },
        links: {
            height: `100%`,
            display: `flex`,
            overflowX: `overlay`,
            overflowY: `hidden`
        },
        link: {
            height: `100%`,
            display: `flex`,
            alignItems: `center`,
            whiteSpace: `nowrap`,
            borderTop: `3px solid transparent`,
            borderBottom: `3px solid transparent`
        },
        linkTag: {
            textDecoration: `none`,
            color: theme.palette.primary.main,
            fontWeight: '500',
            '&:hover': {
                color: darken(
                    theme.palette.primary.main,
                    theme.palette.tonalOffset
                )
            }
        }
    });
});

const Header = ({ data }) => {
    const {
        site: {
            siteMetadata: { header }
        }
    } = data;
    const [theme] = useTheme();
    const classes = useStyles(theme);
    const finalLink = header.link ? header.link : '/';

    return (
        <Toolbar>
            <div className={classes.title}>
                <Link
                    to={finalLink}
                    color="inherit"
                    className={classes.titleLink}
                >
                    <Typography variant="h6">{header.title}</Typography>
                </Link>
            </div>
            <div className={classes.inner}>
                <div className={classes.links}>
                    {header.links.map((link, key) => {
                        if (link.link !== '' && link.text !== '') {
                            return (
                                <div key={key} className={classes.link}>
                                    <Link
                                        to={link.link}
                                        target="_blank"
                                        rel="noopener"
                                        color="primary"
                                        variant="subtitle1"
                                        className={classes.linkTag}
                                    >
                                        {link.text}
                                    </Link>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            <div>
                <SwitchTheme />
            </div>
        </Toolbar>
    );
};

export default () => {
    const data = useStaticQuery(
        graphql`
            query headerQuery {
                site {
                    siteMetadata {
                        header {
                            title
                            links {
                                link
                                text
                            }
                        }
                    }
                }
            }
        `
    );

    return <Header data={data} />;
};

Header.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                header: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    links: PropTypes.arrayOf(
                        PropTypes.shape({
                            link: PropTypes.string.isRequired,
                            text: PropTypes.string.isRequired
                        }).isRequired
                    )
                }).isRequired
            }).isRequired
        }).isRequired
    }).isRequired
};
