import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

async function getTransactionsForAccount(accountId: number) {
    const resp = await axios.get(`${api}/transactions?account=${accountId}`);
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

// function getTransaction(id) {
// }
//
// function createTransaction(transaction) {
// }
//
// function updateTransaction(transaction) {
// }
//
// function deleteTransaction(id) {
// }

export const TransactionService = {
    getTransactionsForAccount
    // getAccount,
    // createAccount,
    // updateAccount,
    // deleteAccount
};
