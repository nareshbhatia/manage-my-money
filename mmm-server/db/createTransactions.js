import Chance from 'chance';
import { LocalDate, Month, TemporalAdjusters } from 'js-joda';
import {
    Accounts,
    Categories,
    startDate as start,
    endDate as end
} from './config';
import { db } from './db';

let nextId = 1;
const promises = [];
const startDate = LocalDate.parse(start);
const endDate = LocalDate.parse(end);

const GROSS_PAY = 8000;
const FED_TAX = 2000;
const STATE_TAX = 500;
const RETIREMENT_SAVINGS = 1000;
const INVESTMENT = 750;
const CASH_WITHDRAWAL = 225;
const TUITION = 400;
const NETFLIX = 12.99;
const EQUINOX = 170;
const LAWN_CARE = 99.95;
const HAIRCUT = 24;
const FACIAL = 50;
const DONATION = 5000;

const chance = new Chance();

function createTransaction(transaction) {
    transaction.id = nextId++;
    const knex = db.getKnex();
    return knex('transactions').insert(transaction);
}

function createOpeningBalances() {
    Object.keys(Accounts).forEach(key => {
        const { id: account_id, openingBalance } = Accounts[key];
        promises.push(
            createTransaction({
                txn_date: startDate.toString(),
                payee: 'Opening Balance',
                memo: undefined,
                amount: openingBalance,
                account_id,
                category_id: Categories.openingBalance.id
            })
        );
    });
}

function createWeeklyTxns(startDate) {
    // Define days of the week
    const day1 = startDate.plusDays(0);
    const day2 = startDate.plusDays(1);
    const day3 = startDate.plusDays(3);
    const day4 = startDate.plusDays(4);
    const day5 = startDate.plusDays(5);
    const day6 = startDate.plusDays(6);
    const day7 = startDate.plusDays(7);

    if (day1.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day1.toString(),
                payee: 'Stop&Shop',
                memo: undefined,
                amount: -chance.floating({ min: 50, max: 150, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.groceries.id
            })
        );
        promises.push(
            createTransaction({
                txn_date: day1.toString(),
                payee: 'Clover',
                memo: undefined,
                amount: -chance.floating({ min: 10, max: 15, fixed: 2 }),
                account_id: Accounts.cash.id,
                category_id: Categories.restaurants.id
            })
        );
    }

    if (day2.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day2.toString(),
                payee: 'Best Cleaners',
                memo: 'Laundry',
                amount: -chance.floating({ min: 10, max: 30, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.personalCare.id
            })
        );
    }

    if (day3.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day3.toString(),
                payee: 'Adjustment',
                memo: undefined,
                amount: -chance.floating({ min: 5, max: 15, fixed: 2 }),
                account_id: Accounts.cash.id,
                category_id: Categories.unallocatedExpense.id
            })
        );
    }

    if (day4.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day4.toString(),
                payee: 'Whole Foods',
                memo: undefined,
                amount: -chance.floating({ min: 50, max: 150, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.groceries.id
            })
        );
    }

    if (day5.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day5.toString(),
                payee: 'Boloco',
                memo: undefined,
                amount: -chance.floating({ min: 10, max: 15, fixed: 2 }),
                account_id: Accounts.cash.id,
                category_id: Categories.restaurants.id
            })
        );
    }

    if (day6.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day6.toString(),
                payee: 'Whole Foods',
                memo: undefined,
                amount: -chance.floating({ min: 50, max: 150, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.groceries.id
            })
        );
    }

    if (day7.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day7.toString(),
                payee: 'Chevron',
                memo: undefined,
                amount: -chance.floating({ min: 20, max: 50, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.auto.id
            })
        );
        promises.push(
            createTransaction({
                txn_date: day7.toString(),
                payee: 'B.Good',
                memo: undefined,
                amount: -chance.floating({ min: 5, max: 15, fixed: 2 }),
                account_id: Accounts.cash.id,
                category_id: Categories.restaurants.id
            })
        );
    }
}

function createMonthlyTxnsForMonth(monthStart) {
    // Create weekly transactions
    for (let i = 0; i < 4; i++) {
        createWeeklyTxns(monthStart.plusWeeks(i));
    }

    // Define some days
    const day05 = monthStart.plusDays(4);
    const day10 = monthStart.plusDays(9);
    const day15 = monthStart.plusDays(14);
    const day20 = monthStart.plusDays(19);
    const day25 = monthStart.plusDays(24);

    // Buy from Amazon 3 times a month
    if (day10.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day10.toString(),
                payee: 'Amazon',
                memo: undefined,
                amount: -chance.floating({ min: 40, max: 100, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.groceries.id
            })
        );
    }

    if (day20.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day20.toString(),
                payee: 'Amazon',
                memo: 'Software',
                amount: -chance.floating({ min: 40, max: 120, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.shopping.id
            })
        );
    }

    if (day25.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day25.toString(),
                payee: 'Amazon',
                memo: 'AWS',
                amount: -chance.floating({ min: 40, max: 120, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.business.id
            })
        );
    }

    // Pay credit card bill
    if (day20.compareTo(endDate) <= 0) {
        const amount = chance.floating({ min: 2000, max: 2500, fixed: 2 });
        promises.push(
            createTransaction({
                txn_date: day20.toString(),
                payee: 'Amazon',
                memo: undefined,
                amount: -amount,
                account_id: Accounts.checking.id,
                category_id: Categories.transfer.id
            })
        );
        promises.push(
            createTransaction({
                txn_date: day20.toString(),
                payee: 'Amazon',
                memo: undefined,
                amount: amount,
                account_id: Accounts.creditCard.id,
                category_id: Categories.transfer.id
            })
        );
    }

    // Other expenses
    if (day05.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day05.toString(),
                payee: 'National Grid',
                memo: 'Electric bill',
                amount: -chance.floating({ min: 200, max: 300, fixed: 2 }),
                account_id: Accounts.checking.id,
                category_id: Categories.bills.id
            })
        );

        promises.push(
            createTransaction({
                txn_date: day05.toString(),
                payee: 'Pentucket Medical',
                memo: 'Medical bill',
                amount: -chance.floating({ min: 100, max: 400, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.health.id
            })
        );
    }

    if (day10.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day10.toString(),
                payee: 'Supercuts',
                memo: undefined,
                amount: -HAIRCUT,
                account_id: Accounts.cash.id,
                category_id: Categories.personalCare.id
            })
        );
    }

    if (day15.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day15.toString(),
                payee: 'Orange County',
                memo: 'Water bill',
                amount: -chance.floating({ min: 100, max: 200, fixed: 2 }),
                account_id: Accounts.checking.id,
                category_id: Categories.bills.id
            })
        );
    }

    if (day20.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day20.toString(),
                payee: 'Netflix',
                memo: undefined,
                amount: -NETFLIX,
                account_id: Accounts.creditCard.id,
                category_id: Categories.entertainment.id
            })
        );

        promises.push(
            createTransaction({
                txn_date: day20.toString(),
                payee: 'Newbury Day Spa',
                memo: 'Facial',
                amount: -FACIAL,
                account_id: Accounts.creditCard.id,
                category_id: Categories.personalCare.id
            })
        );
    }

    if (day25.compareTo(endDate) <= 0) {
        promises.push(
            createTransaction({
                txn_date: day25.toString(),
                payee: 'Stanford University',
                memo: 'Tuition',
                amount: -TUITION,
                account_id: Accounts.checking.id,
                category_id: Categories.education.id
            })
        );

        promises.push(
            createTransaction({
                txn_date: day25.toString(),
                payee: 'BofA',
                memo: 'ATM charges',
                amount: -chance.floating({ min: 10, max: 25, fixed: 2 }),
                account_id: Accounts.checking.id,
                category_id: Categories.fees.id
            })
        );

        promises.push(
            createTransaction({
                txn_date: day25.toString(),
                payee: 'Equinox',
                memo: 'Gym membership',
                amount: -EQUINOX,
                account_id: Accounts.creditCard.id,
                category_id: Categories.health.id
            })
        );

        promises.push(
            createTransaction({
                txn_date: day25.toString(),
                payee: 'Beautiful Lawns',
                memo: 'Lawn service',
                amount: -LAWN_CARE,
                account_id: Accounts.creditCard.id,
                category_id: Categories.home.id
            })
        );

        promises.push(
            createTransaction({
                txn_date: day25.toString(),
                payee: 'Amazon',
                memo: 'Cashback',
                amount: chance.floating({ min: 20, max: 40, fixed: 2 }),
                account_id: Accounts.creditCard.id,
                category_id: Categories.unallocatedIncome.id
            })
        );
    }
}

function createMonthlyTxns() {
    let monthStart = startDate.with(TemporalAdjusters.firstDayOfMonth());
    while (true) {
        if (monthStart.compareTo(endDate) > 0) break;
        createMonthlyTxnsForMonth(monthStart);

        // Vacation every April
        if (monthStart.month() === Month.APRIL) {
            const travelDay = monthStart.plusDays(12);
            if (travelDay.compareTo(endDate) <= 0) {
                promises.push(
                    createTransaction({
                        txn_date: travelDay.toString(),
                        payee: 'United Airlines',
                        memo: undefined,
                        amount: -chance.floating({
                            min: 1000,
                            max: 1500,
                            fixed: 2
                        }),
                        account_id: Accounts.creditCard.id,
                        category_id: Categories.travel.id
                    })
                );
                promises.push(
                    createTransaction({
                        txn_date: travelDay.toString(),
                        payee: 'Hilton',
                        memo: undefined,
                        amount: -chance.floating({
                            min: 1000,
                            max: 1500,
                            fixed: 2
                        }),
                        account_id: Accounts.creditCard.id,
                        category_id: Categories.travel.id
                    })
                );
            }
        }

        // Donate every December
        if (monthStart.month() === Month.DECEMBER) {
            const donationDay = monthStart.plusDays(30);
            if (donationDay.compareTo(endDate) <= 0) {
                promises.push(
                    createTransaction({
                        txn_date: donationDay.toString(),
                        payee: 'Red Cross',
                        memo: undefined,
                        amount: -DONATION,
                        account_id: Accounts.checking.id,
                        category_id: Categories.gifts.id
                    })
                );
            }
        }

        // Go to next month
        monthStart = monthStart.plusMonths(1);
    }
}

function createMonthEndTxnsForMonth(monthEnd) {
    // Receive paycheck
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Stark Industries',
            memo: 'Gross pay',
            amount: GROSS_PAY,
            account_id: Accounts.checking.id,
            category_id: Categories.salary.id
        })
    );
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'IRS',
            memo: 'Federal tax',
            amount: -FED_TAX,
            account_id: Accounts.checking.id,
            category_id: Categories.taxes.id
        })
    );
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'State of California',
            memo: 'State tax',
            amount: -STATE_TAX,
            account_id: Accounts.checking.id,
            category_id: Categories.taxes.id
        })
    );

    // Retirement savings
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Fidelity 401K',
            memo: '401K',
            amount: -RETIREMENT_SAVINGS,
            account_id: Accounts.checking.id,
            category_id: Categories.transfer.id
        })
    );
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Fidelity 401K',
            memo: undefined,
            amount: RETIREMENT_SAVINGS,
            account_id: Accounts.retirement.id,
            category_id: Categories.transfer.id
        })
    );
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Fidelity 401K',
            memo: undefined,
            amount: chance.floating({ min: 100, max: 200, fixed: 2 }),
            account_id: Accounts.retirement.id,
            category_id: Categories.dividends.id
        })
    );

    // Investment
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Betterment',
            memo: 'Investment',
            amount: -INVESTMENT,
            account_id: Accounts.checking.id,
            category_id: Categories.transfer.id
        })
    );
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Betterment',
            memo: undefined,
            amount: INVESTMENT,
            account_id: Accounts.investment.id,
            category_id: Categories.transfer.id
        })
    );
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Betterment',
            memo: undefined,
            amount: chance.floating({ min: 100, max: 200, fixed: 2 }),
            account_id: Accounts.investment.id,
            category_id: Categories.dividends.id
        })
    );

    // Take out some cash
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Cash',
            memo: '',
            amount: -CASH_WITHDRAWAL,
            account_id: Accounts.checking.id,
            category_id: Categories.transfer.id
        })
    );
    promises.push(
        createTransaction({
            txn_date: monthEnd.toString(),
            payee: 'Cash',
            memo: '',
            amount: CASH_WITHDRAWAL,
            account_id: Accounts.cash.id,
            category_id: Categories.transfer.id
        })
    );
}

function createMonthEndTxns() {
    let monthStart = startDate.with(TemporalAdjusters.firstDayOfMonth());
    while (true) {
        const monthEnd = monthStart.with(TemporalAdjusters.lastDayOfMonth());
        if (monthEnd.compareTo(endDate) > 0) break;
        createMonthEndTxnsForMonth(monthEnd);

        // Go to next month
        monthStart = monthStart.plusMonths(1);
    }
}

export async function createTransactions() {
    const INIT_ID_SEQ =
        "SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions));";

    createOpeningBalances();
    createMonthlyTxns();
    createMonthEndTxns();
    return Promise.all(promises).then(() => {
        return db.getKnex().raw(INIT_ID_SEQ);
    });
}
