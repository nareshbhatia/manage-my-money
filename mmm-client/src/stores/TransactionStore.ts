import { action, decorate, observable, reaction, toJS } from 'mobx';
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

    calculateBalances(transactions: Array<Transaction>) {
        let balance = 0;
        transactions.forEach(transaction => {
            balance = balance + transaction.amount;
            transaction.balance = balance;
        });
    }

    processTxns(transactions: Array<Transaction>) {
        // Sort by transaction date name
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

        // return in reverse order
        return transactions.reverse();
    }

    setTxnsInStore(transactions: Array<Transaction>) {
        this.transactions = this.processTxns(transactions);
        this.loading = false;
    }

    addTxnToStore(nexTxn: Transaction) {
        const clone = toJS(this.transactions);
        clone.push(nexTxn);
        this.transactions = this.processTxns(clone);
    }

    updateTxnInStore(updTxn: Transaction) {
        const clone = toJS(this.transactions);
        const index = clone.findIndex((t) => t.id === updTxn.id );
        if (index >= 0) {
            clone[index] = updTxn;
            this.transactions = this.processTxns(clone);
        }
    }

    async fetchTransactions(accountId: number) {
        this.clearTransactions();
        const data = await TransactionService.getTransactionsForAccount(
            accountId
        );
        this.setTxnsInStore(data);
    }

    async createTransaction(txn: TransactionInput) {
        const newTxn = await TransactionService.createTransaction(txn);
        this.addTxnToStore(newTxn);
    }

    async updateTransaction(txn: TransactionInput) {
        const updTxn = await TransactionService.updateTransaction(txn);
        this.updateTxnInStore(updTxn);
    }
}

decorate(TransactionStore, {
    loading: observable,
    transactions: observable.shallow,
    clearTransactions: action,
    setTxnsInStore: action,
    addTxnToStore: action,
    updateTxnInStore: action
});
