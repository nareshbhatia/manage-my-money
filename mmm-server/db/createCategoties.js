import { Categories } from './config';
import { db } from './db';

function createCategory(category) {
    const knex = db.getKnex();
    return knex('categories').insert(category);
}

export async function createCategories() {
    const promises = [];
    Object.keys(Categories).forEach(key => {
        const { id, name } = Categories[key];
        promises.push(createCategory({ id, name }));
    });
    return Promise.all(promises);
}
