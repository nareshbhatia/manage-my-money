import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { numberToMoney } from '../../utils';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    lhs: {
        flex: 1,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rhs: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
}));

export interface ChartHeaderProps {
    netIncome: number;
}

export const ChartHeader = ({ netIncome }: ChartHeaderProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.lhs}>
                <Typography component="h1" variant="h5">
                    Transactions by Category
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    From 1/01/2015 to 12/31/2015
                </Typography>
            </div>
            <div className={classes.rhs}>
                <Typography component="h2" variant="h5">
                    {numberToMoney(netIncome)}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Net Income
                </Typography>
            </div>
        </div>
    );
};
