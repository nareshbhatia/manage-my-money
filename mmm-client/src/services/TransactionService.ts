import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

function getTransactionsForAccount(accountId: number) {
    return axios
        .get(`${api}/transactions?account=${accountId}`)
        .then(resp => resp.data);
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
