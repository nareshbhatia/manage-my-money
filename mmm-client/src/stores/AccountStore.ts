import { action, computed, decorate, observable } from 'mobx';
import { Account } from '../models';
import { AccountService } from '../services';
import { RootStore } from './RootStore';

export class AccountStore {
    rootStore: RootStore;
    loading = false;
    error?: Error;
    accounts: Array<Account> = [];
    selectedAccountId = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    init() {}

    destroy() {}

    clearAccounts() {
        this.accounts = [];
        this.error = undefined;
        this.loading = true;
    }

    setAccounts(accounts: Array<Account>) {
        // Sort by account id
        accounts.sort((a, b) => {
            return a.id - b.id;
        });

        this.accounts = accounts;
        this.loading = false;
    }

    setError(e: Error) {
        this.error = e;
    }

    setSelectedAccountId(accountId: number) {
        this.selectedAccountId = accountId;
    }

    get selectedAccount() {
        return this.accounts.find(
            account => account.id === this.selectedAccountId
        );
    }

    getAccount(accountId: number): Account | undefined {
        return this.accounts.find(account => account.id === accountId);
    }

    async fetchAccounts() {
        // if accounts have been cached, don't fetch again
        if (this.accounts.length > 0) {
            return true;
        }

        try {
            this.clearAccounts();
            const data = await AccountService.getAccounts();
            this.setAccounts(data);
        } catch (e) {
            this.setError(e);
        }
    }
}

decorate(AccountStore, {
    loading: observable,
    error: observable,
    accounts: observable.shallow,
    selectedAccountId: observable,
    selectedAccount: computed,
    clearAccounts: action,
    setAccounts: action,
    setError: action,
    setSelectedAccountId: action
});
