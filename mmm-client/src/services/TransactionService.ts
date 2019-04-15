import axios from 'axios';
import { LocalDate } from 'js-joda';
import {
    Transaction,
    TransactionInput,
    TransactionSummaryByCategory
} from '../models';

const api = process.env.REACT_APP_API_URL;

async function getTransactionsForAccount(
    accountId: number
): Promise<Array<Transaction>> {
    const resp = await axios.get(`${api}/transactions`, {
        params: {
            account: accountId
        }
    });
    const data = resp.data;

    // Convert to application domain and return
    return data.map((txn: any) => mapToDomain(txn));
}

async function getTransactionsByCategory(
    startDate?: LocalDate,
    endDate?: LocalDate
): Promise<Array<TransactionSummaryByCategory>> {
    const resp = await axios.get(`${api}/transactions`, {
        params: {
            groupByCategory: true,
            startDate: startDate ? startDate.toString() : undefined,
            endDate: endDate ? endDate.toString() : undefined
        }
    });
    return resp.data;
}

// function getTransaction(id) {
// }

async function createTransaction(txn: TransactionInput) {
    const resp = await axios.post(`${api}/transactions`, txn);
    return mapToDomain(resp.data);
}

async function updateTransaction(txn: TransactionInput) {
    const resp = await axios.put(`${api}/transactions/${txn.id}`, txn);
    return mapToDomain(resp.data);
}

// function deleteTransaction(id) {
// }

/**
 * Map transaction received from server to domain
 * @param transaction
 */
function mapToDomain(transaction: any) {
    const { txnDate, ...rest } = transaction;
    return {
        txnDate: LocalDate.parse(txnDate),
        ...rest
    };
}

export const TransactionService = {
    getTransactionsForAccount,
    getTransactionsByCategory,
    // getTransaction,
    createTransaction,
    updateTransaction
    // deleteTransaction
};
