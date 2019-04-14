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
    return data.map((txn: any) => {
        const { txnDate, ...rest } = txn;
        return {
            txnDate: LocalDate.parse(txnDate),
            ...rest
        };
    });
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
    const { txnDate, ...rest } = txn;
    const jsTxn = {
        txnDate: txnDate.toString(),
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
