import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { TimePeriods } from '../../models';
import { numberToMoney } from '../../utils';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    lhs: {
        flex: 1,
        padding: theme.spacing(2)
    },
    rhs: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 190
    }
}));

export interface ChartHeaderProps {
    netIncome: number;
    timePeriod: string;
    onTimePeriodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ChartHeader = ({
    netIncome,
    timePeriod,
    onTimePeriodChange
}: ChartHeaderProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.lhs}>
                <Typography component="h1" variant="h5">
                    Transactions by Category
                </Typography>
            </div>
            <div className={classes.rhs}>
                <FormControl className={classes.formControl}>
                    <Select
                        name="period"
                        value={timePeriod}
                        onChange={onTimePeriodChange}
                    >
                        {Object.keys(TimePeriods).map(key => (
                            <MenuItem key={key} value={key}>
                                {TimePeriods[key]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="caption" color="textSecondary">
                    From 12/31/2017 to 12/31/2018
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
