import { TransactionRepository } from '../repositoties';

function getTransaction(id) {
    return TransactionRepository.getTransaction(id);
}

function getTransactions(accountId) {
    return TransactionRepository.getTransactions(accountId);
}

function getTransactionsByCategory(startDate, endDate) {
    return TransactionRepository.getTransactionsByCategory(startDate, endDate);
}

function createTransaction(transaction) {
    return TransactionRepository.createTransaction(transaction);
}

function updateTransaction(transaction) {
    return TransactionRepository.updateTransaction(transaction);
}

function deleteTransaction(id) {
    return TransactionRepository.deleteTransaction(id);
}

export const TransactionService = {
    getTransaction,
    getTransactions,
    getTransactionsByCategory,
    createTransaction,
    updateTransaction,
    deleteTransaction
};
