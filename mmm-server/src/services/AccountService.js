import { AccountRepository } from '../repositoties';

function getAccount(id) {
    return AccountRepository.getAccount(id);
}

function getAccounts() {
    return AccountRepository.getAccounts();
}

function createAccount(account) {
    return AccountRepository.createAccount(account);
}

function updateAccount(account) {
    return AccountRepository.updateAccount(account);
}

function deleteAccount(id) {
    return AccountRepository.deleteAccount(id);
}

export const AccountService = {
    getAccount,
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount
};
