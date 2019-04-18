import express from 'express';
import asyncHandler from 'express-async-handler';
import { TransactionService } from '../../services';

export const transactionsRouter = express.Router();

/**
 * Gets all transactions.
 *
 * @param {Object} req
 * optional query parameter: account
 *     returns all transactions for the specified account
 *
 * optional query parameter: groupByCategory
 *     returns an array of transactions grouped by category
 *     allows two optional query parameters: startDate and endDate
 *     Example: /transactions?groupByCategory&startDate=2014-01-01&endDate=2014-12-31
 *
 * @param {Object} res - res.body contains an array of all matching transaction
 */
transactionsRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const { account: accountId, groupByCategory } = req.query;
        let { startDate, endDate } = req.query;

        // If start and end dates are defined, convert them to Date objects
        if (startDate) {
            startDate = new Date(startDate);
        }

        if (endDate) {
            endDate = new Date(endDate);
        }

        // Call transactionService based on "groupByCategory" query parameter
        // "if (groupByCategory)" check does not work here because
        // groupByCategory comes in as an empty string and the check fails.
        if (typeof groupByCategory !== 'undefined') {
            const transactionSummaries = await TransactionService.getTransactionsByCategory(
                startDate,
                endDate
            );
            res.send(transactionSummaries);
        } else {
            const transactions = await TransactionService.getTransactions(
                accountId
            );
            res.send(transactions);
        }
    })
);

// Get one transaction
transactionsRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const transaction = await TransactionService.getTransaction(id);
        res.send(transaction);
    })
);

// Create a transaction
transactionsRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        const transactionData = req.body;
        const transaction = await TransactionService.createTransaction(
            transactionData
        );
        res.send(transaction);
    })
);

// Update a transaction
transactionsRouter.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const transactionData = req.body;
        const transaction = await TransactionService.updateTransaction(
            transactionData
        );
        res.send(transaction);
    })
);

// Delete a transaction
transactionsRouter.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        await TransactionService.deleteTransaction(id);
        res.status(204).send(); // No Content
    })
);
