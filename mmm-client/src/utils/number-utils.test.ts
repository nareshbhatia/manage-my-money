import { numberToMoney, stringToNumber } from './number-utils';

test('numberToMoney() formats value as a comma-separated number with 2 decimal digits', () => {
    expect(numberToMoney(1000)).toBe('1,000.00');
});

test('stringToNumber() tries to convert strings in various formats to a number', () => {
    expect(stringToNumber('10,000.12')).toBe(10000.12);
    expect(stringToNumber('23rd')).toBe(23);
    expect(stringToNumber('$10,000.00')).toBe(10000);
    expect(stringToNumber('100B')).toBe(100);
    expect(stringToNumber('3.467TB')).toBe(3467000000000);
    expect(stringToNumber('-76%')).toBe(-0.76);
});
