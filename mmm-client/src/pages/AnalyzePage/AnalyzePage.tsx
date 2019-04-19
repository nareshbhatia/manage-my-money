import React, { useEffect, useState } from 'react';
import { LocalDate } from 'js-joda';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { TransactionSummaryByCategory } from '../../models';
import { TransactionService } from '../../services';
import { getDateRange, TimePeriods } from '../../utils';
import { ChartHeader } from './ChartHeader';

import { FullHeightContainer, Header, Loading } from '../../components';

export const AnalyzePage = () => {
    const [timePeriod, setTimePeriod] = useState(TimePeriods.thisMonth.id);
    const [loading, setLoading] = useState(true);
    const [summaries, setSummaries] = useState<
        Array<TransactionSummaryByCategory>
    >([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const { startDate, endDate } = getDateRange(
                LocalDate.now(),
                timePeriod
            );
            const summaries = await TransactionService.getTransactionsByCategory(
                startDate,
                endDate
            );

            // Separate the positive and negative values, drop the zeros
            const positives = summaries.filter(summary => summary.amount > 0);
            const negatives = summaries.filter(summary => summary.amount < 0);

            // Sort positives in descending order and negatives in ascending order
            positives.sort((a, b) => a.amount - b.amount).reverse();
            negatives.sort((a, b) => a.amount - b.amount);

            // Merge the two
            const allSummaries = positives.concat(negatives);

            setSummaries(allSummaries);
            setLoading(false);
        }

        fetchData();
    }, [timePeriod]);

    const handleTimePeriodChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setTimePeriod(event.target.value as string);
    };

    if (loading) {
        return <Loading />;
    }

    // Prepare data for stacked bar chart
    const data = summaries.map(({ catName, amount }) => ({
        catName,
        income: amount > 0 ? amount : 0,
        expense: amount < 0 ? -amount : 0
    }));

    // Calculate net income
    const netIncome = summaries.reduce(
        (sum, summary) => sum + summary.amount,
        0
    );

    return (
        <FullHeightContainer>
            <Header />
            <ChartHeader
                netIncome={netIncome}
                timePeriod={timePeriod}
                onTimePeriodChange={handleTimePeriodChange}
            />
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 48,
                        bottom: 24,
                        left: 24
                    }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <Legend />
                    <XAxis type="number" />
                    <YAxis
                        type="category"
                        dataKey="catName"
                        width={136}
                        interval={0}
                    />
                    <Bar
                        dataKey="income"
                        name="Income"
                        stackId="a"
                        fill="#1E985E"
                    />
                    <Bar
                        dataKey="expense"
                        name="Expense"
                        stackId="a"
                        fill="#F89F1B"
                    />
                </BarChart>
            </ResponsiveContainer>
        </FullHeightContainer>
    );
};
