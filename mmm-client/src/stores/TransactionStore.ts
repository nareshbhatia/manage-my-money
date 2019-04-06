import { action, decorate, observable, reaction } from 'mobx';
import { Transaction } from '../models';
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
        // Sort in reverse order of date
        transactions.sort((a, b) => {
            const dateA = a.txnDate;
            const dateB = b.txnDate;
            if (dateA < dateB) {
                return 1;
            }
            if (dateA > dateB) {
                return -1;
            }
            // If dates are same, then reverse sort by transaction id
            return a.id < b.id ? 1 : -1;
        });
        this.transactions = transactions;
        this.loading = false;
    }

    async fetchTransactions(accountId: number) {
        this.clearTransactions();
        const data = await TransactionService.getTransactionsForAccount(
            accountId
        );
        this.setTransactions(data);
    }
}

decorate(TransactionStore, {
    loading: observable,
    transactions: observable.shallow,
    clearTransactions: action,
    setTransactions: action
});
