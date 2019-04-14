// -----------------------------------------------------------------------------
// Load environment variables from the .env file before doing anything else
// -----------------------------------------------------------------------------
import { config as envConfig } from 'dotenv';
envConfig();

// --- Remaining imports -----
import { db } from './db';

// -----------------------------------------------------------------------------
// Start the database
// -----------------------------------------------------------------------------
db.start();

// -----------------------------------------------------------------------------
// Create Schema
// -----------------------------------------------------------------------------
const knex = db.getKnex();
knex.schema

    /***** Drop foreign keys *****/
    .hasTable('transactions')
    .then(exists => {
        if (exists) {
            return knex.schema.table('transactions', table => {
                table.dropForeign('account_id');
                table.dropForeign('category_id');
            });
        }
    })

    /***** Drop tables *****/
    .then(() => {
        return knex.schema
            .dropTableIfExists('accounts')
            .dropTableIfExists('categories')
            .dropTableIfExists('transactions');
    })

    .then(() => {
        return (
            knex.schema
                /***** Create tables (in alphabetic order) *****/
                // Accounts
                .createTable('accounts', table => {
                    table.increments('id');
                    table
                        .string('name', 64)
                        .notNullable()
                        .unique();
                })

                // Categories
                .createTable('categories', table => {
                    table.increments('id');
                    table
                        .string('name', 64)
                        .notNullable()
                        .unique();
                })

                // Transactions
                .createTable('transactions', table => {
                    table.increments('id');
                    table.date('txn_date').notNullable();
                    table.string('payee', 64).notNullable();
                    table.string('memo', 128);
                    table.decimal('amount', 19, 2).notNullable();
                })

                /***** Add foreign keys *****/
                .table('transactions', table => {
                    table
                        .integer('account_id')
                        .unsigned()
                        .notNullable()
                        .references('accounts.id');
                    table
                        .integer('category_id')
                        .unsigned()
                        .notNullable()
                        .references('categories.id');
                })
        );
    })

    /***** Destroy the database connection pool *****/
    .then(() => {
        db.stop(() => {
            console.log('Done');
        });
    })

    // Finally, add a .catch handler for the promise chain
    .catch(function(e) {
        console.error(e);
    });
