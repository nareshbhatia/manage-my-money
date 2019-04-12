import axios from 'axios';
import {
    Transaction,
    TransactionInput,
    TransactionSummaryByCategory
} from '../models';
import { dateToISOString } from '../utils';

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
    return data.map((txn: any) => {
        const { txnDate, ...rest } = txn;
        return {
            txnDate: new Date(txnDate),
            ...rest
        };
    });
}

async function getTransactionsByCategory(
    startDate?: Date,
    endDate?: Date
): Promise<Array<TransactionSummaryByCategory>> {
    const resp = await axios.get(`${api}/transactions`, {
        params: {
            groupByCategory: true,
            startDate: startDate ? dateToISOString(startDate) : undefined,
            endDate: endDate ? dateToISOString(endDate) : undefined
        }
    });
    return resp.data;
}

// function getTransaction(id) {
// }

async function createTransaction(txn: TransactionInput) {
    const { txnDate, ...rest } = txn;
    const jsTxn = {
        txnDate: dateToISOString(txnDate),
        ...rest
    };
    try {
        const resp = await axios.post(`${api}/transactions`, jsTxn);
        return resp.data;
    } catch (e) {
        throw e;
    }
}

// function updateTransaction(transaction) {
// }
//
// function deleteTransaction(id) {
// }

export const TransactionService = {
    getTransactionsForAccount,
    getTransactionsByCategory,
    // getAccount,
    createTransaction
    // updateAccount,
    // deleteAccount
};
