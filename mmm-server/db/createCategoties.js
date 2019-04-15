import { Categories } from './config';
import { db } from './db';

function createCategory(category) {
    const knex = db.getKnex();
    return knex('categories').insert(category);
}

export async function createCategories() {
    const promises = [];
    const INIT_ID_SEQ =
        "SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));";

    Object.keys(Categories).forEach(key => {
        const { id, name } = Categories[key];
        promises.push(createCategory({ id, name }));
    });
    return Promise.all(promises).then(() => {
        return db.getKnex().raw(INIT_ID_SEQ);
    });
}
