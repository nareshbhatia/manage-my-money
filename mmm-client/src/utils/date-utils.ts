import moment from 'moment';
import { TimePeriods } from '../models';

/**
 * Formats date as MM/DD/YYYY in UTC timezone
 * Example: 2018-12-31T00:00:00.000Z --> 12/31/2018
 * @param date
 */
export function dateToString(date: Date) {
    return moment(date)
        .utc()
        .format('L');
}

/**
 * Formats date as YYYY-MM-DD in UTC timezone
 * Example: 2018-12-31T00:00:00.000Z --> 2018-12-31
 * @param date
 */
export function dateToISOString(date: Date) {
    return moment(date)
        .utc()
        .format('YYYY-MM-DD');
}

export function getDateRange(timePeriod: string) {
    let startDate;
    let endDate;

    switch (timePeriod) {
        case TimePeriods.thisMonth.id:
            startDate = moment()
                .utc()
                .startOf('month');
            endDate = moment()
                .utc()
                .endOf('month');
            break;

        case TimePeriods.lastMonth.id:
            startDate = moment()
                .utc()
                .subtract(1, 'month')
                .startOf('month');
            endDate = moment()
                .utc()
                .subtract(1, 'month')
                .endOf('month');
            break;

        case TimePeriods.last3Months.id:
            startDate = moment()
                .utc()
                .subtract(3, 'month')
                .startOf('month');
            endDate = moment()
                .utc()
                .subtract(1, 'month')
                .endOf('month');
            break;

        case TimePeriods.last6Months.id:
            startDate = moment()
                .utc()
                .subtract(6, 'month')
                .startOf('month');
            endDate = moment()
                .utc()
                .subtract(1, 'month')
                .endOf('month');
            break;

        case TimePeriods.last12Months.id:
            startDate = moment()
                .utc()
                .subtract(12, 'month')
                .startOf('month');
            endDate = moment()
                .utc()
                .subtract(1, 'month')
                .endOf('month');
            break;

        case TimePeriods.thisYear.id:
            startDate = moment()
                .utc()
                .startOf('year');
            endDate = moment()
                .utc()
                .endOf('year');
            break;

        case TimePeriods.lastYear.id:
            startDate = moment()
                .utc()
                .subtract(1, 'year')
                .startOf('year');
            endDate = moment()
                .utc()
                .subtract(1, 'year')
                .endOf('year');
            break;
        default:
            break;
    }

    return {
        startDate: startDate ? startDate.toDate() : undefined,
        endDate: endDate ? endDate.toDate() : undefined
    };
}
