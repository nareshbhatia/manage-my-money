import React from 'react';
import { LocalDate } from 'js-joda';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { getDateRange, numberToMoney, TimePeriods } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
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
        width: 150
    }
}));

export interface ChartHeaderProps {
    netIncome: number;
    timePeriod: string;
    onTimePeriodChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

export const ChartHeader = ({
    netIncome,
    timePeriod,
    onTimePeriodChange
}: ChartHeaderProps) => {
    const classes = useStyles();
    const { startDate, endDate } = getDateRange(LocalDate.now(), timePeriod);
    const dateRange =
        startDate && endDate
            ? `${startDate.toString()} - ${endDate.toString()}`
            : '';

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
                                {TimePeriods[key].name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="caption" color="textSecondary">
                    {dateRange}
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
