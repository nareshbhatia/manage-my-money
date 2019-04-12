import { action, decorate, observable, reaction } from 'mobx';
import { Transaction, TransactionInput } from '../models';
import { TransactionService } from '../services';
import { RootStore } from './RootStore';

export class TransactionStore {
    rootStore: RootStore;
    loading = true;
    transactions: Array<Transaction> = [];

    selectedAccountDisposer: any;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    init() {
        const { accountStore } = this.rootStore;

        // react to selectedAccountId changes
        this.selectedAccountDisposer = reaction(
            () => accountStore.selectedAccountId,
            selectedAccountId => {
                this.fetchTransactions(selectedAccountId);
            }
        );
    }

    destroy() {
        this.selectedAccountDisposer();
    }

    clearTransactions() {
        this.transactions = [];
        this.loading = true;
    }

    setTransactions(transactions: Array<Transaction>) {
        transactions.sort((a, b) => {
            const dateA = a.txnDate;
            const dateB = b.txnDate;
            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            // If dates are same, then sort by transaction id
            return a.id < b.id ? -1 : 1;
        });
        this.calculateBalances(transactions);

        // Save in reverse order
        this.transactions = transactions.reverse();
        this.loading = false;
    }

    calculateBalances(transactions: Array<Transaction>) {
        let balance = 0;
        transactions.forEach(transaction => {
            balance = balance + transaction.amount;
            transaction.balance = balance;
        });
    }

    async fetchTransactions(accountId: number) {
        this.clearTransactions();
        const data = await TransactionService.getTransactionsForAccount(
            accountId
        );
        this.setTransactions(data);
    }

    async createTransaction(txn: TransactionInput) {
        const data = await TransactionService.createTransaction(txn);
        return data;
    }

    async updateTransaction(txn: TransactionInput) {
        return;
    }
}

decorate(TransactionStore, {
    loading: observable,
    transactions: observable.shallow,
    clearTransactions: action,
    setTransactions: action
});
