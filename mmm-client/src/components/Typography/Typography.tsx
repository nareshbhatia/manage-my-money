import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2)
    }
}));

export interface TypographyProps {
    className?: string;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Title
 */
export const Title: React.FC<TypographyProps> = ({
    className: classNameProp,
    variant = 'h6',
    children
}) => {
    const classes = useStyles();
    const className = classNames(classes.title, classNameProp);
    return (
        <Typography className={className} variant={variant}>
            {children}
        </Typography>
    );
};
