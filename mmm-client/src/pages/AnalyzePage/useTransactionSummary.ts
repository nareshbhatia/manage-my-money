import { useState, useEffect } from 'react';
import { LocalDate } from 'js-joda';
import { TransactionSummaryByCategory } from '../../models';
import { TransactionService } from '../../services';
import { getDateRange } from '../../utils';

export const useTransactionSummary = (
    timePeriod: string
): {
    loading: boolean;
    summaries: Array<TransactionSummaryByCategory>;
} => {
    const [loading, setLoading] = useState(true);
    const [summaries, setSummaries] = useState<
        Array<TransactionSummaryByCategory>
    >([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                const positives = summaries.filter(
                    summary => summary.amount > 0
                );
                const negatives = summaries.filter(
                    summary => summary.amount < 0
                );

                // Sort positives in descending order and negatives in ascending order
                positives.sort((a, b) => a.amount - b.amount).reverse();
                negatives.sort((a, b) => a.amount - b.amount);

                // Merge the two
                const allSummaries = positives.concat(negatives);

                setSummaries(allSummaries);
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, [timePeriod]);

    // Allow ErrorBoundary to handle errors
    if (error) {
        throw error;
    }

    return { loading, summaries };
};
