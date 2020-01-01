import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import config from '../../gatsby-config';
import Header from './Header';
import Sidebar from './sidebar';
import Seo from './Seo';
import { useTheme } from '../utils/theme';
import Content from './Content';

const drawerWidth = 299;
const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        toolbar: theme.mixins.toolbar
    })
);

const HideOnScroll = props => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

const CollapseOnScroll = props => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return <Collapse in={!trigger}>{children}</Collapse>;
};

const Layout = props => {
    const {
        location,
        data: { mdx }
    } = props;
    const [theme] = useTheme();
    const classes = useStyles(theme);

    const metaTitle = mdx.frontmatter.metaTitle;
    const metaDescription = mdx.frontmatter.metaDescription;
    let canonicalUrl = config.siteMetadata.siteUrl;
    canonicalUrl =
        config.pathPrefix !== '/'
            ? canonicalUrl + config.pathPrefix
            : canonicalUrl;
    canonicalUrl = canonicalUrl + mdx.fields.slug;

    return (
        <div className={classes.root}>
            <Seo
                title={metaTitle}
                description={metaDescription}
                canonicalUrl={canonicalUrl}
            />
            <HideOnScroll {...props}>
                <AppBar
                    position="fixed"
                    elevation={2}
                    square
                    className={classes.appBar}
                >
                    <Header {...props} />
                </AppBar>
            </HideOnScroll>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <CollapseOnScroll {...props}>
                    <div className={classes.toolbar} />
                </CollapseOnScroll>

                <Sidebar {...props} />
            </Drawer>
            <Container fixed className={classes.content}>
                <div className={classes.toolbar} />

                <Content {...props}></Content>
            </Container>
        </div>
    );
};

export default Layout;
