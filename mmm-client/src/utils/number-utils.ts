import numeral from 'numeral';

/**
 * Formats value as a comma-separated number with 2 decimal digits
 * Example: 1000 --> 1,000.00
 * @param value
 */
export function numberToMoney(value: number) {
    return numeral(value).format('0,0.00');
}

/**
 * Tries to convert strings in various formats to a number
 * Examples:
 *     '10,000.12'  --> 10000.12
 *     '23rd'       --> 23
 *     '$10,000.00' --> 10000
 *     '100B'       --> 100
 *     '3.467TB'    --> 3467000000000
 *     '-76%'       --> -0.76
 *     '2:23:57'    --> NaN
 * @param value
 */
export function stringToNumber(value: string) {
    return numeral(value).value();
}
