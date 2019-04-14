// -----------------------------------------------------------------------------
// Load environment variables from the .env file before doing anything else
// -----------------------------------------------------------------------------
import { config as envConfig } from 'dotenv';
envConfig();

// --- Remaining imports -----
import { createAccounts } from './createAccounts';
import { createCategories } from './createCategoties';
import { createTransactions } from './createTransactions';
import { db } from './db';

// -----------------------------------------------------------------------------
// Start the database
// -----------------------------------------------------------------------------
db.start();

// -----------------------------------------------------------------------------
// Load data
// -----------------------------------------------------------------------------
async function loadData() {
    console.log('Creating accounts...');
    await createAccounts();
    console.log('Creating categories...');
    await createCategories();
    console.log('Creating transactions...');
    await createTransactions();
}

loadData().then(() => {
    db.stop(() => {
        console.log('Done');
    });
});
