import { action, decorate, observable, observe } from 'mobx';
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

        // observe selectedAccountId
        this.selectedAccountDisposer = observe(
            accountStore,
            'selectedAccountId',
            () => {
                this.fetchTransactions(accountStore.selectedAccountId);
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
            return 0;
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
