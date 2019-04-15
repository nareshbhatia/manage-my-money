import { RouterState, RouterStore } from 'mobx-state-router';
import { AccountStore } from './AccountStore';
import { CategoryStore } from './CategoryStore';
import { TransactionStore } from './TransactionStore';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    accountStore = new AccountStore(this);
    categoryStore = new CategoryStore(this);
    transactionStore = new TransactionStore(this);
    routerStore = new RouterStore(this, routes, notFound);

    // ----- Lifecycle hooks -----
    // Useful for starting and stopping observers, autoruns and reactions

    init() {
        this.accountStore.init();
        this.categoryStore.init();
        this.transactionStore.init();
    }

    destroy() {
        this.accountStore.destroy();
        this.categoryStore.destroy();
        this.transactionStore.destroy();
    }
}
