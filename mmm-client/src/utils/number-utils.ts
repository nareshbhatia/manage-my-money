import numeral from 'numeral';

/**
 * Formats value as a comma-separated number with 2 decimal digits
 * Example: 1000 --> 1,000.00
 * @param value
 */
export function numberToMoney(value: number) {
    return numeral(value).format('0,0.00');
}
