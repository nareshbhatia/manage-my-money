import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2)
    }
}));

export interface TypographyProps {
    className?: string;
}

/**
 * Title
 */
export const Title: React.FC<TypographyProps> = ({
    className: classNameProp,
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.title, classNameProp);
    return (
        <Typography className={className} variant="h6">
            {children}
        </Typography>
    );
};
