import joinjs from 'join-js';
import { db } from './db';
import { resultMaps } from './resultMaps';

function getAccount(id) {
    const knex = db.getKnex();
    return knex
        .select('id', 'name')
        .from('accounts')
        .where('id', id)
        .then(resultSet => joinjs.mapOne(resultSet, resultMaps, 'accountMap'));
}

function getAccounts() {
    const knex = db.getKnex();
    return knex
        .select('id', 'name')
        .from('accounts')
        .then(resultSet => joinjs.map(resultSet, resultMaps, 'accountMap'));
}

function createAccount(account) {
    const knex = db.getKnex();
    return knex('accounts')
        .returning('id')
        .insert(account)
        .then(ids => {
            account.id = ids[0];
            return account;
        });
}

function updateAccount(account) {
    const knex = db.getKnex();
    return knex('accounts')
        .where('id', account.id)
        .update(account)
        .then(() => account);
}

function deleteAccount(id) {
    const knex = db.getKnex();
    return knex('accounts')
        .where('id', id)
        .delete();
}

export const AccountRepository = {
    getAccount,
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount
};
