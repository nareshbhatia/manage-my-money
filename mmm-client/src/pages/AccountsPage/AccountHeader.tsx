import React from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { numberToMoney } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
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
                    {numberToMoney(balance)}
                </Typography>
            </div>
        </div>
    );
};
