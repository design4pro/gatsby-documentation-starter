import React from 'react';
import config from '../../../gatsby-config';
import Link from '../link';

const TreeNode = ({
    className = '',
    setCollapsed,
    collapsed,
    url,
    title,
    items,
    ...rest
}) => {
    const isCollapsed = collapsed[url];
    const collapse = () => {
        setCollapsed(url);
    };
    const hasChildren = items.length !== 0;
    let location;
    if (typeof document != 'undefined') {
        location = document.location;
    }
    const active =
        location &&
        (location.pathname === url ||
            location.pathname === config.pathPrefix + url);
    const calculatedClassName = `${className} item ${active ? 'active' : ''}`;
    return (
        <li className={calculatedClassName}>
            {title && (
                <Link to={url}>
                    {title}
                    {!config.siteMetadata.sidebar.frontLine &&
                    title &&
                    hasChildren ? (
                        <button
                            onClick={collapse}
                            aria-label="collapse"
                            className="collapser"
                        >
                            {/* {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />} */}
                        </button>
                    ) : null}
                </Link>
            )}

            {!isCollapsed && hasChildren ? (
                <ul>
                    {items.map(item => (
                        <TreeNode
                            key={item.url}
                            setCollapsed={setCollapsed}
                            collapsed={collapsed}
                            {...item}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    );
};
export default TreeNode;
