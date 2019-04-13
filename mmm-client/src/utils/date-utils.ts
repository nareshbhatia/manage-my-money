import { LocalDate, TemporalAdjusters } from 'js-joda';

/**
 * TimePeriods: An enumeration defining useful time periods
 */
export interface TimePeriodMap {
    [param: string]: {
        id: string;
        name: string;
    };
}

export const TimePeriods: TimePeriodMap = {
    thisMonth: {
        id: 'thisMonth',
        name: 'This month'
    },
    lastMonth: {
        id: 'lastMonth',
        name: 'Last month'
    },
    last3Months: {
        id: 'last3Months',
        name: 'Last 3 months'
    },
    last6Months: {
        id: 'last6Months',
        name: 'Last 6 months'
    },
    last12Months: {
        id: 'last12Months',
        name: 'Last 12 months'
    },
    thisYear: {
        id: 'thisYear',
        name: 'This year'
    },
    lastYear: {
        id: 'lastYear',
        name: 'Last year'
    },
    allTime: {
        id: 'allTime',
        name: 'All time'
    }
};

/**
 * Returns start and end dates based on the specified reference date and
 * time period.
 *
 * Example:
 *   refDate = 2019-04-15
 *
 *   then return values will be as follows:
 *
 *   timePeriod     return value
 *   ----------     ------------
 *   thisMonth      2019-04-01 - 2019-04-30
 *   lastMonth      2019-03-01 - 2019-03-31
 *   last3Months    2019-01-01 - 2019-03-31
 *   last6Months    2018-10-01 - 2019-03-31
 *   last12Months   2018-04-01 - 2019-03-31
 *   thisYear       2019-01-01 - 2019-12-31
 *   lastYear       2018-01-01 - 2018-12-31
 *   allTime        undefined  - undefined
 *
 * @param refDate
 * @param timePeriod
 */
export function getDateRange(refDate: LocalDate, timePeriod: string) {
    let startDate;
    let endDate;
    const firstDayOfMonth = refDate.with(TemporalAdjusters.firstDayOfMonth());

    switch (timePeriod) {
        case TimePeriods.thisMonth.id:
            startDate = firstDayOfMonth;
            endDate = firstDayOfMonth.with(TemporalAdjusters.lastDayOfMonth());
            break;

        case TimePeriods.lastMonth.id:
            startDate = firstDayOfMonth.minusMonths(1);
            endDate = startDate.plusMonths(1).minusDays(1);
            break;

        case TimePeriods.last3Months.id:
            startDate = firstDayOfMonth.minusMonths(3);
            endDate = startDate.plusMonths(3).minusDays(1);
            break;

        case TimePeriods.last6Months.id:
            startDate = firstDayOfMonth.minusMonths(6);
            endDate = startDate.plusMonths(6).minusDays(1);
            break;

        case TimePeriods.last12Months.id:
            startDate = firstDayOfMonth.minusMonths(12);
            endDate = startDate.plusMonths(12).minusDays(1);
            break;

        case TimePeriods.thisYear.id:
            startDate = refDate.withMonth(1).withDayOfMonth(1);
            endDate = refDate.withMonth(12).withDayOfMonth(31);
            break;

        case TimePeriods.lastYear.id:
            startDate = refDate
                .minusYears(1)
                .withMonth(1)
                .withDayOfMonth(1);
            endDate = refDate
                .minusYears(1)
                .withMonth(12)
                .withDayOfMonth(31);
            break;
        default:
            break;
    }

    return {
        startDate,
        endDate
    };
}
