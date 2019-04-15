import { Accounts } from './config';
import { db } from './db';

function createAccount(account) {
    const knex = db.getKnex();
    return knex('accounts').insert(account);
}

export async function createAccounts() {
    const promises = [];
    const INIT_ID_SEQ =
        "SELECT setval('accounts_id_seq', (SELECT MAX(id) FROM accounts));";

    Object.keys(Accounts).forEach(key => {
        const { id, name } = Accounts[key];
        promises.push(createAccount({ id, name }));
    });
    return Promise.all(promises).then(() => {
        return db.getKnex().raw(INIT_ID_SEQ);
    });
}
