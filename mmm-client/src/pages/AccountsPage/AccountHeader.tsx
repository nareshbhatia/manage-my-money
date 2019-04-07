import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { formatMoney } from '../../utils';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    lhs: {
        flex: 1,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rhs: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export interface AccountHeaderProps {
    accountName: string;
    balance: number;
}

export const AccountHeader = ({ accountName, balance }: AccountHeaderProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.lhs}>
                <Typography component="h1" variant="h4">
                    {accountName}
                </Typography>
            </div>
            <div className={classes.rhs}>
                <Typography variant="caption" color="textSecondary">
                    Today's Balance
                </Typography>
                <Typography component="h2" variant="h5">
                    {formatMoney(balance)}
                </Typography>
            </div>
        </div>
    );
};
