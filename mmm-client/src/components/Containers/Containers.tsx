import React from 'react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
    fullHeightContainer: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    flexContainer: {
        flex: 1
    },
    flexRow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    flexColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    centeredContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    scrollingContainer: {
        flex: 1,
        overflow: 'auto'
    },
    dark: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.grey.A400
    }
}));

export interface ContainerProps {
    className?: string;
    dark?: boolean;
}

/**
 * FullHeightContainer
 * - Expands to full height of the viewport (height: 100vh)
 * - It is also a Flexbox container with flexDirection = column
 */
export const FullHeightContainer: React.FC<ContainerProps> = ({
    className: classNameProp,
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.fullHeightContainer, classNameProp);
    return <div className={className}>{children}</div>;
};

/**
 * FlexContainer
 * - Flexible (flex: 1)
 */
export const FlexContainer: React.FC<ContainerProps> = ({
    className: classNameProp,
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.flexContainer, classNameProp);
    return <div className={className}>{children}</div>;
};

/**
 * FlexRow
 * - Flexible (flex: 1)
 * - It is also a Flexbox container with flexDirection = row
 */
export const FlexRow: React.FC<ContainerProps> = ({
    className: classNameProp,
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.flexRow, classNameProp);
    return <div className={className}>{children}</div>;
};

/**
 * FlexColumn
 * - Flexible (flex: 1)
 * - It is also a Flexbox container with flexDirection = column
 */
export const FlexColumn: React.FC<ContainerProps> = ({
    className: classNameProp,
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.flexColumn, classNameProp);
    return <div className={className}>{children}</div>;
};

/**
 * CenteredContainer
 * - Flexible (flex: 1)
 * - Centers content using Flexbox
 */
export const CenteredContainer: React.FC<ContainerProps> = ({
    className: classNameProp,
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.centeredContainer, classNameProp);
    return <div className={className}>{children}</div>;
};

/**
 * PageCenteredContainer
 * - Centers content on the entire page (height: 100vh)
 */
export const PageCenteredContainer: React.FC<ContainerProps> = ({
    className: classNameProp,
    dark,
    children
}) => {
    const classes = useStyles();
    const className = classNames(dark ? classes.dark : null, classNameProp);
    return (
        <Box
            p={2}
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            className={className}
        >
            {children}
        </Box>
    );
};

/**
 * ScrollingContainer
 * - Flexible (flex: 1)
 * - Allows scrolling of the content (overflow: auto)
 */
export const ScrollingContainer: React.FC<ContainerProps> = ({
    className: classNameProp,
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.scrollingContainer, classNameProp);
    return <div className={className}>{children}</div>;
};
