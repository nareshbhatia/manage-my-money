import moment from 'moment';
import numeral from 'numeral';

/**
 * Formats date value as MM/DD/YYYY in UTC timezone
 * Example: 01/01/2018
 * @param value
 */
export function formatDate(value: Date) {
    return moment(value)
        .utc()
        .format('L');
}

/**
 * Formats number value as a comma-separated number with 2 decimal digits
 * Example: 1,000.00
 * @param value
 */
export function formatMoney(value: number) {
    return numeral(value).format('0,0.00');
}
