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
