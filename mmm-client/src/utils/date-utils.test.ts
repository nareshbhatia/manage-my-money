import { LocalDate } from 'js-joda';
import { getDateRange, TimePeriods } from './date-utils';

const refDate = LocalDate.parse('2019-04-15');

describe('getDateRange()', () => {
    test('thisMonth returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.thisMonth.id);
        const { startDate, endDate } = range;
        const expStartDate = LocalDate.parse('2019-04-01');
        const expEndDate = LocalDate.parse('2019-04-30');
        expect(startDate && startDate.equals(expStartDate)).toBe(true);
        expect(endDate && endDate.equals(expEndDate)).toBe(true);
    });

    test('lastMonth returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.lastMonth.id);
        const { startDate, endDate } = range;
        const expStartDate = LocalDate.parse('2019-03-01');
        const expEndDate = LocalDate.parse('2019-03-31');
        expect(startDate && startDate.equals(expStartDate)).toBe(true);
        expect(endDate && endDate.equals(expEndDate)).toBe(true);
    });

    test('last3Months returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.last3Months.id);
        const { startDate, endDate } = range;
        const expStartDate = LocalDate.parse('2019-01-01');
        const expEndDate = LocalDate.parse('2019-03-31');
        expect(startDate && startDate.equals(expStartDate)).toBe(true);
        expect(endDate && endDate.equals(expEndDate)).toBe(true);
    });

    test('last6Months returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.last6Months.id);
        const { startDate, endDate } = range;
        const expStartDate = LocalDate.parse('2018-10-01');
        const expEndDate = LocalDate.parse('2019-03-31');
        expect(startDate && startDate.equals(expStartDate)).toBe(true);
        expect(endDate && endDate.equals(expEndDate)).toBe(true);
    });

    test('last12Months returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.last12Months.id);
        const { startDate, endDate } = range;
        const expStartDate = LocalDate.parse('2018-04-01');
        const expEndDate = LocalDate.parse('2019-03-31');
        expect(startDate && startDate.equals(expStartDate)).toBe(true);
        expect(endDate && endDate.equals(expEndDate)).toBe(true);
    });

    test('thisYear returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.thisYear.id);
        const { startDate, endDate } = range;
        const expStartDate = LocalDate.parse('2019-01-01');
        const expEndDate = LocalDate.parse('2019-12-31');
        expect(startDate && startDate.equals(expStartDate)).toBe(true);
        expect(endDate && endDate.equals(expEndDate)).toBe(true);
    });

    test('lastYear returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.lastYear.id);
        const { startDate, endDate } = range;
        const expStartDate = LocalDate.parse('2018-01-01');
        const expEndDate = LocalDate.parse('2018-12-31');
        expect(startDate && startDate.equals(expStartDate)).toBe(true);
        expect(endDate && endDate.equals(expEndDate)).toBe(true);
    });

    test('allTime returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.allTime.id);
        const { startDate, endDate } = range;
        expect(startDate).toBeUndefined();
        expect(endDate).toBeUndefined();
    });
});
