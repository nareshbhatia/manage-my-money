import initKnex from 'knex';
import pg from 'pg';
import pgParseFloat from 'pg-parse-float';

let knex;

function start() {
    // Make float column types return JavaScript floats instead of strings
    pgParseFloat(pg);

    // Initialize Knex
    const dbConfig = {
        client: 'pg',
        debug: false,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            charset: 'utf8'
        }
    };
    knex = initKnex(dbConfig);
}

/**
 * Stop db
 * @param callback is called when all connections are destroyed
 */
function stop(callback) {
    if (knex && knex.client) {
        knex.destroy(callback);
    } else {
        callback();
    }
}

function getKnex() {
    return knex;
}

export const db = {
    start,
    stop,
    getKnex
};
