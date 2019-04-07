import { action, computed, decorate, observable } from 'mobx';
import { Account } from '../models';
import { AccountService } from '../services';
import { RootStore } from './RootStore';

export class AccountStore {
    rootStore: RootStore;
    loading = true;
    accounts: Array<Account> = [];
    selectedAccountId = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    init() {}

    destroy() {}

    clearAccounts() {
        this.accounts = [];
        this.loading = true;
    }

    setAccounts(accounts: Array<Account>) {
        accounts.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        this.accounts = accounts;
        this.selectedAccountId = accounts.length > 0 ? accounts[0].id : 0;
        this.loading = false;
    }

    setSelectedAccountId(accountId: number) {
        this.selectedAccountId = accountId;
    }

    get selectedAccount() {
        return this.accounts.find(
            account => account.id === this.selectedAccountId
        );
    }

    async fetchAccounts() {
        this.clearAccounts();
        const data = await AccountService.getAccounts();
        this.setAccounts(data);
    }
}

decorate(AccountStore, {
    loading: observable,
    accounts: observable.shallow,
    selectedAccountId: observable,
    selectedAccount: computed,
    clearAccounts: action,
    setAccounts: action,
    setSelectedAccountId: action
});
