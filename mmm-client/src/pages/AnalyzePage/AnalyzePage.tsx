import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { FullHeightContainer, Header, Loading } from '../../components';
import { TimePeriods } from '../../utils';
import { ChartHeader } from './ChartHeader';
import { useTransactionSummary } from './useTransactionSummary';

export const AnalyzePage = () => {
    const [timePeriod, setTimePeriod] = useState(TimePeriods.thisMonth.id);

    // Transaction Summaries
    const { loading, summaries } = useTransactionSummary(timePeriod);

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
