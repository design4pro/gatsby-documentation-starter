import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link as MuiLink } from '@material-ui/core/Link';
import isAbsoluteUrl from 'is-absolute-url';
import Typography from '@material-ui/core/Typography';

const Link = data => {
    const { children, to, activeClassName, partiallyActive, ...other } = data;

    return isAbsoluteUrl(to) ? (
        <MuiLink href={to} {...other}>
            {children}
        </MuiLink>
    ) : (
        <GatsbyLink
            to={to}
            activeClassName={activeClassName}
            partiallyActive={partiallyActive}
            {...other}
        >
            {children}
        </GatsbyLink>
    );
};

export default Link;
