import joinjs from 'join-js';
import { db } from './db';
import { resultMaps } from './resultMaps';

function getCategory(id) {
    const knex = db.getKnex();
    return knex
        .select('id', 'name')
        .from('categories')
        .where('id', id)
        .then(resultSet => joinjs.mapOne(resultSet, resultMaps, 'categoryMap'));
}

function getCategories() {
    const knex = db.getKnex();
    return knex
        .select('id', 'name')
        .from('categories')
        .then(resultSet => joinjs.map(resultSet, resultMaps, 'categoryMap'));
}

function createCategory(category) {
    const knex = db.getKnex();
    return knex('categories')
        .returning('id')
        .insert(category)
        .then(ids => {
            category.id = ids[0];
            return category;
        });
}

function updateCategory(category) {
    const knex = db.getKnex();
    return knex('categories')
        .where('id', category.id)
        .update(category)
        .then(() => category);
}

function deleteCategory(id) {
    const knex = db.getKnex();
    return knex('categories')
        .where('id', id)
        .delete();
}

export const CategoryRepository = {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
