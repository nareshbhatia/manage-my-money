import axios from 'axios';
import { Account } from '../models';

const api = process.env.REACT_APP_API_URL;

function getAccounts(): Promise<Array<Account>> {
    return axios.get(`${api}/accounts`).then(resp => resp.data);
}

// function getAccount(id) {
// }
//
// function createAccount(account) {
// }
//
// function updateAccount(account) {
// }
//
// function deleteAccount(id) {
// }

export const AccountService = {
    getAccounts
    // getAccount,
    // createAccount,
    // updateAccount,
    // deleteAccount
};
