import { dateToISOString, dateToString } from './date-utils';

describe('dateToString()', () => {
    test('converts UTC midnight correctly, e.g. 2018-12-31T00:00:00.000Z --> 12/31/2018', () => {
        const date = new Date('2018-12-31T00:00:00.000Z');
        expect(dateToString(date)).toBe('12/31/2018');
    });

    test('converts non-UTC times correctly, e.g. 2018-12-31T19:00:00-05:00 --> 01/01/2019', () => {
        const date = new Date('2018-12-31T19:00:00-05:00');
        expect(dateToString(date)).toBe('01/01/2019');
    });
});

describe('dateToISOString()', () => {
    test('converts UTC midnight correctly, e.g. 2018-12-31T00:00:00.000Z --> 2018-12-31', () => {
        const date = new Date('2018-12-31T00:00:00.000Z');
        expect(dateToISOString(date)).toBe('2018-12-31');
    });

    test('converts non-UTC times correctly, e.g. 2018-12-31T19:00:00-05:00 --> 2019-01-01', () => {
        const date = new Date('2018-12-31T19:00:00-05:00');
        expect(dateToISOString(date)).toBe('2019-01-01');
    });
});
