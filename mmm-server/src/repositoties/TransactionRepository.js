import joinjs from 'join-js';
import { db } from './db';
import { resultMaps } from './resultMaps';

/**
 * Gets an existing transaction.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired transaction.
 */
function getTransaction(id) {
    const knex = db.getKnex();
    return knex
        .select(
            'id',
            'txn_date',
            'payee',
            'memo',
            'amount',
            'account_id',
            'category_id'
        )
        .from('transactions')
        .where('id', id)
        .then(resultSet =>
            joinjs.mapOne(resultSet, resultMaps, 'transactionMap')
        );
}

/**
 * Gets all transactions.
 * Optionally, if accountId is specified, gets transactions for that account.
 * @param {number} [accountId] return transactions only for this account
 * @return {Promise} A promise that returns an array of all transactions.
 */
function getTransactions(accountId) {
    const knex = db.getKnex();
    const filterOptions = {};
    if (accountId) {
        filterOptions['account_id'] = accountId;
    }

    return knex
        .select(
            'id',
            'txn_date',
            'payee',
            'memo',
            'amount',
            'account_id',
            'category_id'
        )
        .from('transactions')
        .where(filterOptions)
        .then(resultSet => joinjs.map(resultSet, resultMaps, 'transactionMap'));
}

/**
 * Gets transactions grouped by category. startDate and endDate can be
 * specified to limit the range of transactions aggregated (either both
 * or neither should be specified).
 * @param {Date} [startDate] start date for filtering transactions
 * @param {Date} [endDate] end date for filtering transactions
 * @return {Promise} A promise that returns an array of aggregated transactions.
 */
function getTransactionsByCategory(startDate, endDate) {
    const knex = db.getKnex();

    // Start a query builder
    let qb = knex
        .select(
            'c.id as cat_id',
            'c.name as cat_name',
            knex.raw('sum(t.amount) as amount')
        )
        .from('transactions as t')
        .leftOuterJoin('categories as c', 't.category_id', 'c.id');

    // Add optional start and end dates
    if (startDate && endDate) {
        qb = qb.whereBetween('t.txn_date', [startDate, endDate]);
    }

    // Finally add the groupBy clause
    qb = qb.groupBy('c.id');

    // Perform the query
    return qb.then(resultSet =>
        resultSet.map(t => ({
            catId: t.cat_id,
            catName: t.cat_name,
            amount: t.amount
        }))
    );
}

/**
 * Creates a new transaction and inserts it in to the database.
 * @param {Object} transaction minus the id
 * @return {Promise} A promise that returns the inserted transaction (including the id)
 */
function createTransaction(transaction) {
    const knex = db.getKnex();
    return knex('transactions')
        .returning('id')
        .insert(mapToDb(transaction))
        .then(ids => {
            transaction.id = ids[0];
            return transaction;
        });
}

/**
 * Updates an existing transaction.
 * @param {Object} transaction
 * @return {Promise} A promise that returns the updated transaction
 */
function updateTransaction(transaction) {
    const knex = db.getKnex();
    return knex('transactions')
        .where('id', transaction.id)
        .update(mapToDb(transaction))
        .then(() => transaction);
}

/**
 * Deletes a transaction.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the transaction is deleted.
 */
function deleteTransaction(id) {
    const knex = db.getKnex();
    return knex('transactions')
        .where('id', id)
        .delete();
}

/**
 * Maps a transaction object to its database representation
 * @param transaction
 * @returns object - database representation
 */
function mapToDb(transaction) {
    const {
        txnDate: txn_date,
        accountId: account_id,
        categoryId: category_id,
        ...rest
    } = transaction;

    return {
        txn_date,
        account_id,
        category_id,
        ...rest
    };
}

export const TransactionRepository = {
    getTransaction,
    getTransactions,
    getTransactionsByCategory,
    createTransaction,
    updateTransaction,
    deleteTransaction
};
