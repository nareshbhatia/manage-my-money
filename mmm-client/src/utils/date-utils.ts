import moment from 'moment';

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
